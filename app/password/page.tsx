"use client";

import React, { useEffect, useRef } from "react";
import styles from "@/app/password/page.module.css";
import { generatePassword } from "@/services/passwordService";
import PasswordLengthSlider from "@/component/password/PasswordLengthSlider";
import CheckboxOption from "@/component/password/CheckboxOption";
import GeneratedPassword from "@/component/password/GeneratedPassword";
import { usePasswordStore } from "@/stores/password";

const Page = () => {
  const setPassword = usePasswordStore((state) => state.setPassword);
  const passwordLength = usePasswordStore((state) => state.passwordLength);
  const includeUppercaseRef = useRef(false);
  const includeNumbersRef = useRef(false);
  const includeSymbolsRef = useRef(false);

  const handleGeneratePassword = () => {
    setPassword(
      generatePassword(
        passwordLength,
        includeUppercaseRef.current,
        includeNumbersRef.current,
        includeSymbolsRef.current
      )
    );
  };

  const handleOptionChange =
    (optionRef: React.RefObject<boolean>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      optionRef.current = e.target.checked;
    };

  useEffect(() => {
    return () => usePasswordStore.setState({ password: "", passwordLength: 8 });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Random Password Generator</h1>
      <PasswordLengthSlider />
      <CheckboxOption
        label="Include Uppercase Letters"
        onChange={handleOptionChange(includeUppercaseRef)}
      />
      <CheckboxOption
        label="Include Numbers"
        onChange={handleOptionChange(includeNumbersRef)}
      />
      <CheckboxOption
        label="Include Symbols"
        onChange={handleOptionChange(includeSymbolsRef)}
      />
      <button onClick={handleGeneratePassword} className={styles.button}>
        Generate Password
      </button>
      <GeneratedPassword />
    </div>
  );
};

export default Page;
