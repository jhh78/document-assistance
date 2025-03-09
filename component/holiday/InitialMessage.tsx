import React from "react";
import styles from "@/app/holiday/page.module.css";
import { useHolidayStore } from "@/stores/holiday";
import { isEmpty } from "lodash";

const InitialMessage: React.FC = () => {
  const loading = useHolidayStore((state) => state.loading);
  const holidays = useHolidayStore((state) => state.holidays);
  const error = useHolidayStore((state) => state.error);

  if (loading || !isEmpty(error) || holidays.length > 0) return null;

  return (
    <p className={styles.initialMessage}>
      Please select a country and click the search button.
    </p>
  );
};

export default InitialMessage;
