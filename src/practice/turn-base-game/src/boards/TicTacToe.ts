import { Board } from "../game/Board";
import { Cell } from "../game/Cell";
import { Move } from "../game/Move";
import { Player } from "../game/Player";

export class TicTacToe extends Board {
  private cell: (string | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  public move(move: Move): void {
    this.setCell(move.getCell(), move.getPlayer());
  }

  public getCell(row: number, col: number): string | null {
    return this.cell[row][col];
  }

  public setCell(cell: Cell, player: Player): boolean {
    try {
      this.cell[cell.row][cell.col] = player.symbol;
      console.log(cell.row, cell.col, this.cell);
      return true;
    } catch (error) {
      console.log("Error: while setting cell", error);
      return false;
    }
  }

  public printBoard(): void {
    for (let i = 0; i < 3; i++) {
      let str = "";
      for (let j = 0; j < 3; j++) {
        const cell = this.cell[i][j];
        if (cell === null) {
          str += "-";
        } else {
          str += cell;
        }
      }
      console.log(str);
    }
  }
}