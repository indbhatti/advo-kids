import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./(Navbar)/navbar";
import Footer from "./footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Advo-Kids",
  description:
    "This is an Web Application for kids to learn about law and their rights. It is a fun and interactive way to learn about the law.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased `}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
