import { Player } from "./Player";

export class GameResult {
  constructor(
    private readonly isOver: boolean,
    private readonly winner: Player
  ) {}

  public getGameResult() {
    return {
      isOver: this.isOver,
      winner: {
        symbol: this.winner.symbol,
      },
    };
  }
}