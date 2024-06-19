import { FC, PropsWithChildren, useEffect, useState } from "react";

import styles from "./index.module.css";
import ResultModal from "../ResultModal";
import { useGameContext } from "../../contexts/GameContext";

const GameContainer: FC<PropsWithChildren> = ({ children }) => {
  const { keyboardRef, getRandomWord } = useGameContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getRandomWord();
  }, []);

  const handleClickContainer = () => {
    keyboardRef.current?.focus();
  };

  return (
    <div onClick={handleClickContainer} className={styles.container}>
      {children}
      <ResultModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default GameContainer;
