import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/products/$productId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/products/$productId/edit"!</div>
}
