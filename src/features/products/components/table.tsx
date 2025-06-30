import { useTable } from "@/hooks/use-table";
import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { useProducts } from "@/features/products/api/get-products";
import { getDefaultMRTOptions } from "@/lib/table";
import type { Product } from "@/types/api";

type Row = Product;

const defaultMRTOptions = getDefaultMRTOptions<Row>();

export const Table = () => {
  const { pagination, onPaginationChange } = useTable();
  const productsQuery = useProducts({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
  });

  const rows = productsQuery.data?.products || [];
  const rowCount = productsQuery.data?.total || 0;

  const columns = useMemo<MRT_ColumnDef<Row>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "title",
        header: "Judul",
      },
      {
        accessorKey: "description",
        header: "Deskripsi",
      },
      {
        accessorKey: "category",
        header: "Kategori",
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    ...defaultMRTOptions,
    columns,
    data: rows,
    rowCount,
    state: { pagination, isLoading: productsQuery.isFetching },
    onPaginationChange,
  });

  return <MaterialReactTable table={table} />;
};
