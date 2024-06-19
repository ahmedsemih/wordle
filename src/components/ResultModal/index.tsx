import { Dispatch, FC, SetStateAction, useEffect } from "react";

import styles from "./index.module.css";
import { useGameContext } from "../../contexts/GameContext";

type ResultModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ResultModal: FC<ResultModalProps> = ({ isOpen, setIsOpen }) => {
  const { getRandomWord, resetAll, gameStatus, word } = useGameContext();

  useEffect(() => {
    if (gameStatus === "won" || gameStatus === "lost") {
      setIsOpen(true);
    }
  }, [gameStatus]);

  const handlePlayAgain = () => {
    resetAll();
    getRandomWord();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backDrop}>
      <div className={styles.modalBody}>
        <h2 className={styles.modalTitle}>
          {gameStatus === "won" ? "You Won!" : "You Lost!"}
        </h2>
        <div>
          <p className={styles.modalText}>
            The word was: <span className={styles.answer}>{word}</span>
          </p>
          <p className={styles.modalText}>
            {gameStatus === "won"
              ? "Congratulations!"
              : "Better luck next time!"}
          </p>
        </div>
        <button className={styles.button} onClick={handlePlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
