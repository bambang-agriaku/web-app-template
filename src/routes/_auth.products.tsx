import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/products")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/products"!</div>;
}
