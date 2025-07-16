import { TextField as MUITextField } from "@mui/material";
import { useFieldUIState } from "./use-field-ui-state";
import type { ChangeEvent } from "react";

type Props = {
  label: string;
  placeholder?: string;
  type?: string;
  fullWidth?: boolean;
};

export function TextField({
  label,
  placeholder,
  type = "text",
  fullWidth = true,
}: Props) {
  const { value, onChange, onBlur, hasError, errorText } = useFieldUIState<
    string | number | undefined
  >();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      const raw = e.target.value;
      // empty = undefined, else convert
      const numVal = raw === "" ? undefined : Number(raw);
      onChange(numVal);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <MUITextField
      label={label}
      placeholder={placeholder}
      type={type}
      fullWidth={fullWidth}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      error={hasError}
      helperText={hasError ? errorText : ""}
    />
  );
}
