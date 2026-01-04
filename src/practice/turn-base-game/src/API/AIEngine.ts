import { TicTacToe } from "../boards/TicTacToe";
import { Board } from "../game/Board";
import { Cell } from "../game/Cell";
import { Move } from "../game/Move";
import { Player } from "../game/Player";

export class AIEngine {
  public suggestMove(board: Board, player: Player): Move {
    if (board instanceof TicTacToe) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board.getCell(i, j) === null) {
            return new Move(new Cell(i, j), player);
          }
        }
      }
    }

    throw new Error("No Move left to suggest!");
  }
}