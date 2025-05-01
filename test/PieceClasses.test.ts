import { Piece } from "../src/game/elements/Piece";
import { PieceBlueHen } from "../src/game/elements/PieceBlueHen";
import { PieceMinion } from "../src/game/elements/PieceMinion";
import { PieceScrat } from "../src/game/elements/PieceScrat";

describe("Piece ", () => {
    const aBlueHen: Piece = new PieceBlueHen("H", "Red", false, true, 2);
    const aMinion: Piece = new PieceMinion("M", "Red", false, true, 0);
    const aScrat: Piece = new PieceScrat("S", "Blue", false, true, 0,0);

    describe("Piece Hierarchy", () => {
        test("(2 pts) Piece instances", () => {
            expect(aBlueHen).toBeInstanceOf(Piece);
            expect(aBlueHen).toBeInstanceOf(PieceBlueHen);
            expect(aBlueHen).not.toBeInstanceOf(PieceMinion);
            expect(aMinion).toBeInstanceOf(Piece);
            expect(aMinion).toBeInstanceOf(PieceMinion);
            expect(aMinion).not.toBeInstanceOf(PieceBlueHen);
            expect(aScrat).toBeInstanceOf(Piece);
            expect(aScrat).toBeInstanceOf(PieceScrat);
        });

        test("(2 pts) Piece - speak", () => {
            expect(aBlueHen.speak()).toEqual("Go UD!");
            expect(aMinion.speak()).toEqual("Bello!");
            expect(aScrat.speak()).toEqual("Aaaahhhh!");
        });

        test("(2 pts) PieceScrat increase methods", () => {
            let bScrat: PieceScrat = new PieceScrat(
                "S",
                "Blue",
                false,
                true,
                0,
                0,
            );
            bScrat.increaseNumAttacks();
            expect(bScrat.getNumAttacks()).toEqual(1);
            bScrat.increaseNumCracks();
            bScrat.increaseNumCracks();
            expect(bScrat.getNumCracks()).toEqual(2);
            bScrat.increaseNumRecruits();
            bScrat.increaseNumRecruits();
            bScrat.increaseNumRecruits();
            expect(bScrat.getNumRecruits()).toEqual(3);
        });

        test("(1 pts) PieceBlueHen updateAction", () => {
            let bBlueHen: PieceBlueHen = new PieceBlueHen();
            bBlueHen.updateAction("attack");
            bBlueHen.updateAction("attack");
            expect(bBlueHen.getNumAttacks()).toEqual(2);
        });

        test("(1 pts) PieceBlueHen allowableActions", () => {
            expect(aBlueHen.allowableAction("move")).toEqual(true);
            expect(aBlueHen.allowableAction("attack")).toEqual(true);
            expect(aBlueHen.allowableAction("spawn")).toEqual(true);
            expect(aBlueHen.allowableAction("recruit")).toEqual(false);
            expect(aBlueHen.allowableAction("crack")).toEqual(false);
        });

        test("(1 pts) PieceMinion updateAction", () => {
            let bMinion: PieceMinion = new PieceMinion();
            bMinion.updateAction("recruit");
            bMinion.updateAction("recruit");
            expect(bMinion.getNumRecruits()).toEqual(2);
        });

        test("(1 pts) PieceMinion allowableActions", () => {
            expect(aMinion.allowableAction("move")).toEqual(true);
            expect(aMinion.allowableAction("attack")).toEqual(false);
            expect(aMinion.allowableAction("spawn")).toEqual(true);
            expect(aMinion.allowableAction("recruit")).toEqual(true);
            expect(aMinion.allowableAction("crack")).toEqual(false);
        });

        test("(1 pts) PieceScrat updateAction", () => {
            let bScrat: PieceScrat = new PieceScrat(
                "S",
                "Blue",
                false,
                true,
                0,
                0,
            );
            bScrat.updateAction("recruit");
            bScrat.updateAction("recruit");
            expect(bScrat.getNumRecruits()).toEqual(2);
            bScrat.updateAction("attack");
            bScrat.updateAction("attack");
            bScrat.updateAction("attack");
            expect(bScrat.getNumAttacks()).toEqual(3);
            bScrat.updateAction("crack");
            expect(bScrat.getNumCracks()).toEqual(1);
        });

        test("(1 pts) PieceScrat allowableActions", () => {
            expect(aScrat.allowableAction("move")).toEqual(true);
            expect(aScrat.allowableAction("attack")).toEqual(true);
            expect(aScrat.allowableAction("recruit")).toEqual(true);
            expect(aScrat.allowableAction("crack")).toEqual(true);

            expect(aScrat.allowableAction("spawn")).toEqual(true);
            aScrat.updateAction("crack");
            aScrat.updateAction("crack");
            // after Scrat cracks two squares it can't spawn anymore
            expect(aScrat.allowableAction("spawn")).toEqual(false);
        });

        test("(2 pts) PieceScrat spawn", () => {
            let copyScrat: Piece = aScrat.spawn();
            expect(copyScrat.getSymbol()).toEqual("s");
            expect(copyScrat.isOriginal()).toEqual(false);
            expect(copyScrat.allowableAction("move")).toEqual(true);
            expect(copyScrat.allowableAction("attack")).toEqual(true);
            expect(copyScrat.allowableAction("recruit")).toEqual(true);
            expect(copyScrat.allowableAction("crack")).toEqual(true);
            expect(copyScrat.allowableAction("spawn")).toEqual(false);
        });

        test("(1 pts) toString ", () => {
            expect(aBlueHen.toString()).toEqual("Red H");
            expect(aMinion.toString()).toEqual("Red M");
            expect(aScrat.toString()).toEqual("Blu S");
        });
    });
});
