/*Problem 13: [5 points]
Represents a 'spawn' action.

Create a class named ActionSpawn that extends Action. It has the following:
- constructor with three parameters that get passed to the super's constructor
- implementation for method validAction 
    call checkValidSpawn from your rules class and return
    whether this move is valid 
- implement method performAction
    on a spawn:
    - the Piece on the Start Square is spawned
    - if the end square is not cracked
        - the spawn is placed on the end square and added to the current team   
    - if the end square is cracked 
       - the current team loses this piece it doesn't get added to the board or the team 
        Note: you should still spawn it so it counts toward number of spawns 
    - the Piece being spawned speaks
    - the turn of the game is changed to the other player
*/
import { Action } from "./Action";
import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
import { BoardSquare } from "../elements/BoardSquare";
import { Piece } from "../elements/Piece";
export class ActionSpawn extends Action {
    constructor(g: GameS25, s: Location, e: Location) {
        super(g, s, e);
    }
    validAction(): boolean {
        return this.game
            .getRules()
            .checkValidSpawn(this.startLocation, this.endLocation);
    }
    performAction(): void {
        let start: BoardSquare = this.game
            .getGameBoard()
            .getSquare(this.startLocation);
        start.getPiece()?.updateAction("spawn");
        let end: BoardSquare = this.game
            .getGameBoard()
            .getSquare(this.endLocation);
        let spwaned: Piece = start.getPiece()?.spawn()!;
        if (!end.isCracked()) {
            end.setPiece(spwaned!);
            this.game.getCurrentTeam().addPieceToTeam(spwaned!);
        }
        spwaned.speak();
        this.game.changeTurn();
    }
}
