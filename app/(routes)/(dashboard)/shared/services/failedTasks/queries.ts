import { useMutation, useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "@/config/query-keys";
import { axiosInstance } from "@/config/axiosInstance";
import { failedTasks } from "@/config/endpoints";

export const useFailedTasks = () => {
  return useQuery(
    [QUERY_KEYS.failedTasks],
    async () => {
      const { data } = await axiosInstance.get(failedTasks);
      return data.data;
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      staleTime: 0,
    }
  );
};

export const useChangeFailedTasksStatus = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: { id: number; valid: boolean }) => {
      const response = await axiosInstance.post(`${failedTasks}/${data.id}`, data.valid);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.login]);
      },
    }
  );
};
