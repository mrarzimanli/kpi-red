import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootLayoutView from "@/shared/views/rootLayoutView";
import "@/shared/styles/global.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KPI Platform",
  description: "Track, measure, and optimize performance effortlessly with our KPI calculation platform",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootLayoutView font={inter}>{children}</RootLayoutView>;
}
