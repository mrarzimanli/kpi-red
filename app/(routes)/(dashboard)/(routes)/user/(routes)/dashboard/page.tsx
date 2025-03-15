import type { Metadata } from "next";
import DashboardPageView from "../../shared/views/dashboardPageView";

export const metadata: Metadata = {
  title: "KPI Platform - User Dashboard",
  description: "Track, measure, and optimize performance effortlessly with our KPI calculation platform",
};

export default function Page() {
  return <DashboardPageView />;
}
