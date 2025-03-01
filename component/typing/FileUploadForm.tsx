import { GAME_PAGE, useTypingGameStore } from "@/stores/typing";
import Papa from "papaparse";
import React from "react";
import styles from "@/app/typing/page.module.css";
import { FaUpload } from "react-icons/fa";

const FileUploadForm = () => {
  const setCsvData = useTypingGameStore((state) => state.setCsvData);
  const setScreenMode = useTypingGameStore((state) => state.setScreenMode);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: ({ data, errors }) => {
          if (errors.length > 0) {
            alert("Failed to parse CSV file");
            return;
          }

          setCsvData(data[0] as unknown as string[]);
          setScreenMode(GAME_PAGE);
        },
      });
    }
  };
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
    </div>
  );
};

export default FileUploadForm;
