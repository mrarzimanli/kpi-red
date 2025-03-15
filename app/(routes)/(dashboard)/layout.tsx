import type { Metadata } from "next";
import { AuthProvider } from "@/providers/AuthProvider";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DashboardLayoutView from "./shared/views/dashboardLayoutView";

export const metadata: Metadata = {
  title: "KPI Platform",
  description: "Track, measure, and optimize performance effortlessly with our KPI calculation platform",
};

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SkeletonTheme
      baseColor="#ffffff"
      highlightColor="#f2f4fc"
      borderRadius={12}
    >
      <AuthProvider>
        <DashboardLayoutView>{children}</DashboardLayoutView>
      </AuthProvider>
    </SkeletonTheme>
  );
};

export default DashboardLayout;
