"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { handleUpload } from "@/services/pdfSliceService";

const Home = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload PDF And Slice it.</h1>
      <p className={styles.description}>
        You can upload a PDF file and process each page as a separate file. The
        processed file will be downloaded in ZIP format.
      </p>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className={styles.input}
      />

      {file && (
        <button onClick={() => handleUpload(file)} className={styles.button}>
          Upload and Slice
        </button>
      )}
    </div>
  );
};

export default Home;
