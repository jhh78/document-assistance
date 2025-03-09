import React from "react";
import styles from "@/app/holiday/page.module.css";
import { useHolidayStore } from "@/stores/holiday";
import { isEmpty } from "lodash";

const HolidayTable: React.FC = () => {
  const holidays = useHolidayStore((state) => state.holidays);
  const error = useHolidayStore((state) => state.error);

  if (!isEmpty(error) || holidays.length < 1) return null;

  return (
    <table className={styles.holidayTable}>
      <thead>
        <tr>
          <th className={styles.date}>Date</th>
          <th className={styles.name}>Name</th>
        </tr>
      </thead>
      <tbody>
        {holidays.map((holiday, index) => (
          <tr key={index}>
            <td className={styles.date}>{holiday.date}</td>
            <td className={styles.name}>{holiday.localName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HolidayTable;
