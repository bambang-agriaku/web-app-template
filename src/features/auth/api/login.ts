import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { LoginResponse } from "@/types/api";
import { apiRoutes } from "@/config/api-routes";

export const loginSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const login = ({
  data,
}: {
  data: LoginInput;
}): Promise<LoginResponse> => {
  return api.post(apiRoutes.auth.login, data);
};

type UseLoginOptions = {
  mutationConfig?: MutationConfig<typeof login>;
};

export const useLogin = ({ mutationConfig }: UseLoginOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationKey: ["login"],
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["login"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: login,
  });
};
