import { useQuery } from "react-query";
import { QUERY_KEYS } from "@/config/query-keys";
import { axiosInstance } from "@/config/axiosInstance";
import { dashboardMetrics } from "@/config/endpoints";

export const useDashboardMetrics = () => {
  return useQuery(
    [QUERY_KEYS.dashboardMetrics],
    async () => {
      const { data } = await axiosInstance.get(dashboardMetrics);
      return data;
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      staleTime: 0,
    }
  );
};
