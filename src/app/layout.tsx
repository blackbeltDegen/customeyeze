import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Condensed poster/stencil display face — replaces Poppins for all headings/
// numerals sitewide. Variable name kept as --font-poppins to avoid touching
// the ~34 call sites across the codebase that reference it.
const poppins = Anton({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Customeyeze | Custom DTF Printed Shirts & Apparel",
  description:
    "Design your custom shirts online with Customeyeze. Upload your artwork, customize your design, and get professional DTF printed apparel delivered in about a week.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col font-[var(--font-inter)] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
