import { useHolidayStore } from "@/stores/holiday";
import styles from "@/app/holiday/page.module.css";

type SearchButtonProps = {
  onClick: () => void;
};

const SearchButton = ({ onClick }: SearchButtonProps) => {
  const loading = useHolidayStore((state) => state.loading);

  if (loading) return null;

  return (
    <button onClick={onClick} className={styles.button}>
      Search
    </button>
  );
};

export default SearchButton;
