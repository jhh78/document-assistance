import { GAME_PAGE, useTypingGameStore } from "@/stores/typing";
import Papa from "papaparse";
import React from "react";
import styles from "@/app/typing/page.module.css";
import { FaUpload } from "react-icons/fa";

const FileUploadForm = () => {
  const setCsvData = useTypingGameStore((state) => state.setCsvData);
  const setScreenMode = useTypingGameStore((state) => state.setScreenMode);
  const setLanguage = useTypingGameStore((state) => state.setLanguage);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: ({ data }) => {
          const mergedData = data.flat();
          if (mergedData.length < 1) {
            alert("Failed to parse CSV file");
            return;
          }

          setCsvData(mergedData as string[]);
          setScreenMode(GAME_PAGE);
        },
      });
    }
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value);
  };

  const sampleCsvData = [
    ["word1", "word2", "word3"],
    ["word4", "word5", "word6"],
  ];
  const csvContent =
    "data:text/csv;charset=utf-8," +
    sampleCsvData.map((e) => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);

  return (
    <div>
      <h1 className={styles.title}>Typing Game</h1>
      <label htmlFor="fileInput" className={styles.uploadButton}>
        <FaUpload className={styles.uploadIcon} />
        <span className={styles.uploadDescription}>Upload CSV</span>
      </label>
      <input
        id="fileInput"
        className={styles.fileInput}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
      <div>
        <a
          href={encodedUri}
          download="sample.csv"
          className={styles.downloadLink}
        >
          Download Sample CSV
        </a>
      </div>
      <div className={styles.languageSelector}>
        <label htmlFor="language">Select Language: </label>
        <select
          id="language"
          onChange={handleLanguageChange}
          className={styles.languageDropdown}
        >
          <option value="">Select</option>
          <option value="en-US">English</option>
          <option value="ja-JP">Japanese</option>
          <option value="ko-KR">Korean</option>
        </select>
        <p className={styles.languageNote}>
          If no language is selected, the browser&apos;s default language will
          be used.
        </p>
      </div>
    </div>
  );
};

export default FileUploadForm;
