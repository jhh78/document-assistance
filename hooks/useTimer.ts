import { useEffect, useRef, useState } from "react";

const useTimer = (isRunning: boolean) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const refTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      refTimer.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (refTimer.current) {
      clearInterval(refTimer.current);
    }

    return () => {
      if (refTimer.current) {
        clearInterval(refTimer.current);
      }
    };
  }, [isRunning]);

  return elapsedTime;
};

export default useTimer;
