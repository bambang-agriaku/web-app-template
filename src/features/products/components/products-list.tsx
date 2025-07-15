import AddIcon from "@mui/icons-material/Add";
import { Button, Stack, Typography } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Table } from "./table";
import { SearchField } from "@/components/ui/inputs";
import { DefaultPage } from "@/config/table";
import { useListQueryParams } from "../hooks/use-list-query-params";
import { useNavigate } from "@tanstack/react-router";

export const ProductsList = () => {
  const navigate = useNavigate();
  const { queryParams, setQueryParams } = useListQueryParams();

  const goToCreateProduct = () => {
    navigate({ to: "/products/create" });
  };

  return (
    <Stack spacing={4.5}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <InventoryIcon color="primary" />
        <Typography variant="header">Produk</Typography>
      </Stack>
      <Stack direction="row" spacing={6} alignItems="center">
        <SearchField
          initialValue={queryParams.q}
          placeholder="Cari Berdasarkan Nama Produk"
          onChange={(q) => setQueryParams({ q, page: DefaultPage })}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ width: 350, minHeight: 40 }}
          onClick={goToCreateProduct}
        >
          Buat Produk Baru
        </Button>
      </Stack>

      <Table />
    </Stack>
  );
};
