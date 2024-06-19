import { FC, useEffect, useState } from "react";

import styles from "./index.module.css";
import { useGameContext } from "../../contexts/GameContext";

type GuessRowProps = {
  index: number;
};

const GuessRow: FC<GuessRowProps> = ({ index }) => {
  const {
    waitForNextGuess,
    guesses,
    guessCount,
    checkGuessIsCorrect,
    checkResult,
    gameStatus,
  } = useGameContext();

  const [rowResults, setRowResults] = useState(["", "", "", "", ""]);

  useEffect(() => {
    if (waitForNextGuess && guessCount === index + 1) {
      const results = checkGuessIsCorrect(guesses[index]);
      setRowResults(results);
      checkResult(guesses[index]);
    }
  }, [waitForNextGuess]);

  useEffect(() => {
    if (gameStatus === "playing" && guessCount === 1) {
      setRowResults(["", "", "", "", ""]);
    }
  }, [gameStatus]);

  return (
    <div className={styles.guessRow}>
      {Array.from({ length: 5 }).map((_, letterIndex) => (
        <Letter
          key={letterIndex}
          letter={guesses[index] ? guesses[index][letterIndex] : ""}
          resultClass={rowResults[letterIndex]}
        />
      ))}
    </div>
  );
};

const Letter = ({ letter, resultClass }: { letter: string; resultClass: string }) => {
  return <span className={styles.letter + " " + resultClass}>{letter}</span>;
};

export default GuessRow;
