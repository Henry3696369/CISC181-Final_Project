import { Game } from "./Game";
import { GameBoard } from "./GameBoard";
import { Team } from "./Team";
import { Rules } from "./Rules";
/*Problem 7: [8 points]
Create a class named GameS25 that extends Game. 
This will represent the game that we build for our Homework 10 
this semester.
This class should have the following members:
- a member field for the Rules of this game
- constructor with the same number of parameters as its
   superclass. It should:
   - call the super class constructor
   - set the rules field to a new Rules object
           =  new Rules(this)
- acessor methods:
    - getRules    
- implement isGameEnded method
    - for our game - the game has ended when either one or both teams
        has no pieces left
- implement getWinner method
    - for our game the winner is the one that still has pieces - if both
        teams have no pieces - return "Tie"

*/
export class GameS25 extends Game {
    private rules: Rules;
    constructor(board: GameBoard, teamA: Team, teamB: Team, turn: string) {
        super(board, teamA, teamB, turn);
        this.rules = new Rules(this);
    }
    getRules(): Rules {
        return this.rules;
    }
    getWinner(): string {
        if (!this.isGameEnded()) {
            return "No winner yet!";
        } else {
            if (this.teamA.getTeamPoints() > this.teamB.getTeamPoints()) {
                return `${this.teamA.getTeamColor()}`;
            } else if (
                this.teamA.getTeamPoints() === this.teamB.getTeamPoints()
            ) {
                return "Tie!";
            } else {
                return `${this.teamB.getTeamColor()}`;
            }
        }
    }
    // #New Objective: Compare the points to get the winner.
    isGameEnded(): boolean {
        return (
            this.teamA.getTeamPieces().length === 0 ||
            this.teamB.getTeamPieces().length === 0
        );
    }
}
