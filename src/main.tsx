import "@fontsource-variable/inter"; // Supports weights 100-900

import { Fragment, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { routeTree } from "./routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useAuth, AuthProvider } from "@/lib/auth";
import * as TanStackQueryProvider from "./integrations/tanstack-query/root-provider.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/config/theme.ts";
import { Notifications } from "@/components/ui/notifications/notifications.tsx";

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

  return (
    <>
      <RouterProvider router={router} context={{ ...context, auth }} />
      <Notifications />
    </>
  );
}

function App() {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TanStackQueryProvider.Provider>
          <AuthProvider>
            <InnerApp />
          </AuthProvider>
        </TanStackQueryProvider.Provider>
      </ThemeProvider>
    </Fragment>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
