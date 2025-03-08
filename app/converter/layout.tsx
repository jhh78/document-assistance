import { Metadata } from "next";

import styles from "@/app/converter/page.module.css";

export const metadata: Metadata = {
  title: "Text Converter",
  description: "Convert text to different formats.",
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
