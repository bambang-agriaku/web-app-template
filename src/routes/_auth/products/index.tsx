import { ProductsList } from "@/features/products/components/products-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/products/")({
  component: ProductsList,
});
