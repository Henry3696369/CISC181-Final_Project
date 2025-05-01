/*Problem 14: [5 points]
Represents a 'crack' action.

Create a class named ActionCrack that extends Action.It has the following:
- constructor with three parameters that get passed to the super's constructor
- implementation for method validAction 
    call checkValidCrack from your rules class and return
    whether this move is valid 
- implement method performAction
    on crack:
    - the End Square is cracked 
    - if the End Square is occupied
        - the Piece on the End Square is removed from the board and the opponent's team
    - the Start Square's Piece speaks
    - the turn of the game is changed to the other player
*/
import { GameS25 } from "../elements/GameS25";
import { Action } from "./Action";
import { Location } from "../elements/Location";
import { BoardSquare } from "../elements/BoardSquare";
export class ActionCrack extends Action {
    constructor(g: GameS25, s: Location, e: Location) {
        super(g, s, e);
    }
    validAction(): boolean {
        return this.game
            .getRules()
            .checkValidCrack(this.startLocation, this.endLocation);
    }
    performAction(): void {
        let start: BoardSquare = this.game
            .getGameBoard()
            .getSquare(this.startLocation);
        let end: BoardSquare = this.game
            .getGameBoard()
            .getSquare(this.endLocation);

        end.crackThisSquare();
        if (!end.isEmpty()) {
            this.game.getOpponentTeam().removePieceFromTeam(end.removePiece());
        }
        start.getPiece()?.speak();
        this.game.changeTurn();
    }
}
