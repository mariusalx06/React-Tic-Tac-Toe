import styles from "./GameBoard.module.css";

export default function GameBoard(props) {
  return (
    <ol className={styles.gameBoard}>
      {props.board.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button
                      onClick={() => {
                        props.onSelection(rowIndex, colIndex);
                      }}
                      disabled={playerSymbol !== null}
                    >
                      {playerSymbol}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
