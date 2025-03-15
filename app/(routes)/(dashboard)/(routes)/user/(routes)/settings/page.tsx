import type { Metadata } from "next";
import UserSettingPageView from "../../shared/views/userSettingPageView";

export const metadata: Metadata = {
  title: "KPI Platform - User Settings",
  description: "Track, measure, and optimize performance effortlessly with our KPI calculation platform",
};

export default function Page() {
  return <UserSettingPageView />;
}
