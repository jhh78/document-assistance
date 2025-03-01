import { NextPage } from "next";
import styles from "./page.module.css";

const Page: NextPage = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>Vercel test</main>
    </div>
  );
};

export default Page;
