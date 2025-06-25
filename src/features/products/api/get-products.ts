import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { Products } from "@/types/api";
import { apiRoutes } from "@/config/api-routes";
import { DefaultPage } from "@/config/table";

export const getProducts = (page = DefaultPage): Promise<Products> => {
  return api.get(apiRoutes.products, {
    params: {
      page,
    },
  });
};

export const getProductsQueryOptions = ({
  page = DefaultPage,
}: { page?: number } = {}) => {
  return queryOptions({
    queryKey: ["products", { page }],
    queryFn: () => getProducts(page),
  });
};

type UseProductsOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
};

export const useProducts = ({ queryConfig, page }: UseProductsOptions) => {
  return useQuery({
    ...getProductsQueryOptions({ page }),
    ...queryConfig,
  });
};
