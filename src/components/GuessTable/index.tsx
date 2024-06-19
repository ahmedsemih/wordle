import GuessRow from "../GuessRow";
import styles from "./index.module.css";

const GuessTable = () => {
  return (
    <div className={styles.guessTable}>
      {Array.from({ length: 6 }).map((_, index) => (
        <GuessRow key={index} index={index} />
      ))}
    </div>
  );
};

export default GuessTable;
