import { CreateProduct } from "@/features/products/components/create-product";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/products/create")({
  component: CreateProduct,
});
