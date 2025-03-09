"use client";

import styles from "@/app/holiday/page.module.css";
import CountrySelect from "@/component/holiday/CountrySelect";
import ErrorMessage from "@/component/holiday/ErrorMessage";
import HolidayTable from "@/component/holiday/HolidayTable";
import InitialMessage from "@/component/holiday/InitialMessage";
import LoadingMessage from "@/component/holiday/LoadingMessage";
import SearchButton from "@/component/holiday/SearchButton";
import YearSelect from "@/component/holiday/YearSelect";
import { getHolidays } from "@/services/holidayService";
import { useHolidayStore } from "@/stores/holiday";
import { useRef } from "react";

const Page = () => {
  const countryCodeRef = useRef<HTMLSelectElement>(null);
  const yearRef = useRef<HTMLSelectElement>(null);

  const setHolidays = useHolidayStore((state) => state.setHolidays);
  const setLoading = useHolidayStore((state) => state.setLoading);
  const setError = useHolidayStore((state) => state.setError);

  const handleSearch = async () => {
    if (!countryCodeRef.current || !yearRef.current) return;

    if (!countryCodeRef.current.value) {
      alert("Please select a country.");
      return;
    }
    if (!yearRef.current.value) {
      alert("Please select a year.");
      return;
    }

    useHolidayStore.setState({
      loading: true,
      error: "",
      holidays: [],
    });

    try {
      const data = await getHolidays(
        countryCodeRef.current.value,
        Number(yearRef.current.value)
      );
      setHolidays(data);
    } catch {
      setError("The country you selected does not provide this feature.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Holiday Lookup by Country</h1>
        <div className={styles.controls}>
          <CountrySelect countryCodeRef={countryCodeRef} />
          <YearSelect yearRef={yearRef} />
          <SearchButton onClick={handleSearch} />
        </div>
      </header>
      <main className={styles.main}>
        <LoadingMessage />
        <ErrorMessage />
        <InitialMessage />
        <HolidayTable />
      </main>
    </div>
  );
};

export default Page;
