import type { Metadata } from "next";
import AuthLayoutContent from "./views/authLayoutView";

export const metadata: Metadata = {
  title: "KPI Platform",
  description: "Track, measure, and optimize performance effortlessly with our KPI calculation platform",
};

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AuthLayoutContent>{children}</AuthLayoutContent>;
}
