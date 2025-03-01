import { useState } from "react";

const useShake = () => {
  const [isShaking, setIsShaking] = useState(false);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return { isShaking, triggerShake };
};

export default useShake;
