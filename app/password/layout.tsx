import { Metadata } from "next";

import styles from "@/app/typing/page.module.css";

export const metadata: Metadata = {
  title: "Password Generator",
  description: "Generate random passwords with different options.",
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
