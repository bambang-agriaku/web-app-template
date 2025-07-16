import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useFieldUIState } from "./use-field-ui-state";

type SelectOption = { label: string; value: string };

type Props = {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
};

export const SelectField = ({
  label,
  options,
  placeholder,
  fullWidth = true,
}: Props) => {
  const { field, value, onChange, onBlur, hasError, errorText } =
    useFieldUIState<string>();

  const labelId = `${field.name}-label`;

  return (
    <FormControl fullWidth={fullWidth} error={hasError}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        displayEmpty
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};
