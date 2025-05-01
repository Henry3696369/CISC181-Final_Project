import { Piece } from "./Piece";

/* PieceScrat - Problem 4

Create a PieceScrat class that extends the Piece class.
It should have the following:
- constant MAX_CRACKS to represent the maximum number of squares it can crack and 
  set it to 2
- member field to represent whether this piece can crack a square or not  (true/false)
- member field to represent the number of attacks its made
- member field to represent the number of recruits its made

- constructor with the parameters required by the superclass plus two
    new paratmeters: one for number of attacks and number of recruits (in that order)
     - calls the super class' constructor (symbol should be set to 'S' by default)     -
     - sets the number of attacks 
     - sets the number of recruits
     - sets the number of squares it cracked to 0
     - adds add "move", "attack" ,"recruit", "spawn", and "crack"
        to the allowable actions array.
- accessors 
    - getNumAttacks, getNumRecruits, getNumCracks
- mutator 
    – increaseNumAttacks - increments number of attacks by 1   
- mutator
    - increaseNumRecruits - increments number of recruits by 1
- mutator
    - increaseNumCracks - increments number of cracks by 1
- implement the speak method:
    - scrat should yell "Aaaahhhh!"
- implement the validMovePath method
    - for now it will return true
- implement the spawn method 
    - it should increase the number of spawns for 
    the object doing the spawning and then return a new PieceScrat
    with the following:
        - symbol - should match values of spawned object but should be lowercase
        - teamColor - should match values of spawned object
        - hidden - should match values of spawned object
        - original - should be set to false
- implement the canSpawn method
    - the piece can spawn as long as it is original and has
    - less than the maximum cracks allowed
- implement the updateAction method
    
*/

export class PieceScrat extends Piece {
    public static readonly MAX_NUM_CRACKS: number = 2;
    private numCracked: number;
    private numAttacks: number;
    private numRecruits: number;
    constructor(
        symbol: string = "M",
        teamColor: string = "NON",
        hidden: boolean = false,
        original: boolean = true,
        numRecruits: number = 0,
        numAttacks: number = 0,
    ) {
        super(symbol, teamColor, hidden, original);
        this.numRecruits = numRecruits;
        this.numAttacks = numAttacks;
        this.numCracked = 0;
        this.actionAllowed = ["move", "attack", "recruit", "spawn", "crack"];
    }
    getNumAttacks(): number {
        return this.numAttacks;
    }
    getNumRecruits(): number {
        return this.numRecruits;
    }
    getNumCracks(): number {
        return this.numCracked;
    }
    increaseNumAttacks() {
        this.numAttacks += 1;
    }
    increaseNumRecruits() {
        this.numRecruits += 1;
    }
    increaseNumCracks() {
        this.numCracked += 1;
    }
    speak(): string {
        return "Aaaahhhh!";
    }
    validMovePath(start: Location, end: Location): boolean {}
    spawn(): Piece {
        this.numSpawns += 1;
        return new PieceScrat(
            this.getSymbol().toLowerCase(),
            this.getTeamColor(),
            this.hidden,
            false,
            this.getNumRecruits(),
            this.getNumAttacks(),
        );
    }
    canSpawn(): boolean {
        return this.original && this.numCracked < PieceScrat.MAX_NUM_CRACKS;
    }
    updateAction(action: string): void {
        if (action === "attack") {
            this.increaseNumAttacks();
        }
        if (action === "recruit") {
            this.increaseNumRecruits();
        }
        if (action === "crack") {
            this.increaseNumCracks();
        }
    }
}
