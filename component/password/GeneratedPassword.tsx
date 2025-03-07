import styles from "@/app/password/page.module.css";
import { copyToClipboard } from "@/services/commonService";
import { usePasswordStore } from "@/stores/password";
import { FaClipboard } from "react-icons/fa";

const GeneratedPassword = () => {
  const password = usePasswordStore((state) => state.password);

  if (!password) return null;

  return (
    <div className={styles.result}>
      <h2>Generated Password:</h2>
      <p className={styles.password}>{password}</p>
      <button
        className={styles.copyButton}
        onClick={() => copyToClipboard(password)}
      >
        <FaClipboard className={styles.copyIcon} />
      </button>
    </div>
  );
};

export default GeneratedPassword;
