/*Problem 10: [5 points]
Represents a 'move' action.

Create a class named ActionMove that extends Action.It has the following:
- constructor with three parameters that get passed to the super's constructor
- implement method validAction 
    call checkValidMove from your rules class and return
    whether this move is valid 
- implement method performAction
    on a move:
    - if the end square is not cracked
        the Piece on the Start Square is moved to the End Square   
    - if the end square is cracked 
       the current team loses this piece (removed from board and team)   
    - the Piece speaks
    - the turn of the game is changed to the other player
*/
import { Action } from "./Action";
import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
import { BoardSquare } from "../elements/BoardSquare";
import { Piece } from "../elements/Piece";
export class ActionMove extends Action {
    constructor(g: GameS25, s: Location, e: Location) {
        super(g, s, e);
    }
    validAction(): boolean {
        return this.game
            .getRules()
            .checkValidMove(this.startLocation, this.endLocation);
    }
    performAction(): void {
        let start: BoardSquare = this.game
            .getGameBoard()
            .getSquare(this.startLocation);
        let end: BoardSquare = this.game
            .getGameBoard()
            .getSquare(this.endLocation);
        let temp: Piece | null = start.removePiece();
        if (end.isCracked()) {
            this.game.getCurrentTeam().removePieceFromTeam(temp);
        } else {
            end.setPiece(temp);
        }
        temp?.speak();
        this.game.changeTurn();
    }
}
