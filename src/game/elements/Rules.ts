/* 
Problem 8: [20 points]
Create a class named Rules.  
This will represent the set of rules for each type of Piece we have in the game.
- member field for a string message
- member field for game (which should be of type GameS25)  // already done for you
- constructor with one game parameter that sets this field // already done for you
- accessors 
    - getMessage
- methods below - all have two Location parameters and return a boolean
    checkValidMove
    checkValidAttack
    checkValidRecruit
    checkValidSpawn
    checkValidCrack
    These methods should check the rules described in the HW10 Canvas assignment
    and return true if the action can be taken and false otherwise. If the action
    is not valid - the message field should be updated with a message to the player
    explaining why the action is not valid.  
    For example: "The piece you are moving does not belong to your team."

Tips:  
Implement the code for a valid move first. 
*/
import { GameS25 } from "./GameS25";
import { Location } from "./Location";
import { Piece } from "./Piece";

export class Rules {
    private message: string = "";

    constructor(protected game: GameS25) {}
    getMessage(): string {
        return this.message;
    }

    checkValidMove(startLocation: Location, endLocation: Location): boolean {
        if (
            !(
                this.game
                    .getGameBoard()
                    .inBounds(startLocation.getRow(), startLocation.getCol()) &&
                this.game
                    .getGameBoard()
                    .inBounds(endLocation.getRow(), endLocation.getCol())
            )
        ) {
            this.message = "Out of bounds!";
            return false;
        }
        let start_piece: Piece | null = this.game
            .getGameBoard()
            .getSquare(startLocation)
            .getPiece();
        let end_piece: Piece | null = this.game
            .getGameBoard()
            .getSquare(endLocation)
            .getPiece();

        if (start_piece === null) {
            this.message = "No starting piece!";
            return false;
        }
        if (start_piece!.getTeamColor() !== this.game.getTurn()) {
            this.message = "Not your turn!";
            return false;
        }
        if (
            startLocation.getCol() === endLocation.getCol() &&
            startLocation.getRow() === endLocation.getRow()
        ) {
            this.message = "You are chosing the same postion!";
            return false;
        }
        if (!start_piece.allowableAction("move")) {
            this.message = "This piece can not move!";
            return false;
        }
        if (end_piece !== null) {
            this.message = "Ending location occupied!";
            return false;
        }
        if (!start_piece.validMovePath(startLocation, endLocation)) {
            this.message = "InvaldmovePath!";
            return false;
        }
        this.message = "Valid Action Move";
        return true;
    }

    checkValidSpawn(startLocation: Location, endLocation: Location): boolean {
        if (
            !(
                this.game
                    .getGameBoard()
                    .inBounds(startLocation.getRow(), startLocation.getCol()) &&
                this.game
                    .getGameBoard()
                    .inBounds(endLocation.getRow(), endLocation.getCol())
            )
        ) {
            this.message = "Out of bounds!";
            return false;
        }
        let start_piece: Piece | null = this.game
            .getGameBoard()
            .getSquare(startLocation)
            .getPiece();
        let end_piece: Piece | null = this.game
            .getGameBoard()
            .getSquare(endLocation)
            .getPiece();

        if (start_piece === null) {
            this.message = "No starting piece!";
            return false;
        }
        if (start_piece!.getTeamColor() !== this.game.getTurn()) {
            this.message = "Not your turn!";
            return false;
        }
        if (!start_piece.allowableAction("spawn")) {
            this.message = "This piece can not spawn!";
            return false;
        }
        if (
            startLocation.getCol() === endLocation.getCol() &&
            startLocation.getRow() === endLocation.getRow()
        ) {
            this.message = "You are chosing the same postion!";
            return false;
        }
        if (end_piece !== null) {
            this.message = "Ending location occupied!";
            return false;
        }
        if (!start_piece.validMovePath(startLocation, endLocation)) {
            this.message = "InvaldmovePath!";
            return false;
        }
        this.message = "Valid Action Spawn";
        return true;
    }

    checkValidAttack(startLocation: Location, endLocation: Location): boolean {
        if (
            !(
                this.game
                    .getGameBoard()
                    .inBounds(startLocation.getRow(), startLocation.getCol()) &&
                this.game
                    .getGameBoard()
                    .inBounds(endLocation.getRow(), endLocation.getCol())
            )
        ) {
            this.message = "Out of bounds!";
            return false;
        }
        let start_piece: Piece | null = this.game
            .getGameBoard()
            .getSquare(startLocation)
            .getPiece();
        let end_piece: Piece | null = this.game
            .getGameBoard()
            .getSquare(endLocation)
            .getPiece();

        if (start_piece === null) {
            this.message = "No starting piece!";
            return false;
        }
        if (start_piece!.getTeamColor() !== this.game.getTurn()) {
            this.message = "Not your turn!";
            return false;
        }
        if (
            startLocation.getCol() === endLocation.getCol() &&
            startLocation.getRow() === endLocation.getRow()
        ) {
            this.message = "You are chosing the same postion!";
            return false;
        }
        if (!start_piece.allowableAction("attack")) {
            this.message = "This piece can not attack!";
            return false;
        }
        if (end_piece === null) {
            this.message = "No attacked target!";
            return false;
        }
        if (!start_piece.validMovePath(startLocation, endLocation)) {
            this.message = "InvaldmovePath!";
            return false;
        }
        if (
            end_piece!.getTeamColor() !==
            this.game.getOpponentTeam().getTeamColor()
        ) {
            this.message = "You are attacking yourself!";
            return false;
        }
        this.message = "Valid Action Attack";
        return true;
    }

    checkValidRecruit(startLocation: Location, endLocation: Location): boolean {
        if (
            !(
                this.game
                    .getGameBoard()
                    .inBounds(startLocation.getRow(), startLocation.getCol()) &&
                this.game
                    .getGameBoard()
                    .inBounds(endLocation.getRow(), endLocation.getCol())
            )
        ) {
            this.message = "Out of bounds!";
            return false;
        }
        let start_piece: Piece | null = this.game
            .getGameBoard()
            .getSquare(startLocation)
            .getPiece();
        let end_piece: Piece | null = this.game
            .getGameBoard()
            .getSquare(endLocation)
            .getPiece();

        if (start_piece === null) {
            this.message = "No starting piece!";
            return false;
        }
        if (start_piece!.getTeamColor() !== this.game.getTurn()) {
            this.message = "Not your turn!";
            return false;
        }
        if (
            startLocation.getCol() === endLocation.getCol() &&
            startLocation.getRow() === endLocation.getRow()
        ) {
            this.message = "You are chosing the same postion!";
            return false;
        }
        if (!start_piece.allowableAction("recruit")) {
            this.message = "This piece can not recruit!";
            return false;
        }
        if (end_piece === null) {
            this.message = "No recruited target!";
            return false;
        }
        if (!start_piece.validMovePath(startLocation, endLocation)) {
            this.message = "InvaldmovePath!";
            return false;
        }
        if (
            end_piece!.getTeamColor() !==
            this.game.getOpponentTeam().getTeamColor()
        ) {
            this.message = "You are recruiting yourself!";
            return false;
        }
        this.message = "Valid Action Recruit";
        return true;
    }

    checkValidCrack(startLocation: Location, endLocation: Location): boolean {
        if (
            !(
                this.game
                    .getGameBoard()
                    .inBounds(startLocation.getRow(), startLocation.getCol()) &&
                this.game
                    .getGameBoard()
                    .inBounds(endLocation.getRow(), endLocation.getCol())
            )
        ) {
            this.message = "Out of bounds!";
            return false;
        }
        let start_piece: Piece | null = this.game
            .getGameBoard()
            .getSquare(startLocation)
            .getPiece();
        let end_piece: Piece | null = this.game
            .getGameBoard()
            .getSquare(endLocation)
            .getPiece();

        if (start_piece === null) {
            this.message = "No starting piece!";
            return false;
        }
        if (start_piece!.getTeamColor() !== this.game.getTurn()) {
            this.message = "Not your turn!";
            return false;
        }
        if (
            startLocation.getCol() === endLocation.getCol() &&
            startLocation.getRow() === endLocation.getRow()
        ) {
            this.message = "You are chosing the same postion!";
            return false;
        }
        if (!start_piece.allowableAction("crack")) {
            this.message = "This piece can not crack!";
            return false;
        }

        if (
            !(
                end_piece === null ||
                end_piece.getTeamColor() ===
                    this.game.getOpponentTeam().getTeamColor()
            )
        ) {
            this.message = "You can not crack yourself!";
            return false;
        }
        if (!start_piece.validMovePath(startLocation, endLocation)) {
            this.message = "InvaldmovePath!";
            return false;
        }
        this.message = "Valid Action Crack";
        return true;
    }
}
