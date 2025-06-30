import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { Products } from "@/types/api";
import { apiRoutes } from "@/config/api-routes";
import { DefaultPage, DefaultPageSize } from "@/config/table";

export const getProducts = (
  page = DefaultPage,
  limit = DefaultPageSize,
): Promise<Products> => {
  const skip = page ? (page - 1) * limit : undefined;
  return api.get(apiRoutes.products, {
    params: {
      limit,
      skip,
    },
  });
};

export const getProductsQueryOptions = ({
  page = DefaultPage,
  limit = DefaultPageSize,
}: { page?: number; limit?: number } = {}) => {
  return queryOptions({
    queryKey: ["products", { page, limit }],
    queryFn: () => getProducts(page, limit),
  });
};

type UseProductsOptions = {
  page?: number;
  limit?: number;
  queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
};

export const useProducts = ({
  queryConfig,
  page,
  limit,
}: UseProductsOptions) => {
  return useQuery({
    ...getProductsQueryOptions({ page, limit }),
    ...queryConfig,
  });
};
