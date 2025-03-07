import React from "react";
import styles from "@/app/password/page.module.css";
import { usePasswordStore } from "@/stores/password";

const PasswordLengthSlider = () => {
  const setPasswordLength = usePasswordStore(
    (state) => state.setPasswordLength
  );
  const length = usePasswordStore((state) => state.passwordLength);

  return (
    <div className={styles.formGroup}>
      <label htmlFor="length" className={styles.label}>
        Password Length: {length}
      </label>
      <input
        type="range"
        id="length"
        value={length}
        onChange={(e) => setPasswordLength(Number(e.target.value))}
        min="8"
        max="100"
        className={styles.slider}
      />
    </div>
  );
};

export default PasswordLengthSlider;
