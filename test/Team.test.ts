import { Piece } from "../src/game/elements/Piece";
import { PieceBlueHen } from "../src/game/elements/PieceBlueHen";
import { PieceMinion } from "../src/game/elements/PieceMinion";
import { Team } from "../src/game/elements/Team";

describe("Team - Problem 5", () => {
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

    describe("Team - constructor", () => {
        test("(2 pts)  Team constructor", () => {
            expect(myTeamA.getTeamColor()).toEqual(teamAColor);
            expect(myTeamA.getTeamPieces().length).toEqual(3);
            // pieces array on team shouldn't be a deep copy
            expect(myTeamA.getTeamPieces()).toBe(aPieces);
            // pieces int the array shouldn't be a deep copy
            //[aBlueHen, aMinion, aBlueHen2]
            expect(myTeamA.getTeamPieces()[0]).toBe(aBlueHen);
            expect(myTeamA.getTeamPieces()[1]).toBe(aMinion);
            expect(myTeamA.getTeamPieces()[2]).toBe(aBlueHen2);

            expect(myTeamB.getTeamColor()).toEqual(teamBColor);
            expect(myTeamB.getTeamPieces().length).toEqual(4);
            // pieces array on team shouldn't be a deep copy
            expect(myTeamB.getTeamPieces()).toBe(bPieces);
            // pieces int the array shouldn't be a deep copy
            //[bBlueHen, bBlueHen2, bMinion, bMinion2];
            expect(myTeamB.getTeamPieces()[0]).toBe(bBlueHen);
            expect(myTeamB.getTeamPieces()[1]).toBe(bBlueHen2);
            expect(myTeamB.getTeamPieces()[2]).toBe(bMinion);
            expect(myTeamB.getTeamPieces()[3]).toBe(bMinion2);
        });

        test("(4 pts) Team removePiece", () => {
            // Team B array
            //[bBlueHen, bBlueHen2, bMinion, bMinion2];
            expect(myTeamB.getTeamPieces().length).toEqual(4);

            // Remove the piece from middle
            myTeamB.removePieceFromTeam(bMinion);
            expect(myTeamB.getTeamPieces().length).toEqual(3);

            // pieces left should be
            //[bBlueHen, bBlueHen2, bMinion2]
            expect(myTeamB.getTeamPieces()[0]).toBe(bBlueHen);
            expect(myTeamB.getTeamPieces()[1]).toBe(bBlueHen2);
            expect(myTeamB.getTeamPieces()[2]).toBe(bMinion2);

            // removed from front
            myTeamB.removePieceFromTeam(bBlueHen);
            expect(myTeamB.getTeamPieces().length).toEqual(2);

            // pieces left should be
            //[bBlueHen2, bMinion2]
            expect(myTeamB.getTeamPieces()[0]).toBe(bBlueHen2);
            expect(myTeamB.getTeamPieces()[1]).toBe(bMinion2);

            // removed from end
            myTeamB.removePieceFromTeam(bMinion2);
            expect(myTeamB.getTeamPieces().length).toEqual(1);

            // pieces left should be
            //[bBlueHen2]
            expect(myTeamB.getTeamPieces()[0]).toBe(bBlueHen2);
        });

        test("(4 pts) Team addPieceToTeam", () => {
            // [aBlueHen, aMinion, aBlueHen2];
            expect(myTeamA.getTeamPieces().length).toEqual(3);
            // add a piece that was on Blue Team to Team A
            myTeamA.addPieceToTeam(bBlueHen);
            expect(myTeamA.getTeamPieces().length).toEqual(4);

            expect(myTeamA.getTeamPieces()[0]).toBe(aBlueHen);
            expect(myTeamA.getTeamPieces()[1]).toBe(aMinion);
            expect(myTeamA.getTeamPieces()[2]).toBe(aBlueHen2);

            expect(myTeamA.getTeamPieces()[3]).toBe(bBlueHen);
            // color of this piece should have changed to teamAColor
            expect(myTeamA.getTeamPieces()[3].getTeamColor()).toEqual(
                teamAColor,
            );
            expect(bBlueHen.getTeamColor()).toEqual(teamAColor);
        });
    });
});
