import { Metadata } from "next";

import styles from "@/app/pdf-slice/page.module.css";

export const metadata: Metadata = {
  title: "PDF Slice",
  description: "Slice PDF files. Split PDF files into multiple files.",
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
