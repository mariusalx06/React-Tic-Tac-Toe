import { useState } from "react";
import styles from "./Player.module.css";

export default function Player(props) {
  const [newName, setNewName] = useState(props.initialName);
  const [isEdit, setIsEdit] = useState(false);

  function handleEdit() {
    setIsEdit((preValue) => !preValue);

    if (isEdit) {
      props.onChangeName(props.symbol, newName);
    }
  }

  function handleInputChange(e) {
    setNewName(e.target.value);
  }
  return (
    <li className={props.isActive ? styles.active : ""}>
      <span className={styles.player}>
        {isEdit ? (
          <input
            required
            name="newName"
            value={newName}
            onChange={handleInputChange}
          ></input>
        ) : (
          <span className={styles.playerName}>{newName}</span>
        )}

        <span className={styles.playerSymbol}>{props.symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEdit ? "Save" : "Edit"}</button>
    </li>
  );
}
