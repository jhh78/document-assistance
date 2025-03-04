"use client";
import { FaSearch } from "react-icons/fa";
import styles from "@/app/page.module.css";

const SearchArea = () => {
  return (
    <div className={styles.searchContainer}>
      <FaSearch className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Search..."
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchArea;
