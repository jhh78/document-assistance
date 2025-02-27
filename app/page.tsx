import { Metadata, NextPage } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Document Support",
  description: "This is a test page for Vercel deployment",
};

const Page: NextPage = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>Vercel test</main>
    </div>
  );
};

export default Page;
