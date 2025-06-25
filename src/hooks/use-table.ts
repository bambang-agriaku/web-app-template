import { DefaultPage, DefaultPageSize } from "@/config/table";
import type {
  MRT_PaginationState,
  MRT_SortingState,
  MRT_Updater,
} from "material-react-table";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";

export const sortConstants = ["asc", "desc"] as const;

export const QueryParams = {
  Page: "page",
  Limit: "limit",
  SortField: "sort_field",
  SortOrder: "sort_order",
} as const;

export const useTable = () => {
  const [queryParams, setQueryParams] = useQueryStates({
    [QueryParams.Page]: parseAsInteger.withDefault(DefaultPage),
    [QueryParams.Limit]: parseAsInteger.withDefault(DefaultPageSize),
    [QueryParams.SortField]: parseAsString,
    [QueryParams.SortOrder]: parseAsStringLiteral(sortConstants),
  });

  const pagination: MRT_PaginationState = {
    pageIndex: queryParams[QueryParams.Page],
    pageSize: queryParams[QueryParams.Limit],
  };

  const onPaginationChange = (updater: MRT_Updater<MRT_PaginationState>) => {
    setQueryParams((prev) => {
      const { pageIndex, pageSize } =
        typeof updater === "function"
          ? updater({
              pageIndex: prev[QueryParams.Page],
              pageSize: prev[QueryParams.Limit],
            })
          : updater;

      return {
        ...prev,
        [QueryParams.Page]: pageIndex,
        [QueryParams.Limit]: pageSize,
      };
    });
  };

  const sortField = queryParams[QueryParams.SortField];
  const sortOrder = queryParams[QueryParams.SortOrder];
  const sorting: MRT_SortingState =
    sortField && sortOrder
      ? [{ id: sortField, desc: sortOrder === "desc" }]
      : [];

  const onSortingChange = (updater: MRT_Updater<MRT_SortingState>) => {
    const [newSort] =
      typeof updater === "function" ? updater(sorting) : updater;

    if (!newSort) {
      setQueryParams({
        [QueryParams.SortField]: null,
        [QueryParams.SortOrder]: null,
      });
      return;
    }

    setQueryParams({
      [QueryParams.SortField]: newSort.id,
      [QueryParams.SortOrder]: newSort.desc ? "desc" : "asc",
    });
  };

  return { pagination, onPaginationChange, sorting, onSortingChange };
};
