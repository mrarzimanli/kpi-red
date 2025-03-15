import type { Metadata } from "next";
import TaskResultPageView from "../../../shared/views/taskResultPageView";

export const metadata: Metadata = {
  title: "KPI Platform - User task result",
  description: "Track, measure, and optimize performance effortlessly with our KPI calculation platform",
};

export default function Page() {
  return <TaskResultPageView />;
}
