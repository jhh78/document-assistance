import React, { useState, useRef } from "react";
import styles from "@/app/pdf-slice/page.module.css";

interface FileUploadProps {
  file: File | null;
  loading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  onReset: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  file,
  loading,
  onFileChange,
  onUpload,
  onReset,
}) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.size > 4.5 * 1024 * 1024) {
      setError("File size exceeds 4.5MB");
    } else {
      setError(null);
      onFileChange(e);
    }
  };

  const handleUpload = async () => {
    await onUpload();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onReset();
  };

  return (
    <div>
      {!loading && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            disabled={loading}
            accept="application/pdf"
            onChange={handleFileChange}
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          {file && !error && (
            <button
              onClick={handleUpload}
              className={styles.button}
              disabled={loading}
            >
              Upload and Slice
            </button>
          )}
        </>
      )}
      {loading && <div className={styles.progress}>Processing...</div>}
    </div>
  );
};

export default FileUpload;
