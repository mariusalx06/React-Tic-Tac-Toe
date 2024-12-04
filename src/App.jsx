import styles from "./App.module.css";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./WinningCombinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(newGameBoard, players) {
  let winner;
  WINNING_COMBINATIONS.forEach((combination) => {
    const firstSquare = newGameBoard[combination[0].row][combination[0].col];
    const secondSquare = newGameBoard[combination[1].row][combination[1].col];
    const thirdSquare = newGameBoard[combination[2].row][combination[2].col];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  });
  return winner;
}

function deriveGameBoard(gameTurns) {
  let newGameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  gameTurns.forEach((turn) => {
    const { square, player } = turn;
    const { row, col } = square;
    newGameBoard[row][col] = player;
  });

  return newGameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  const newGameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(newGameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  function handleSelection(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div className={styles.gameContainer}>
        <ol className={`${styles.players} ${styles.highlightPlayer}`}>
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X" ? true : false}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O" ? true : false}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelection={handleSelection} board={newGameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
