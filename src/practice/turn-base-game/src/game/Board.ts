import { Move } from "./Move";

export abstract class Board {
  public abstract move(move: Move): void;
}
