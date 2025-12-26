import readline from "readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { GameEngine } from "./API/GameEngine";
import { TicTacToe } from "./boards/TicTacToe";
import { Player } from "./game/Player";
import { Move } from "./game/Move";
import { Cell } from "./game/Cell";

async function play() {
  const rl = readline.createInterface({ input, output });

  const gameEngine: GameEngine = new GameEngine();
  const board = gameEngine.start(TicTacToe.name) as TicTacToe;
  let row, col;
  while (!gameEngine.isCompleted(board).getGameResult().isOver) {
    const computer: Player = new Player("0");
    const human: Player = new Player("X");
    [row, col] = (await rl.question("Enter your move: "));
    const humanMove = new Move(new Cell(Number(row), Number(col)));
    gameEngine.move(board, human, humanMove);
    console.log(board.printBoard());
    if (!gameEngine.isCompleted(board).getGameResult().isOver) {
      const computerMove = gameEngine.suggestMove(board);
      gameEngine.move(board, computer, computerMove);
      console.log(board.printBoard());
    }
  }

  console.log("GameResult ", gameEngine.isCompleted(board).getGameResult());

  rl.close();
}

play();