import React from "react";
import styles from "@/app/holiday/page.module.css";
import { useHolidayStore } from "@/stores/holiday";

const ErrorMessage: React.FC = () => {
  const error = useHolidayStore((state) => state.error);

  if (!error) return null;

  return <div className={styles.error}>{error}</div>;
};

export default ErrorMessage;
