import type { ReactNode } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import { paths } from "@/config/paths";

type ResourceName = "products" | "cookings" | "recipes";

export type Resource = {
  name: ResourceName;
  icon: ReactNode;
  label: string;
  path?: string;
  children?: Resource[];
};

export const resources: Resource[] = [
  {
    name: "cookings",
    icon: <CategoryIcon />,
    label: "Masak-memasak",
    children: [
      {
        name: "recipes",
        icon: <CategoryIcon />,
        label: "Resep",
        path: paths.recipes.list.path,
      },
    ],
  },
  {
    name: "products",
    icon: <CategoryIcon />,
    label: "Produk",
    path: paths.products.list.path,
  },
];
