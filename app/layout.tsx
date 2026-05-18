import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { LayoutProps } from '@/types/index'
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider, ThemeProvider, AuthHydrator, QueryProvider } from "@/components/index";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LA HOA | Hoa tươi",
  description: "Tiệm hoa online tại TP.HCM 🌸\nMỗi bó hoa là một thiết kế riêng - mời bạn ghé trải nghiệm nha.",
  icons: {
    icon: "/images/logo.svg",
  },
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn("h-full", "antialiased", lora.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right" />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthHydrator/>
            <TooltipProvider>
              <main className="transition-opacity duration-300 ease-in-out overflow-hidden">{children}</main>
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
