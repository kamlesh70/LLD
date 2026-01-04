import readline from "readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { GameEngine } from "./API/GameEngine";
import { TicTacToe } from "./boards/TicTacToe";
import { Player } from "./game/Player";
import { Move } from "./game/Move";
import { Cell } from "./game/Cell";
import { RuleEngine } from "./API/RuleEngine";
import { AIEngine } from "./API/AIEngine";

async function play() {
  const rl = readline.createInterface({ input, output });
  const ruleEngine = new RuleEngine();
  const aiEngine = new AIEngine();

  const gameEngine: GameEngine = new GameEngine();
  const board = gameEngine.start(TicTacToe.name) as TicTacToe;
  let row, col;
  while (!ruleEngine.gameState(board).getGameResult().isOver) {
    const computer: Player = new Player("0");
    const human: Player = new Player("X");
    [row, col] = await rl.question("Enter your move: ");
    const humanMove = new Move(new Cell(Number(row), Number(col)), human);
    gameEngine.move(board, humanMove);
    console.log(board.printBoard());
    if (!ruleEngine.gameState(board).getGameResult().isOver) {
      const computerMove = aiEngine.suggestMove(board, computer);
      gameEngine.move(board, computerMove);
      console.log(board.printBoard());
    }
  }

  console.log("GameResult ", ruleEngine.gameState(board).getGameResult());

  rl.close();
}

play();