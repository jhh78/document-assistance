import React from "react";
import styles from "@/app/holiday/page.module.css";

type YearSelectProps = {
  yearRef: React.RefObject<HTMLSelectElement | null>;
};

const YearSelect: React.FC<YearSelectProps> = ({ yearRef }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear + i);

  return (
    <select ref={yearRef} className={styles.select}>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearSelect;
