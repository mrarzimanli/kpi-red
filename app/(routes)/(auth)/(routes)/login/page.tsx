import type { Metadata } from "next";
import LoginPageView from "../../views/loginPageView";

export const metadata: Metadata = {
  title: "KPI Platform - Login",
  description: "Track, measure, and optimize performance effortlessly with our KPI calculation platform",
};

export default function Page() {
  return <LoginPageView />;
}
