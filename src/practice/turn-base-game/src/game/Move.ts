import { Cell } from "./Cell";
import { Player } from "./Player";

export class Move {
  constructor(private cell: Cell, private player: Player) {}

  getCell() {
    return this.cell;
  }

  getPlayer() {
    return this.player;
  }
}