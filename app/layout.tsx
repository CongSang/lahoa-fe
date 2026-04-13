import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { LayoutProps } from '@/types/index'
import "./globals.css";
import { cn } from "@/components/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

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
      className={cn("h-full", "antialiased", lora.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
