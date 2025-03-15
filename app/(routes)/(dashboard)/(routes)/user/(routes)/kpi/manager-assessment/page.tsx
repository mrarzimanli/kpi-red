import type { Metadata } from "next";
import ManagerAssessmentPageView from "../../../shared/views/managerAssessmentPageView";

export const metadata: Metadata = {
  title: "KPI Platform - User manager assessment",
  description: "Track, measure, and optimize performance effortlessly with our KPI calculation platform",
};

export default function Page() {
  return <ManagerAssessmentPageView />;
}
