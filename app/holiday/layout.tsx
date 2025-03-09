import { Metadata } from "next";

import styles from "@/app/holiday/page.module.css";

export const metadata: Metadata = {
  title: "Vacation",
  description: "Search for vacation destinations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
