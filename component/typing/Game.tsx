import { useEffect, useRef } from "react";

import styles from "@/app/typing/page.module.css";
import { useTypingGameStore } from "@/stores/typing";

const Game = () => {
  const { csvData, score, setAnswer, initStore } = useTypingGameStore(
    (state) => state
  );

  console.log(csvData);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [initStore]);

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (inputRef.current) {
        inputRef.current.value = "";
        setAnswer(inputRef.current.value);
      }
    }
  };

  return (
    <div className={styles.gameArea}>
      <input
        ref={inputRef}
        type="text"
        onKeyDown={handleOnKeyDown}
        className={styles.input}
      />
      <p className={styles.score}>Score: {score}</p>
    </div>
  );
};

export default Game;
