import styles from "./GameOver.module.css";

export default function GameOver(props) {
  return (
    <div className={styles.gameOver}>
      <h2>Game Over!</h2>
      {props.winner && <p>{props.winner} won!</p>}
      {!props.winner && <p>Draw!</p>}
      <p>
        <button onClick={props.onRestart}>Rematch!</button>
      </p>
    </div>
  );
}
