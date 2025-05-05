/*
This is a new piece which is called PieceOfCake. Its unique skill is mock, which can
prevent other pieces from spawning, because it causes emotional damage!
*/
import { Piece } from "./Piece";
import { Location } from "./Location";

export class PieceOfCake extends Piece {
    public static readonly MAX_NUM_ATTACKS: number = 3;
    private numMocks: number;
    private numAttacks: number;

    constructor(
        symbol: string = "Cake",
        teamColor: string = "NON",
        hidden: boolean = false,
        original: boolean = true,
        numAttacks: number = 0,
        numMocks: number = 0, // new field to record the number of mocking. #New Piece
    ) {
        super(symbol, teamColor, hidden, original);
        this.numMocks = numMocks;
        this.numAttacks = numAttacks;
        this.actionAllowed = ["move", "spawn", "mock"];
    }

    updateAction(action: string): void {
        if (action === "attack") {
            this.increaseNumAttacks();
        }
        if (action === "mock") {
            this.increaseNumMocks();
        }
        if (this.getNumMocks() === 1) {
            this.actionAllowed.push("attack"); // If the piece mock 1 pieces, It will have new skill - Attack! #New Piece
        }
    }
    getNumMocks(): number {
        return this.numMocks;
    }

    increaseNumMocks(): void {
        this.numMocks += 1;
    }
    increaseNumAttacks(): void {
        this.numAttacks += 1;
    }

    speak(): string {
        return "Hahahahahahahahaha!"; // New speaking string. #New Piece
    }

    spawn(): PieceOfCake {
        this.numSpawns += 1;
        return new PieceOfCake(
            this.symbol.toLowerCase(),
            this.teamColor,
            this.hidden,
            false,
            0,
        );
    }

    validMovePath(start: Location, end: Location): boolean {
        if (
            Math.abs(end.getRow() - start.getRow()) <= 1 &&
            Math.abs(end.getCol() - start.getCol()) <= 1
        ) {
            return true;
        }
        return false;
    } // It can only move 1 square at any direction. #New Piece

    canSpawn(): boolean {
        return this.original && this.numSpawns === 0;
    }
}
