import { TicTacToe } from "../boards/TicTacToe";
import { Board } from "../game/Board";
import { GameResult } from "../game/GameResult";
import { Player } from "../game/Player";

export class RuleEngine {
  public gameState(board: Board): GameResult {
    if (board instanceof TicTacToe) {
      let firstCharacter: string | null = null;

      let rowComplete: boolean = true;
      for (let i = 0; i < 3; i++) {
        rowComplete = true;
        firstCharacter = board.getSymbol(i, 0);
        if (!firstCharacter) {
          rowComplete = false;
          break;
        }
        for (let j = 1; j < 3; j++) {
          if (board.getSymbol(i, j) !== firstCharacter) {
            rowComplete = false;
            break;
          }
        }

        if (rowComplete) {
          break;
        }
      }

      if (rowComplete && firstCharacter) {
        return new GameResult(true, new Player(firstCharacter));
      }

      let colComplete = true;
      for (let i = 0; i < 3; i++) {
        firstCharacter = board.getSymbol(0, i);
        if (!firstCharacter) {
          rowComplete = false;
          break;
        }
        colComplete = true;
        for (let j = 1; j < 3; j++) {
          if (board.getSymbol(j, i) !== firstCharacter) {
            colComplete = false;
            break;
          }
        }

        if (colComplete) {
          break;
        }
      }

      if (colComplete && firstCharacter) {
        return new GameResult(true, new Player(firstCharacter));
      }

      let diagonalComplete = true;
      for (let i = 1; i < 3; i++) {
        firstCharacter = board.getSymbol(0, 0);
        if (!firstCharacter) {
          rowComplete = false;
          break;
        }
        if (firstCharacter !== board.getSymbol(i, i)) {
          diagonalComplete = false;
          break;
        }
      }

      if (diagonalComplete && firstCharacter) {
        return new GameResult(true, new Player(firstCharacter));
      }

      let reverseDiagonalComplete = true;
      for (let i = 1; i < 3; i++) {
        firstCharacter = board.getSymbol(0, 2);
        if (!firstCharacter) {
          rowComplete = false;
          break;
        }
        if (board.getSymbol(i, 2 - i) !== firstCharacter) {
          reverseDiagonalComplete = false;
          break;
        }
      }

      if (reverseDiagonalComplete && firstCharacter) {
        return new GameResult(true, new Player(firstCharacter));
      }

      let countOfFilledCells = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board.getSymbol(i, j) !== null) {
            countOfFilledCells++;
          }
        }
      }

      if (countOfFilledCells === 9) {
        return new GameResult(true, new Player("-"));
      } else {
        return new GameResult(false, new Player("-"));
      }
    }

    return new GameResult(false, new Player("-"));
  }
}