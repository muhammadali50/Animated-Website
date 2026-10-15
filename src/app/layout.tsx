import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GT3 — A Study in Precision",
  description: "A studio portrait of a track-bred sports car.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
