/* HW10 Problem 3

In the constructor, add "move", "recruit" and "spawn"
to the allowable actions array.

Override the updateAction method with the following
logic:
-  if the action is "recruit", then call increaseNumRecruits
*/

import { Piece } from "./Piece";
import { Location } from "./Location";

export class PieceMinion extends Piece {
    private numRecruits: number;

    public static readonly MAX_NUM_SPAWNED: number = 3;

    constructor(
        symbol: string = "M",
        teamColor: string = "NON",
        hidden: boolean = false,
        original: boolean = true,
        numRecruits: number = 0,
    ) {
        super(symbol, teamColor, hidden, original);
        this.numRecruits = numRecruits;
        this.actionAllowed = ["move", "recruit", "spawn"];
    }

    updateAction(action: string): void {
        if (action === "recruit") {
            this.increaseNumRecruits();
        }
    }

    getNumRecruits(): number {
        return this.numRecruits;
    }

    increaseNumRecruits(): void {
        this.numRecruits += 1;
    }

    canSpawn(): boolean {
        return this.original && this.numSpawns <= PieceMinion.MAX_NUM_SPAWNED;
    }

    speak(): string {
        return "Bello!";
    }

    validMovePath(start: Location, end: Location): boolean {
        if (
            Math.abs(end.getRow() - start.getRow()) === 1 &&
            Math.abs(end.getCol() - start.getCol()) === 1
        ) {
            return true;
        }
        return false;
    }

    spawn(): PieceMinion {
        this.numSpawns += 1;
        return new PieceMinion(
            this.symbol.toLowerCase(),
            this.teamColor,
            this.hidden,
            false,
            0,
        );
    }
}
