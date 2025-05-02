/*Problem 12: [5 points]
Represents a 'recruit' action.

Create a class named ActionRecruit that extends Action.It has the following:
- constructor with three parameters that get passed to the super's constructor
- implementation for method validAction 
    call checkValidRecruit from your rules class and return
    whether this move is valid 
- implement method performAction
    on an recruit:
    - the Piece on the End Square is removed from the opponent's team
    - the Piece on the End Square is added to the current player's team
    - the Piece being recruited speaks
    - the turn of the game is changed to the other player
*/
import { Action } from "./Action";
import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
import { BoardSquare } from "../elements/BoardSquare";
import { Piece } from "../elements/Piece";
export class ActionRecruit extends Action {
    constructor(g: GameS25, s: Location, e: Location) {
        super(g, s, e);
    }
    validAction(): boolean {
        return this.game
            .getRules()
            .checkValidRecruit(this.startLocation, this.endLocation);
    }
    performAction(): void {
        let start: BoardSquare = this.game
            .getGameBoard()
            .getSquare(this.startLocation);
        start.getPiece()?.updateAction("recruit");
        let end: BoardSquare = this.game
            .getGameBoard()
            .getSquare(this.endLocation);
        let recruited: Piece | null = end.getPiece();
        this.game.getOpponentTeam().removePieceFromTeam(recruited);
        this.game.getCurrentTeam().addPieceToTeam(recruited);
        recruited?.speak();
        this.game.changeTurn();
    }
}
