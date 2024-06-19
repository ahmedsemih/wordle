import {
  Dispatch,
  FC,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { WORDS, initialLetterClasses } from "../utils/constants";

type GameContextType = {
  word: string;
  guesses: string[];
  guessCount: number;
  gameStatus: GameStatus;
  waitForNextGuess: boolean;
  letterResults: LetterClassesType;
  keyboardRef: RefObject<HTMLInputElement>;
  resetAll: () => void;
  getRandomWord: () => void;
  checkResult: (guess: string) => void;
  setGuesses: Dispatch<SetStateAction<string[]>>;
  checkGuessIsExists: (guess: string) => boolean;
  checkGuessIsCorrect: (guess: string) => string[];
  setWaitForNextGuess: Dispatch<SetStateAction<boolean>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: FC<PropsWithChildren> = ({ children }) => {
  const keyboardRef = useRef<HTMLInputElement>(null);

  const [word, setWord] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([""]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [waitForNextGuess, setWaitForNextGuess] = useState<boolean>(false);
  const [letterResults, setLetterResults] = useState<LetterClassesType>(initialLetterClasses);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    setWord(WORDS[randomIndex]);
  };

  const checkGuessIsExists = (guess: string) => {
    return WORDS.includes(guess);
  };

  const checkGuessIsCorrect = (guess: string) => {
    const guessLetters = guess.split("");
    const wordLetters = word.split("");

    const rowResults = ["", "", "", "", ""];
    const keyboardResults = { ...letterResults };

    guessLetters.forEach((guessLetter, guessLetterIndex) => {
      if (wordLetters[guessLetterIndex] === guessLetter) {
        wordLetters[guessLetterIndex] = "_";
        keyboardResults[guessLetter] = "exists";
        rowResults[guessLetterIndex] = "exists";
      }
    });

    guessLetters.forEach((guessLetter, guessLetterIndex) => {
      const indexOfEncounter = wordLetters.indexOf(guessLetter);

      // Check for keyboard result
      if (
        indexOfEncounter !== -1 &&
        keyboardResults[guessLetter] !== "exists"
      ) {
        wordLetters[indexOfEncounter] = "_";
        keyboardResults[guessLetter] = "wrong-place";
      } else if (
        keyboardResults[guessLetter] !== "exists" &&
        keyboardResults[guessLetter] !== "wrong-place"
      ) {
        keyboardResults[guessLetter] = "not-exists";
      }

      // Check for row result
      if (
        indexOfEncounter !== -1 &&
        rowResults[guessLetterIndex] !== "exists"
      ) {
        rowResults[guessLetterIndex] = "wrong-place";
        wordLetters[indexOfEncounter] = "_";
      } else if (rowResults[guessLetterIndex] !== "exists") {
        rowResults[guessLetterIndex] = "not-exists";
      }
    });

    setLetterResults(keyboardResults);
    setGuesses((prev) => [...prev, ""]);
    setWaitForNextGuess(false);

    return rowResults;
  };

  const checkResult = (guess: string) => {
    if (guess === word) return setGameStatus("won");
    if (guesses.length === 6 && waitForNextGuess) return setGameStatus("lost");
  };

  const resetAll = () => {
    setGuesses([""]);
    setLetterResults(initialLetterClasses);
    setGameStatus("playing");
    keyboardRef.current?.focus();
  };

  const values = {
    keyboardRef,
    word,
    guesses,
    guessCount: guesses.length,
    setGuesses,
    getRandomWord,
    waitForNextGuess,
    setWaitForNextGuess,
    checkGuessIsExists,
    checkGuessIsCorrect,
    letterResults,
    gameStatus,
    resetAll,
    checkResult,
  };

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext) as GameContextType;
