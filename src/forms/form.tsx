import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext, SubmitButton } from "@/forms";
import { TextField, RadioField, SelectField } from "@/forms/fields";

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    RadioField,
    SelectField,
    TextField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
