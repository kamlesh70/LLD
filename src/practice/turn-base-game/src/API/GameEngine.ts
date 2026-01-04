import { TicTacToe } from "../boards/TicTacToe";
import { Board } from "../game/Board";
import { Move } from "../game/Move";

export class GameEngine {
  public start(type: string): Board {
    if (type === TicTacToe.name) {
      return new TicTacToe();
    } else {
      throw new Error("Invalid board type to start the game!");
    }
  }

  public move(board: Board, move: Move): void {
    if (board instanceof TicTacToe) {
      board.move(move);
    } else {
      throw new Error("Invalid board for move!");
    }
  }
}
