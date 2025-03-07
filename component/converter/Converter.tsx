"use client";
import React, { useRef } from "react";
import { FaArrowDown, FaClipboard } from "react-icons/fa";
import styles from "@/app/converter/page.module.css";
import { ENCODING_TYPES, processURI } from "@/services/converterService";

const Converter = () => {
  const inputTextRef = useRef<HTMLTextAreaElement>(null);
  const outputTextRef = useRef<HTMLTextAreaElement>(null);
  const encodingRef = useRef(ENCODING_TYPES.ENCODE_URI);
  const isEncodingRef = useRef(true);

  const handleTransform = () => {
    if (!outputTextRef.current || !inputTextRef.current) return;

    if (encodingRef.current === ENCODING_TYPES.ENCODE_URI) {
      outputTextRef.current.value = processURI(
        inputTextRef.current.value,
        isEncodingRef.current
      );
    }
  };

  const handleEncodingChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    outputTextRef.current!.value = "";
    encodingRef.current = event.target.value;
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    isEncodingRef.current = event.target.value === "encode";
  };

  const handleCopyToClipboard = async () => {
    if (outputTextRef.current) {
      try {
        await navigator.clipboard.writeText(outputTextRef.current.value);
        alert("Text copied to clipboard!");
      } catch {
        alert("Failed to copy text to clipboard.");
      }
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.converterContainer}>
        <h1 className={styles.title}>Text Encoder/Decoder</h1>
        <div className={styles.selectorContainer}>
          <div className={styles.encodingSelector}>
            <label htmlFor="encoding">Select Encoding: </label>
            <select
              id="encoding"
              defaultValue={encodingRef.current}
              onChange={handleEncodingChange}
              className={styles.encodingDropdown}
            >
              {Object.entries(ENCODING_TYPES).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.modeSelector}>
            <label htmlFor="mode">Mode: </label>
            <select
              id="mode"
              defaultValue="encode"
              onChange={handleModeChange}
              className={styles.modeDropdown}
            >
              <option value="encode">Encode</option>
              <option value="decode">Decode</option>
            </select>
          </div>
        </div>
        <textarea
          ref={inputTextRef}
          className={styles.textarea}
          placeholder="Enter text here..."
        />
        <div className={styles.iconContainer}>
          <button className={styles.transformButton} onClick={handleTransform}>
            <FaArrowDown className={styles.transformIcon} />
          </button>
        </div>
        <textarea
          ref={outputTextRef}
          className={styles.textarea}
          readOnly
          placeholder="Output will appear here..."
        />
        <div className={styles.iconContainer}>
          <button className={styles.copyButton} onClick={handleCopyToClipboard}>
            <FaClipboard className={styles.copyIcon} />
          </button>
        </div>
        <p className={styles.description}>
          Use this tool to encode or decode text. Enter your text in the input
          area above, then click the transform icon to see the transformed text.
          You can also copy the transformed text to the clipboard.
        </p>
      </div>
    </div>
  );
};

export default Converter;
