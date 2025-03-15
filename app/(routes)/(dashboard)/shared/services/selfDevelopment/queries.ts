import { useMutation, useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "@/config/query-keys";
import { axiosInstance } from "@/config/axiosInstance";
import { selfDevelopment } from "@/config/endpoints";

export const useSelfDevelopment = () => {
  return useQuery(
    [QUERY_KEYS.selfDevelopment],
    async () => {
      const { data } = await axiosInstance.get(selfDevelopment);
      return data;
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      staleTime: 0,
    }
  );
};
