import React from "react";
import styles from "@/app/holiday/page.module.css";
import { COUNTRIES } from "@/lib/constant/holiday";

type CountrySelectProps = {
  countryCodeRef: React.RefObject<HTMLSelectElement | null>;
};

const CountrySelect: React.FC<CountrySelectProps> = ({ countryCodeRef }) => {
  return (
    <select
      ref={countryCodeRef}
      className={styles.select} // Use styles.select to apply CSS module class
    >
      <option value="">Select a country</option>
      {COUNTRIES.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountrySelect;
