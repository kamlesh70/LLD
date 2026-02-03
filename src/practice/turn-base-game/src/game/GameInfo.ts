import { Player } from "./Player";

export class GameInfo {
  constructor(
    private isOver: boolean,
    private winner: string,
    private hasFork: boolean,
    private player: Player,
    private numOfMoves: number,
  ) {}
}

export class GameInfoBuilder {
  private isOver!: boolean;
  private winner!: string;
  private hasFork!: boolean;
  private player!: Player;
  private numOfMoves!: number;

  public setIsOver(isOver: boolean): GameInfoBuilder {
    this.isOver = isOver;
    return this;
  }

  public setWinner(winner: string): GameInfoBuilder {
    this.winner = winner;
    return this;
  }

  public setHashFork(hasFork: boolean): GameInfoBuilder {
    this.hasFork = hasFork;
    return this;
  }

  public setPlayer(player: Player): GameInfoBuilder {
    this.player = player;
    return this;
  }

  public setNumOfMoves(numOfMoves: number): GameInfoBuilder {
    this.numOfMoves = numOfMoves;
    return this;
  }

  public build(): GameInfo {
    return new GameInfo(
      this.isOver,
      this.winner,
      this.hasFork,
      this.player,
      this.numOfMoves,
    );
  }
}