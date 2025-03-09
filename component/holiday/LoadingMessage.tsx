import React from "react";
import styles from "@/app/holiday/page.module.css";
import { useHolidayStore } from "@/stores/holiday";

const LoadingMessage: React.FC = () => {
  const loading = useHolidayStore((state) => state.loading);

  if (!loading) return null;

  return <div className={styles.progressBar}>Loading...</div>;
};

export default LoadingMessage;
