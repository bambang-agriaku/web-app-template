import { Stack, Typography } from "@mui/material";
import { ProductForm } from "../components/product-form";

export const CreateProduct = () => {
  const onSubmit = () => {
    console.log("onSubmit");
  };

  return (
    <Stack spacing={4.5}>
      <Typography variant="header">Buat Produk Baru</Typography>
      <ProductForm onSubmit={onSubmit} />
    </Stack>
  );
};
