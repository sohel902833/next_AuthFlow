import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserContextProvider } from "@/store/UserContext";
import { Toaster } from "react-hot-toast";
import UseClient from "@/components/UseClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sk",
  description: "Sohel Rana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <UserContextProvider>{children}</UserContextProvider>
        <UseClient></UseClient>
      </body>
    </html>
  );
}
