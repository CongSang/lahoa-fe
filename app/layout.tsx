import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { LayoutProps } from '@/types/index'
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LA HOA | Hoa tươi",
  description: "Tiệm hoa online tại TP.HCM 🌸\nMỗi bó hoa là một thiết kế riêng - mời bạn ghé trải nghiệm nha.",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
