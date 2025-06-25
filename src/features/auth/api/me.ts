import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { UserResponse } from "@/types/api";

export const getUser = (): Promise<UserResponse> => {
  return api.get(`/auth/me`);
};

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: ["me"],
    queryFn: getUser,
  });
};

type UseUserOptions = {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const useUser = ({ queryConfig }: UseUserOptions = {}) => {
  return useQuery({
    ...getUserQueryOptions(),
    ...queryConfig,
  });
};
