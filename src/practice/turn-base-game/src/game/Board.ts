import { Move } from "./Move";

export interface Board {
  move(move: Move): void;
  copy(): Board;
}