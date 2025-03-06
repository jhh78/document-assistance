"use client";
import React, { useRef } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import styles from "@/app/converter/page.module.css";

const Converter = () => {
  const inputTextRef = useRef<HTMLTextAreaElement>(null);
  const outputTextRef = useRef<HTMLTextAreaElement>(null);
  const encodingRef = useRef("encodeURIComponent");

  const handleTransform = () => {
    if (inputTextRef.current) {
      const inputText = inputTextRef.current.value;
      if (encodingRef.current === "encodeURIComponent") {
        outputTextRef.current!.value = encodeURIComponent(inputText);
      } else if (encodingRef.current === "encodeURI") {
        outputTextRef.current!.value = encodeURI(inputText);
      }
    }
  };

  const handleEncodingChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    outputTextRef.current!.value = "";
    encodingRef.current = event.target.value;
  };

  return (
    <div className={styles.page}>
      <div className={styles.converterContainer}>
        <h1 className={styles.title}>Text Encoder/Decoder</h1>
        <div className={styles.encodingSelector}>
          <label htmlFor="encoding">Select Encoding: </label>
          <select
            id="encoding"
            defaultValue={encodingRef.current}
            onChange={handleEncodingChange}
            className={styles.encodingDropdown}
          >
            <option value="encodeURIComponent">encodeURIComponent</option>
            <option value="encodeURI">encodeURI</option>
          </select>
        </div>
        <textarea
          ref={inputTextRef}
          className={styles.textarea}
          placeholder="Enter text here..."
        />
        <div className={styles.iconContainer}>
          <button className={styles.transformButton} onClick={handleTransform}>
            <FaExchangeAlt className={styles.transformIcon} />
          </button>
        </div>
        <textarea
          ref={outputTextRef}
          className={styles.textarea}
          readOnly
          placeholder="Output will appear here..."
        />
        <p className={styles.description}>
          Use this tool to encode or decode text. Enter your text in the input
          area above, then click the transform icon to see the transformed text.
        </p>
      </div>
    </div>
  );
};

export default Converter;
