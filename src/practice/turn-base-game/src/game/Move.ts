import { Cell } from "./Cell";

export class Move {
  constructor(private cell: Cell) {}

  getCell() {
    return this.cell;
  }
}