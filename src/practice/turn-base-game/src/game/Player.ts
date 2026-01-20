export class Player {
  constructor(public readonly symbol: string) {}

  flip() {
    return this.symbol === "0" ? new Player("X") : new Player("0");
  }
}