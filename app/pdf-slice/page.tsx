"use client";
import { useState } from "react";
import { handleUpload } from "@/services/pdfSliceService";
import FileUpload from "@/component/pdf-slice/FileUpload";
import styles from "@/app/pdf-slice/page.module.css";

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadAndSlice = async () => {
    setLoading(true);
    await handleUpload(file);
    setLoading(false);
  };

  const handleReset = () => {
    setFile(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload PDF And Slice it.</h1>
      <p className={styles.description}>
        You can upload a PDF file and process each page as a separate file. The
        processed file will be downloaded in ZIP format. The maximum file size
        is <span className={styles.emphasis}>4.5MB</span>.
      </p>
      <FileUpload
        file={file}
        loading={loading}
        onFileChange={handleFileChange}
        onUpload={handleUploadAndSlice}
        onReset={handleReset}
      />
    </div>
  );
};

export default Home;
