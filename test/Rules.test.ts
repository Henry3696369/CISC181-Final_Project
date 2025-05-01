import { Piece } from "../src/game/elements/Piece";
import { PieceBlueHen } from "../src/game/elements/PieceBlueHen";
import { PieceMinion } from "../src/game/elements/PieceMinion";
import { PieceScrat } from "../src/game/elements/PieceScrat";
import { GameBoard } from "../src/game/elements/GameBoard";
import { Location } from "../src/game/elements/Location";
import { GameS25 } from "../src/game/elements/GameS25";
import { Rules } from "../src/game/elements/Rules";
import { Team } from "../src/game/elements/Team";

describe("GameBoard - Problem 4", () => {
    const teamAColor: string = "Red";
    const teamBColor: string = "Blue";
    const aBlueHen: PieceBlueHen = new PieceBlueHen(
        "H",
        teamAColor,
        false,
        true,
        2,
    );
    const bBlueHen: PieceBlueHen = new PieceBlueHen(
        "H",
        teamBColor,
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
    const bMinion: PieceMinion = new PieceMinion(
        "M",
        teamBColor,
        false,
        true,
        0,
    );

    const aScrat: PieceScrat = new PieceScrat(
        "S",
        teamAColor,
        false,
        true,
        0,
        0,
    );
    const bScrat: PieceScrat = new PieceScrat(
        "S",
        teamBColor,
        false,
        true,
        0,
        0,
    );

    const aPieces: Piece[] = [aBlueHen, aMinion, aScrat];
    const bPieces: Piece[] = [bBlueHen, bMinion, bScrat];

    const myTeamA: Team = new Team(teamAColor, aPieces);
    const myTeamB: Team = new Team(teamBColor, bPieces);
    const myGameBoard: GameBoard = new GameBoard(6, 8);

    const myGame: GameS25 = new GameS25(
        myGameBoard,
        myTeamA,
        myTeamB,
        teamAColor,
    );

    // remove all pieces
    for (let row of myGame.getGameBoard().getAllSquares()) {
        for (let aSquare of row) {
            // remove piece
            if (!aSquare.isEmpty()) {
                aSquare.removePiece();
            }
        }
    }
    // load pieces in diagonal
    myGame.getGameBoard().getAllSquares()[0][0].setPiece(aBlueHen);
    myGame.getGameBoard().getAllSquares()[1][1].setPiece(bBlueHen);
    myGame.getGameBoard().getAllSquares()[2][2].setPiece(aMinion);
    myGame.getGameBoard().getAllSquares()[3][3].setPiece(bMinion);
    myGame.getGameBoard().getAllSquares()[4][4].setPiece(aScrat);
    myGame.getGameBoard().getAllSquares()[5][5].setPiece(bScrat);

    const rulesS25: Rules = new Rules(myGame);

    describe("Rules - constructor ", () => {
        test("(1 pts)  GameBoard constructor", () => {
            expect(rulesS25.getMessage()).toEqual("");
        });

        test("(3 pts)  Rules - validMove", () => {
            // move invalid - start square out of bounds
            expect(
                rulesS25.checkValidMove(new Location(8, 8), new Location(1, 3)),
            ).toEqual(false);
            // move invalid - end square out of bounds
            expect(
                rulesS25.checkValidMove(new Location(0, 0), new Location(8, 6)),
            ).toEqual(false);
            // move invalid - no piece on start square
            expect(
                rulesS25.checkValidMove(new Location(1, 0), new Location(1, 3)),
            ).toEqual(false);
            // move invalid - piece on start square belongs to other team
            expect(
                rulesS25.checkValidMove(new Location(1, 1), new Location(1, 3)),
            ).toEqual(false);
            // minion - move invalid - to occupied space
            expect(
                rulesS25.checkValidMove(new Location(2, 2), new Location(1, 1)),
            ).toEqual(false);
            // scrat move valid - to empty space
            expect(
                rulesS25.checkValidMove(new Location(4, 4), new Location(0, 2)),
            ).toEqual(true);
        });

        test("(4 pts)  Rules - validSpawn", () => {
            // invalid - start square out of bounds
            expect(
                rulesS25.checkValidSpawn(
                    new Location(7, 8),
                    new Location(1, 3),
                ),
            ).toEqual(false);
            // invalid - end square out of bounds
            expect(
                rulesS25.checkValidSpawn(
                    new Location(0, 0),
                    new Location(-1, 6),
                ),
            ).toEqual(false);
            // Spawn invalid - no piece on start square
            expect(
                rulesS25.checkValidSpawn(
                    new Location(2, 0),
                    new Location(1, 3),
                ),
            ).toEqual(false);
            // Spawn invalid - piece on start square belongs to other team
            expect(
                rulesS25.checkValidSpawn(
                    new Location(3, 3),
                    new Location(1, 3),
                ),
            ).toEqual(false);
            // minion - Spawn invalid - to occupied space
            expect(
                rulesS25.checkValidSpawn(
                    new Location(2, 2),
                    new Location(3, 3),
                ),
            ).toEqual(false);
            // Spawn valid - to empty space
            expect(
                rulesS25.checkValidSpawn(
                    new Location(2, 2),
                    new Location(0, 2),
                ),
            ).toEqual(true);
            // update scrat so it can't spawn
            aScrat.updateAction("crack");
            aScrat.updateAction("crack");
            // Spawn invalid - shouldn't be able to spawn now
            expect(
                rulesS25.checkValidSpawn(
                    new Location(4, 4),
                    new Location(0, 2),
                ),
            ).toEqual(false);
        });

        test("(4 pts)  Rules - validAttack", () => {
            // invalid - start square out of bounds
            expect(
                rulesS25.checkValidAttack(
                    new Location(3, 8),
                    new Location(1, 1),
                ),
            ).toEqual(false);
            // invalid - end square out of bounds
            expect(
                rulesS25.checkValidAttack(
                    new Location(0, 0),
                    new Location(6, 3),
                ),
            ).toEqual(false);
            // Attack invalid - no piece on start square
            expect(
                rulesS25.checkValidAttack(
                    new Location(2, 5),
                    new Location(5, 5),
                ),
            ).toEqual(false);
            // Attack invalid - piece on start square belongs to other team
            expect(
                rulesS25.checkValidAttack(
                    new Location(5, 5),
                    new Location(1, 1),
                ),
            ).toEqual(false);
            // minion - Attack invalid - minions can't attack
            expect(
                rulesS25.checkValidAttack(
                    new Location(2, 2),
                    new Location(3, 3),
                ),
            ).toEqual(false);
            // Attack invalid - no piece on end square
            expect(
                rulesS25.checkValidAttack(
                    new Location(0, 0),
                    new Location(0, 2),
                ),
            ).toEqual(false);
            // Attack invalid - piece on end square belongs to current team
            expect(
                rulesS25.checkValidAttack(
                    new Location(0, 0),
                    new Location(2, 2),
                ),
            ).toEqual(false);
            // Attack valid by a hen
            expect(
                rulesS25.checkValidAttack(
                    new Location(0, 0),
                    new Location(5, 5),
                ),
            ).toEqual(true);
            // Attack valid by a scrat
            expect(
                rulesS25.checkValidAttack(
                    new Location(4, 4),
                    new Location(3, 3),
                ),
            ).toEqual(true);
        });

        test("(4 pts)  Rules - validRecruit", () => {
            // invalid - start square out of bounds
            expect(
                rulesS25.checkValidRecruit(
                    new Location(3, -1),
                    new Location(5, 5),
                ),
            ).toEqual(false);
            // invalid - end square out of bounds
            expect(
                rulesS25.checkValidRecruit(
                    new Location(2, 2),
                    new Location(6, 3),
                ),
            ).toEqual(false);
            // Recruit invalid - no piece on start square
            expect(
                rulesS25.checkValidRecruit(
                    new Location(4, 5),
                    new Location(5, 5),
                ),
            ).toEqual(false);
            // Recruit invalid - piece on start square belongs to other team
            expect(
                rulesS25.checkValidRecruit(
                    new Location(5, 5),
                    new Location(1, 1),
                ),
            ).toEqual(false);
            // Recruit invalid - hens can't Recruit
            expect(
                rulesS25.checkValidRecruit(
                    new Location(0, 0),
                    new Location(1, 1),
                ),
            ).toEqual(false);
            // Recruit invalid - no piece on end square
            expect(
                rulesS25.checkValidRecruit(
                    new Location(2, 2),
                    new Location(0, 2),
                ),
            ).toEqual(false);
            // Recruit invalid - piece on end square belongs to current team
            expect(
                rulesS25.checkValidRecruit(
                    new Location(4, 4),
                    new Location(0, 0),
                ),
            ).toEqual(false);
            // Recruit valid by a minion
            expect(
                rulesS25.checkValidRecruit(
                    new Location(2, 2),
                    new Location(5, 5),
                ),
            ).toEqual(true);
            // Recruit valid by a scrat
            expect(
                rulesS25.checkValidRecruit(
                    new Location(4, 4),
                    new Location(1, 1),
                ),
            ).toEqual(true);
        });

        test("(4 pts)  Rules - validCrack", () => {
            // invalid - start square out of bounds
            expect(
                rulesS25.checkValidCrack(
                    new Location(3, 8),
                    new Location(0, 1),
                ),
            ).toEqual(false);
            // invalid - end square out of bounds
            expect(
                rulesS25.checkValidCrack(
                    new Location(4, 4),
                    new Location(6, 3),
                ),
            ).toEqual(false);
            // Crack invalid - no piece on start square
            expect(
                rulesS25.checkValidCrack(
                    new Location(2, 5),
                    new Location(5, 5),
                ),
            ).toEqual(false);
            // Crack invalid - piece on start square belongs to other team
            expect(
                rulesS25.checkValidCrack(
                    new Location(5, 5),
                    new Location(1, 1),
                ),
            ).toEqual(false);
            // minion - Crack invalid - minions can't Crack
            expect(
                rulesS25.checkValidCrack(
                    new Location(2, 2),
                    new Location(3, 3),
                ),
            ).toEqual(false);
            // Crack invalid - hens can't Crack
            expect(
                rulesS25.checkValidCrack(
                    new Location(0, 0),
                    new Location(3, 3),
                ),
            ).toEqual(false);

            // Crack invalid - piece on end square belongs to current team
            expect(
                rulesS25.checkValidCrack(
                    new Location(4, 4),
                    new Location(2, 2),
                ),
            ).toEqual(false);
            // Crack valid by a scrat on an empty end square
            expect(
                rulesS25.checkValidCrack(
                    new Location(4, 4),
                    new Location(0, 5),
                ),
            ).toEqual(true);
            // Crack valid by a scrat on an occupied square
            expect(
                rulesS25.checkValidCrack(
                    new Location(4, 4),
                    new Location(3, 3),
                ),
            ).toEqual(true);
        });
    });
});
