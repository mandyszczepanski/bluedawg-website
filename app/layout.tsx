import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlueDawg — Your Autonomous AI Workforce",
  description: "Deploy an autonomous AI workforce that operates your business 24/7. Customer support, content, sales, and operations — handled by AI agents that never sleep.",
  openGraph: {
    title: "BlueDawg — Your Autonomous AI Workforce",
    description: "Deploy an autonomous AI workforce that operates your business 24/7.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
