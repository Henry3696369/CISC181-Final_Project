/*
Add your BoardSquare class code from HW10 Part A
*/
import { BoardSquare } from "./BoardSquare";
import { Location } from "./Location";

/*Problem 2: [12 points]
We are going to represent the game board with
a class name GameBoard. It will contain a 
2D array of BoardSquare objects.

Create a class named GameBoard with the following:
- member field to represent number of rows on the board
- member field to represent number of columns on the board
   (rows start at top of board with row 0 - 
    columns start at left side of board with column 0)
- member field to represent all the spaces on the board – 
    this should be a 2 dimensional array of BoardSquare objects
- constructor with two parameters in this order:
    - number of rows
    - number of columns 
    - this constructor should set these member fields
     and set the 2D array member field to an empty array 
- accessors
    - getNumRows, getNumColumns, getAllSquares
- accessor
    - getSquare that has one parameter of type Location and returns
    the BoardSquare at that location's row and column
- a method named inBounds with two parameters:
    - row index and column index (in that order) representing the location of a 
    square on the game board and returns a boolean value representing whether 
    the location of this space is within the bounds of the board 
    (For example:  inBounds(5,5) should return false for any board
          with more than 6 rows or more than 6 columns)
- private method named setUpEmptyBoard with no parameters and no return value
    - This method creates a BoardSquare object for each location 
    in the 2 dimensional array of BoardSquares.  
    Use nested loops! You should alternate colors between black and white.
    You should start the color of the board in
    row 0 and col 0 to black and then row 0 col 1 to white.
    NOTE: after completing this method - add a statement to your 
    constructor to call this setUpEmptyBoard method
    After you have done this - see the bottom of the file for code
    that will create a GameBoard and display the colors so you can
    debug.
    HINT: All even rows will start with black and 
    all odd rows will start with white
- method named isBoardFull that has no parameters and returns a boolean
    representing whether there are no empty squares on the board
    NOTE: This is SIMILAR LOGIC TO WEEK_2_3 function boardFull
- method named findRandomEmptySquare with no parameters and 
   returns a BoardSquare. This method should call 
   getRandomInt() method (already written for you)
   to generate random row and column indexes
   if this location on the Board is empty – it should return this BoardSquare,
   if not, it should repeat the process until it finds an empty space. 
   NOTE: This is SIMILAR LOGIC TO WEEK_2_3 function findRandomEmptySquare
- method toString() is already defined for you

*/
export class GameBoard {
    private square: BoardSquare[][];
    private numRows: number;
    private numCols: number;
    constructor(row: number, col: number) {
        this.numCols = col;
        this.numRows = row;
        this.square = [];
        this.setUpEmptyBoard();
    }
    public getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    toString(): string {
        let boardString: string = "";
        boardString = boardString.concat("Col :" + "       ");

        for (let col = 0; col < this.numCols; col++) {
            boardString = boardString.concat(col + "        ");
        }
        boardString = boardString.concat("\n");
        for (let row = 0; row < this.numRows; row++) {
            boardString = boardString.concat("Row : " + row + "   ");
            for (let col = 0; col < this.numCols; col++) {
                boardString = boardString.concat(
                    this.square[row][col].toString() + "  ",
                );
            }
            boardString = boardString.concat("\n");
        }
        return boardString;
    }
    getAllSquares(): BoardSquare[][] {
        return this.square;
    }
    getNumRows(): number {
        return this.numRows;
    }
    getNumColumns(): number {
        return this.numCols;
    }
    getSquare(location: Location): BoardSquare {
        let row: number = location.getRow();
        let col: number = location.getCol();
        return this.square[row][col];
    }
    inBounds(row: number, col: number): boolean {
        if (
            row >= 0 &&
            row <= this.numRows - 1 &&
            col >= 0 &&
            col <= this.numCols - 1
        ) {
            return true;
        } else {
            return false;
        }
    }
    isBoardFull(): boolean {
        for (let each of this.square) {
            for (let each2 of each) {
                if (each2.toString() === "-------") {
                    return false;
                }
            }
        }
        return true;
    }
    private setUpEmptyBoard(): void {
        for (let y: number = 0; y <= this.numRows - 1; y++) {
            this.square.push([]);
            for (let x: number = 0; x <= this.numCols - 1; x++) {
                if (y % 2 === 0) {
                    if (x % 2 === 0) {
                        this.square[y].push(new BoardSquare("black"));
                    } else {
                        this.square[y].push(new BoardSquare("white"));
                    }
                } else {
                    if (x % 2 === 0) {
                        this.square[y].push(new BoardSquare("white"));
                    } else {
                        this.square[y].push(new BoardSquare("black"));
                    }
                }
            }
        }
    }
    findRandomEmptySquare(): BoardSquare {
        let row: number = this.getRandomInt(0, this.numRows - 1);
        let col: number = this.getRandomInt(0, this.numCols - 1);
        while (this.square[row][col].toString() !== "-------") {
            row = this.getRandomInt(0, this.numRows - 1);
            col = this.getRandomInt(0, this.numCols - 1);
        }
        return this.square[row][col];
    }
}

/* After you have completed setUpEmptyBoard, you can uncomment the
following code and run it using this command in the terminal 
to see if your colors are getting assigned correctly:
 npx ts-node src/game/elements/GameBoard.ts
 */

export function squareColors(board: GameBoard): string {
    let boardString: string = "";
    boardString = boardString.concat("Col :   ");

    for (let col = 0; col < board.getNumColumns(); col++) {
        boardString = boardString.concat(col + "   ");
    }
    boardString = boardString.concat("\n");
    for (let row = 0; row < board.getNumRows(); row++) {
        boardString = boardString.concat("Row : " + row + "   ");
        for (let col = 0; col < board.getNumColumns(); col++) {
            boardString = boardString.concat(
                board.getAllSquares()[row][col].getSquareColor() + "  ",
            );
        }
        boardString = boardString.concat("\n");
    }
    return boardString;
}

let myBoard: GameBoard = new GameBoard(5, 7);
console.log(squareColors(myBoard));
