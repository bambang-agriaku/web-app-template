import { useAppForm } from "@/forms";
import { productSchema, type ProductSchema } from "../schemas/productSchema";
import { Stack } from "@mui/material";

type Props = {
  defaultValues?: Partial<ProductSchema>;
  onSubmit: (values: ProductSchema) => void;
  isSubmitting?: boolean;
};

export const ProductForm = ({ defaultValues, onSubmit }: Props) => {
  const form = useAppForm({
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      ...defaultValues,
    },
    validators: {
      onChange: productSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Stack spacing={2}>
        <form.AppField
          name="name"
          children={(field) => <field.TextField label="Name" type="text" />}
        />

        <form.AppField
          name="category"
          children={(field) => (
            <field.SelectField
              label="Category"
              options={[
                { label: "Food", value: "food" },
                { label: "Electronics", value: "electronics" },
              ]}
            />
          )}
        />

        <form.AppField
          name="price"
          children={(field) => <field.TextField label="Price" type="number" />}
        />

        <form.AppForm>
          <form.SubmitButton label="Save Product" />
        </form.AppForm>
      </Stack>
    </form>
  );
};
