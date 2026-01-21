import { TicTacToe } from "../boards/TicTacToe";
import { Board } from "../game/Board";
import { Cell } from "../game/Cell";
import { Move } from "../game/Move";
import { Player } from "../game/Player";
import { RuleEngine } from "./RuleEngine";

export class AIEngine {
  public suggestMove(board: Board, player: Player): Move {
    const threshold = 4;
    if (this.countMove(board) > threshold) {
      return this.suggestSmartMove(board, player);
    } else {
      return this.suggestBasicMove(board, player);
    }
  }

  suggestBasicMove(board: Board, player: Player): Move {
    if (board instanceof TicTacToe) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board.getSymbol(i, j) === null) {
            return new Move(new Cell(i, j), player);
          }
        }
      }
    }

    throw new Error("No Move left to suggest!");
  }

  countMove(board: Board): number {
    let count = 0;
    if (board instanceof TicTacToe) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board.getSymbol(i, j) !== null) {
            ++count;
          }
        }
      }
    } else {
      throw new Error("Invalid board!");
    }

    return count;
  }

  suggestSmartMove(board: Board, player: Player): Move {
    if (board instanceof TicTacToe) {
      // find winning move
      const ruleEngine = new RuleEngine();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const prototypeBoard = board.copy() as TicTacToe;
          if (prototypeBoard.getSymbol(i, j) === null) {
            const move = new Move(new Cell(i, j), player);
            prototypeBoard.move(move);
            if (ruleEngine.gameState(prototypeBoard).getGameResult().isOver) {
              return move;
            }
          }
        }
      }

      // find defensive move
      const flipPlayer = player.flip();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const prototypeBoard = board.copy() as TicTacToe;
          if (prototypeBoard.getSymbol(i, j) === null) {
            const move = new Move(new Cell(i, j), flipPlayer);
            prototypeBoard.move(move);
            if (ruleEngine.gameState(prototypeBoard).getGameResult().isOver) {
              return new Move(new Cell(i, j), player);
            }
          }
        }
      }
    }

    throw new Error("No Move left to suggest!");
  }
}