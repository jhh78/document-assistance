import { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import styles from "@/app/typing/page.module.css";
import { useTypingGameStore } from "@/stores/typing";
import useTimer from "@/hooks/useTimer";
import useShake from "@/hooks/useShake";
import {
  checkAnswer,
  formatTime,
  handleRestart,
} from "@/services/typingService";

const Game = () => {
  const { csvData, setCsvData, setAnswer } = useTypingGameStore(
    (state) => state
  );

  const [isCleared, setIsCleared] = useState(false);
  const refCorrectAnswers = useRef(0);
  const refTotalAnswers = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const refRawCsvData = useRef(csvData);

  const elapsedTime = useTimer(!isCleared);
  const { isShaking, triggerShake } = useShake();

  const accuracy =
    refTotalAnswers.current > 0
      ? ((refCorrectAnswers.current / refTotalAnswers.current) * 100).toFixed(2)
      : "0.00";

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (csvData.length < 1) {
      setIsCleared(true);
    }
  }, [csvData]);

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current) {
      const inputValue = inputRef.current.value;
      inputRef.current.value = "";

      refTotalAnswers.current += 1;

      if (!checkAnswer(inputValue, csvData[0])) {
        triggerShake();
        return;
      }

      refCorrectAnswers.current += 1;
      setAnswer(inputValue);
    }
  };

  const handleTTS = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP"; // 일본어 설정
    window.speechSynthesis.speak(utterance);
    inputRef.current?.focus();
  };

  if (isCleared) {
    return (
      <div className={styles.clearScreen}>
        <h1 className={styles.clearText}>
          おめでとうございます！ゲームをクリアしました！
        </h1>
        <p className={styles.clearText}>経過時間: {formatTime(elapsedTime)}</p>
        <p className={styles.clearText}>正確さ: {accuracy}%</p>
        <button
          className={styles.restartButton}
          onClick={() =>
            handleRestart(
              setIsCleared,
              setCsvData,
              refRawCsvData,
              inputRef as React.RefObject<HTMLInputElement>,
              refCorrectAnswers,
              refTotalAnswers
            )
          }
        >
          再スタート
        </button>
      </div>
    );
  }

  return (
    <div
      className={`${styles.gameArea} ${isShaking ? styles.shake : ""} ${
        styles.noSelect
      }`}
    >
      <div className={styles.textContainer}>
        {!isCleared && <p className={styles.textItem}>{csvData[0]}</p>}
      </div>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          onKeyDown={handleOnKeyDown}
          className={styles.input}
        />
        <button
          className={styles.ttsButtonInput}
          onClick={() => handleTTS(csvData[0])}
        >
          <FaVolumeUp />
        </button>
      </div>
      <p className={styles.timer}>経過時間: {formatTime(elapsedTime)}</p>
    </div>
  );
};

export default Game;
