import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Fragment, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { routeTree } from "./routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useAuth, AuthProvider } from "@/lib/auth";
import * as TanStackQueryProvider from "./integrations/tanstack-query/root-provider.tsx";
import { CssBaseline } from "@mui/material";

const context = {
  ...TanStackQueryProvider.getContext(),
  auth: undefined!, // This will be set after we wrap the app in an AuthProvider
};

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ ...context, auth }} />;
}

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <TanStackQueryProvider.Provider>
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
      </TanStackQueryProvider.Provider>
    </Fragment>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
