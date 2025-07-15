import { DefaultPage, DefaultPageSize } from "@/config/table";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

const QueryParams = {
  Page: "page",
  Limit: "limit",
  Query: "q",
} as const;

export const useListQueryParams = () => {
  const [queryParams, setQueryParams] = useQueryStates({
    [QueryParams.Page]: parseAsInteger.withDefault(DefaultPage),
    [QueryParams.Limit]: parseAsInteger.withDefault(DefaultPageSize),
    [QueryParams.Query]: parseAsString.withDefault(""),
  });

  return { queryParams, setQueryParams };
};
