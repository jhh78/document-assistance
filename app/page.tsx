import { NextPage } from "next";
import styles from "@/app/page.module.css";
import MenuList from "@/component/index/MenuList";
// import SearchArea from "@/component/index/SearchArea";

const Page: NextPage = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Popular Tools</h1>
      </header>
      {/* <SearchArea /> */}
      <main className={styles.main}>
        <div className={styles.cardContainer}>
          <MenuList />
        </div>
      </main>
    </div>
  );
};

export default Page;
