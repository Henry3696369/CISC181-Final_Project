/*Problem 11: [5 points]
Represents a 'attack' action.

Create a class named ActionAttack that extends Action.It has the following:
- constructor with three parameters that get passed to the super's constructor
- implement method validAction 
    call checkValidAttack from your rules class and return
    whether this move is valid 
- implement method performAction
    on an attack:
    - the Piece on the End Square is removed from the board
    - the Piece on the End Square is removed from the opponent's team
    - Piece on the Start Square is moved to the End Square
    - the Piece being attacked speaks
    - the turn of the game is changed to the other player
*/
import { GameS25 } from "../elements/GameS25";
import { Action } from "./Action";
import { Location } from "../elements/Location";
import { Piece } from "../elements/Piece";
export class ActionAttack extends Action {
    constructor(g: GameS25, s: Location, e: Location) {
        super(g, s, e);
    }
    validAction(): boolean {
        return this.game
            .getRules()
            .checkValidAttack(this.startLocation, this.endLocation);
    }
    performAction(): void {
        let removed: Piece | null = this.game
            .getGameBoard()
            .getSquare(this.endLocation)
            .removePiece();
        this.game.getOpponentTeam().removePieceFromTeam(removed);
        let moved: Piece | null = this.game
            .getGameBoard()
            .getSquare(this.startLocation)
            .removePiece();
        this.game.getGameBoard().getSquare(this.endLocation).setPiece(moved);
        removed?.speak();
        this.game.changeTurn();
    }
}
