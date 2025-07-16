import { requiredString, positiveNumber } from "@/lib/validation/validators";
import * as v from "valibot";

export const productSchema = v.object({
  name: requiredString,
  category: requiredString,
  price: positiveNumber,
});

export type ProductSchema = v.InferOutput<typeof productSchema>;
