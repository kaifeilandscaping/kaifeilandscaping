import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { COMPANY_NAME } from "./constants/text";

const lato = Lato({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: `${COMPANY_NAME} - Transform Your Outdoor Space`,
  description: "Professional landscaping services for residential and commercial properties. Over 20 years of experience creating beautiful outdoor spaces.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${lato.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
