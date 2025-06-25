export const paths = {
  auth: {
    login: {
      path: "/login",
      getHref: (redirect?: string) =>
        `/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`,
    },
  },
  products: {
    list: {
      path: "/products",
      getHref: () => "/products",
    },
  },
  recipes: {
    list: {
      path: "/recipes",
      getHref: () => "/recipes",
    },
  },
} as const;
