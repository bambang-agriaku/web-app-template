import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import { useFieldUIState } from "./use-field-ui-state";

type RadioOption = { label: string; value: string };

type Props = {
  label: string;
  options: RadioOption[];
  row?: boolean;
};

export const RadioField = ({ label, options, row = false }: Props) => {
  const { value, onChange, onBlur, hasError, errorText } =
    useFieldUIState<string>();

  return (
    <FormControl component="fieldset" error={hasError}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        row={row}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      >
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio />}
            label={opt.label}
          />
        ))}
      </RadioGroup>
      {hasError && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};
