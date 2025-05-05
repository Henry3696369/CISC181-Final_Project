/*Problem 15: [15 points] - This class will be graded manually by the TAs
Create a new class named Controller. 
This class will interact with the game elements and actions,
and the view used to capture user input.
It should have the following members:
- member field to represnt the game - GameS25 object
- constructor with two parameters:
    - number of rows for the gameboard
    - number of columns for the gameboard
    - calls createGame and assigns it’s return value to the GameS25 property
- method createGame has two parameters: number of rows and number of columns
    and returns a GameS25 object
    this method should create a GameS25 with the following:
        - the GameBoard property should have the number of rows and columns passed in
        - the teamA object should have with 3 Piece objects: 
            a PieceBluehen, a PieceMinion, a PieceScrat
            the color of the team is your choice (don't choose black or white)
        - the teamB object should also have 3 Piece objects: 
            a PieceBluehen, a PieceMinion, a PieceScrat
             the color of the team is your choice (don't choose black or white or 
             the color you chose for teamA)
        - the turn should be set to the color of teamA
    -Note: you can create helper functions as you see fit
- accessor 
    - getGame
- method getTurn 
    has no parameters and returns a string
    indicating whose turn it is
- method getStatus
    has no parameters and returns a string
    with the current message in the Rules instance
    Note: Use the UML diagram to see how to access the Rules
    member message field
- method carryOutAction that three parameters in this order:
    - a start square location, an end square location, and a string for action type
    - this method should create the appropriate action based on action type:
        "move" -> ActionMove
        "attack" -> ActionAttack
        "recruit" -> ActionRecruit
        "spawn" -> ActionSpawn
        "crack" -> ActionCrack
    - the method should check if the action is valid and if so it should perform the action
        (use your methods created in the Action classes!)
    - this method should return whether or not this action was valid

Once you have finished this method, you should be able to use: 
    npm run start 
to play your game with a text based interface.
Play your game to check if it is behaving as described in class.
*/

import { GameS25 } from "./game/elements/GameS25";
import { Team } from "./game/elements/Team";
import { Location } from "./game/elements/Location";
import { PieceBlueHen } from "./game/elements/PieceBlueHen";
import { PieceMinion } from "./game/elements/PieceMinion";
import { PieceScrat } from "./game/elements/PieceScrat";
import { GameBoard } from "./game/elements/GameBoard";
import { ActionMove } from "./game/actions/ActionMove";
import { Action } from "./game/actions/Action";
import { ActionAttack } from "./game/actions/ActionAttack";
import { ActionCrack } from "./game/actions/ActionCrack";
import { ActionSpawn } from "./game/actions/ActionSpawn";
import { ActionRecruit } from "./game/actions/ActionRecruit";
import { PieceOfCake } from "./game/elements/PieceOfCake(New Piece)";
import { ActionMock } from "./game/actions/ActionMock(New Action)";

export class Controller {
    private game: GameS25;
    constructor(rows: number, cols: number) {
        this.game = this.createGame(rows, cols);
    }
    getGame(): GameS25 {
        return this.game;
    }
    getStatus(): string {
        return this.game.getRules().getMessage();
    }
    getTurn(): string {
        return this.game.getTurn();
    }
    carryOutAction(
        startLocation: Location,
        endLocation: Location,
        actionType: string,
    ): boolean {
        if (actionType === "move") {
            let action: Action = new ActionMove(
                this.game,
                startLocation,
                endLocation,
            );
            if (action.validAction()) {
                action.performAction();
                return true;
            }
            return false;
        } else if (actionType === "attack" || actionType === "Attack") {
            let action: Action = new ActionAttack(
                this.game,
                startLocation,
                endLocation,
            );
            if (action.validAction()) {
                action.performAction();
                return true;
            }
            return false;
        } else if (actionType === "spawn" || actionType === "Spawn") {
            let action: Action = new ActionSpawn(
                this.game,
                startLocation,
                endLocation,
            );
            if (action.validAction()) {
                action.performAction();
                return true;
            }
            return false;
        } else if (actionType === "recruit" || actionType === "Recruit") {
            let action: Action = new ActionRecruit(
                this.game,
                startLocation,
                endLocation,
            );
            if (action.validAction()) {
                action.performAction();
                return true;
            }
            return false;
        } else if (actionType === "crack" || actionType === "Crack") {
            let action: Action = new ActionCrack(
                this.game,
                startLocation,
                endLocation,
            );
            if (action.validAction()) {
                action.performAction();
                return true;
            }
            return false;
        } else if (actionType === "mock" || actionType === "Mock") {
            let action: Action = new ActionMock(
                this.game,
                startLocation,
                endLocation,
            );
            if (action.validAction()) {
                action.performAction();
                return true;
            }
            return false;
        }
        return false;
    }
    createTeam(teamColor: string): Team {
        let team: Team = new Team(teamColor, [
            new PieceBlueHen("H", teamColor),
            new PieceMinion("M", teamColor),
            new PieceScrat("S", teamColor),
            new PieceOfCake("C", teamColor),
        ]);
        return team;
    }
    createGame(rows: number, cols: number): GameS25 {
        let teamA: Team = this.createTeam("Red");
        let teamB: Team = this.createTeam("Yellow");
        let board = new GameBoard(rows, cols);
        let game: GameS25 = new GameS25(
            board,
            teamA,
            teamB,
            teamA.getTeamColor(),
        );
        return game;
    }
}
