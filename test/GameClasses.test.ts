import { Piece } from "../src/game/elements/Piece";
import { PieceBlueHen } from "../src/game/elements/PieceBlueHen";
import { PieceMinion } from "../src/game/elements/PieceMinion";
import { Team } from "../src/game/elements/Team";
import { GameBoard } from "../src/game/elements/GameBoard";
import { Game } from "../src/game/elements/Game";
import { GameS25 } from "../src/game/elements/GameS25";
import { Rules } from "../src/game/elements/Rules";

describe("GameS25 constructor - Problem 6 and 7", () => {
    const teamAColor: string = "Red";
    const teamBColor: string = "Blue";
    const aBlueHen: PieceBlueHen = new PieceBlueHen(
        "H",
        teamAColor,
        false,
        true,
        2,
    );
    const aBlueHen2: PieceBlueHen = new PieceBlueHen(
        "H",
        teamAColor,
        false,
        true,
        2,
    );
    const aMinion: PieceMinion = new PieceMinion(
        "M",
        teamAColor,
        false,
        true,
        0,
    );
    const bBlueHen: PieceBlueHen = new PieceBlueHen(
        "H",
        teamBColor,
        false,
        true,
        2,
    );
    const bBlueHen2: PieceBlueHen = new PieceBlueHen(
        "H",
        teamBColor,
        false,
        true,
        2,
    );
    const bMinion: PieceMinion = new PieceMinion(
        "M",
        teamBColor,
        false,
        true,
        0,
    );
    const bMinion2: PieceMinion = new PieceMinion(
        "M",
        teamBColor,
        false,
        true,
        0,
    );

    const aPieces: Piece[] = [aBlueHen, aMinion, aBlueHen2];
    const bPieces: Piece[] = [bBlueHen, bBlueHen2, bMinion, bMinion2];

    const myTeamA: Team = new Team(teamAColor, aPieces);
    const myTeamB: Team = new Team(teamBColor, bPieces);
    const noPieceTeamA: Team = new Team(teamAColor, []);
    const noPieceTeamB: Team = new Team(teamBColor, []);
    const myGameBoard: GameBoard = new GameBoard(4, 5);

    const myGame: GameS25 = new GameS25(
        myGameBoard,
        myTeamA,
        myTeamB,
        teamAColor,
    );

    describe("GameS25", () => {
        test("(2 pts)  GameS25 hierarchy", () => {
            expect(myGame instanceof Game).toEqual(true);
            expect(myGame instanceof GameS25).toEqual(true);
        });

        test("(3 pts)  GameS25 constructor", () => {
            // Team A starts
            expect(myGame.isTurn(myTeamA)).toEqual(true);
            expect(myGame.isTurn(myTeamB)).toEqual(false);
            expect(myGame.getCurrentTeam().getTeamColor()).toEqual(teamAColor);
            expect(myGame.getOpponentTeam().getTeamColor()).toEqual(teamBColor);
            // rules
            expect(myGame.getRules() instanceof Rules).toEqual(true);
        });

        test("(5 pts)  Game25 initializeGameBoard", () => {
            // Team B turn
            const smallBoard: GameBoard = new GameBoard(2, 2);
            const smallTeamA: Team = new Team(teamAColor, [aBlueHen, aMinion]);
            const smallTeamB: Team = new Team(teamBColor, [bBlueHen, bMinion]);
            const smallGame: GameS25 = new GameS25(
                smallBoard,
                smallTeamA,
                smallTeamB,
                teamAColor,
            );
            let aHenFound: boolean = false;
            let bHenFound: boolean = false;
            let aMinionFound: boolean = false;
            let bMinionFound: boolean = false;
            let count: number = 0;

            // Look for all the pieces that should be on the board
            for (let row of smallGame.getGameBoard().getAllSquares()) {
                for (let col of row) {
                    if (col.getPiece() === aBlueHen) {
                        aHenFound = true;
                        count++;
                    } else if (col.getPiece() === bBlueHen) {
                        bHenFound = true;
                        count++;
                    } else if (col.getPiece() === aMinion) {
                        aMinionFound = true;
                        count++;
                    } else if (col.getPiece() === bMinion) {
                        bMinionFound = true;
                        count++;
                    }
                }
            }
            // Each Piece should be found
            expect(aHenFound).toEqual(true);
            expect(aMinionFound).toEqual(true);
            expect(bHenFound).toEqual(true);
            expect(bMinionFound).toEqual(true);
            // Each piece should only be on the board once
            expect(count).toEqual(4);
        });

        test("(2 pts)  Game25 changeTurn", () => {
            // Team A starts
            expect(myGame.isTurn(myTeamA)).toEqual(true);
            // change the turn
            myGame.changeTurn();
            expect(myGame.isTurn(myTeamA)).toEqual(false);
            expect(myGame.isTurn(myTeamB)).toEqual(true);
            expect(myGame.getCurrentTeam().getTeamColor()).toEqual(teamBColor);
            expect(myGame.getOpponentTeam().getTeamColor()).toEqual(teamAColor);
        });

        test("(2 pts)  Game25 changeTurn again", () => {
            // Team B turn
            expect(myGame.isTurn(myTeamB)).toEqual(true);
            // change the turn
            myGame.changeTurn();
            expect(myGame.isTurn(myTeamA)).toEqual(true);
            expect(myGame.isTurn(myTeamB)).toEqual(false);
            expect(myGame.getCurrentTeam().getTeamColor()).toEqual(teamAColor);
            expect(myGame.getOpponentTeam().getTeamColor()).toEqual(teamBColor);
        });

        test("(4 pts)  Game25 game ended and get winner", () => {
            let aGame: GameS25 = new GameS25(
                myGameBoard,
                noPieceTeamA,
                myTeamB,
                teamAColor,
            );
            expect(aGame.isGameEnded()).toEqual(true);
            expect(aGame.getWinner()).toEqual(teamBColor);

            let bGame: GameS25 = new GameS25(
                myGameBoard,
                myTeamA,
                noPieceTeamB,
                teamAColor,
            );
            expect(bGame.isGameEnded()).toEqual(true);
            expect(bGame.getWinner()).toEqual(teamAColor);
        });
    });
});
