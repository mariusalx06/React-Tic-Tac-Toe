import styles from "./Log.module.css";

export default function Log(props) {
  return (
    <ol className={styles.log}>
      {props.turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected{turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
