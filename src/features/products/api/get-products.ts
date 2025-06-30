import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { Products } from "@/types/api";
import { apiRoutes } from "@/config/api-routes";
import { DefaultPage, DefaultPageSize } from "@/config/table";

export const getProducts = (
  page = DefaultPage,
  limit = DefaultPageSize,
  q?: string,
): Promise<Products> => {
  const skip = page ? (page - 1) * limit : undefined;
  return api.get(apiRoutes.products, {
    params: {
      limit,
      skip,
      ...(q && { q }),
    },
  });
};

export const getProductsQueryOptions = ({
  page = DefaultPage,
  limit = DefaultPageSize,
  query,
}: { page?: number; limit?: number; query?: string } = {}) => {
  return queryOptions({
    queryKey: ["products", { page, limit, query }],
    queryFn: () => getProducts(page, limit, query),
  });
};

type UseProductsOptions = {
  page?: number;
  limit?: number;
  query?: string;
  queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
};

export const useProducts = ({
  page,
  limit,
  query,
  queryConfig,
}: UseProductsOptions) => {
  return useQuery({
    ...getProductsQueryOptions({ page, limit, query }),
    ...queryConfig,
  });
};
