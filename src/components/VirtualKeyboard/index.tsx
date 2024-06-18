import { KeyboardEvent } from "react";
import { toast } from "react-toastify";

import styles from "./index.module.css";
import { KEYBOARD_LAYOUT } from "../../utils/constants";
import { useGameContext } from "../../contexts/GameContext";

const VirtualKeyboard = () => {
  const {
    keyboardRef,
    guessCount,
    guesses,
    setGuesses,
    setWaitForNextGuess,
    checkGuessIsExists,
    letterResults,
  } = useGameContext();

  const handleClickKey = (key: string) => {
    keyboardRef.current?.focus();

    if (key === "enter") return submitGuess();
    if (key === "delete") return deleteLastCharacter();

    if (guesses[guessCount - 1].length < 5)
      setGuesses((prev) => {
        const lastGuess = prev[prev.length - 1];
        return [...prev.slice(0, -1), lastGuess + key];
      });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key.toLowerCase();

    if (key === "enter") return submitGuess();
    if (key === "backspace") return deleteLastCharacter();

    const isAlphabet = /^[a-z]$/.test(key);

    if (isAlphabet) return handleClickKey(key);
  };

  const submitGuess = () => {
    const currentGuess = guesses[guessCount - 1];

    if (currentGuess.length !== 5)
      return toast.error("Please, enter a word with 5 letters.");

    if (!checkGuessIsExists(currentGuess))
      return toast.error("This word is not on the list.");

    setWaitForNextGuess(true);
  };

  const deleteLastCharacter = () => {
    setGuesses((prev) => {
      const lastGuess = prev[prev.length - 1];
      return [...prev.slice(0, -1), lastGuess.slice(0, -1)];
    });
  };

  return (
    <div className={styles.keyboard}>
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div className={styles.row} key={rowIndex}>
          {row.map((key, keyIndex) => (
            <button
              className={styles.key + " " + letterResults[key]}
              key={keyIndex}
              onClick={() => handleClickKey(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <input
        ref={keyboardRef}
        onKeyDown={handleKeyDown}
        className={styles.invisibleInput}
        type="text"
      />
    </div>
  );
};

export default VirtualKeyboard;
