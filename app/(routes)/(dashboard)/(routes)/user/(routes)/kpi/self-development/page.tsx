import type { Metadata } from "next";
import SelfDevelopmentPageView from "../../../shared/views/selfDevelopmentPageView";

export const metadata: Metadata = {
  title: "KPI Platform - User self development",
  description: "Track, measure, and optimize performance effortlessly with our KPI calculation platform",
};

export default function Page() {
  return <SelfDevelopmentPageView />;
}
