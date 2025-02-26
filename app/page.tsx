import { Metadata, NextPage } from "next";
import styles from "./page.module.css";
import { BASE_API_URL } from "@/lib/constant/common";

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const response = await fetch(`${BASE_API_URL}/meta`);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const product = await response.json();

  return {
    title: product.title,
    description: product.description,
  };
}

const Page: NextPage = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>Vercel test</main>
    </div>
  );
};

export default Page;
