import type { Metadata } from "next";
import CodeQualityPageView from "../../../shared/views/codeQualityPageView";

export const metadata: Metadata = {
  title: "KPI Platform - User code quality",
  description: "Track, measure, and optimize performance effortlessly with our KPI calculation platform",
};

export default function Page() {
  return <CodeQualityPageView />;
}
