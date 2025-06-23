import type { ReactNode } from "react";
import CategoryIcon from "@mui/icons-material/Category";

type ResourceName = "products" | "recipes";

export type Resource = {
  name: ResourceName;
  icon: ReactNode;
  label: string;
  path?: string;
  children?: Resource[];
};

export const resources: Resource[] = [
  {
    name: "products",
    icon: <CategoryIcon />,
    label: "Produk",
    path: "/products",
    children: [
      {
        name: "recipes",
        icon: <CategoryIcon />,
        label: "Resep",
        path: "/recipes",
      },
    ],
  },
  {
    name: "recipes",
    icon: <CategoryIcon />,
    label: "Resep",
    path: "/recipes",
  },
];
