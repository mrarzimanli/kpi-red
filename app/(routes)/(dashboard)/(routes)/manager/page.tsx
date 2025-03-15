import type { Metadata } from "next";
import ManagerAssessmentPageView from "../user/shared/views/managerAssessmentPageView";

export const metadata: Metadata = {
  title: "KPI Platform - Manager",
  description: "Track, measure, and optimize performance effortlessly with our KPI calculation platform",
};

export default function Page() {
  return <ManagerAssessmentPageView />;
}
