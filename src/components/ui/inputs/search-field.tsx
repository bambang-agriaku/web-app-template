import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
  TextField,
  type TextFieldProps,
  debounce,
  useTheme,
} from "@mui/material";
import { type ChangeEvent, useCallback, useState } from "react";

const DebounceTime = 500;
const MaxWidth = 360;

type Props = {
  onChange: (value: string) => void;
  initialValue?: string;
  debounceMs?: number;
  maxWidth?: number;
} & Omit<TextFieldProps, "value" | "onChange">;

export const SearchField = (props: Props) => {
  const {
    onChange,
    initialValue,
    debounceMs = DebounceTime,
    maxWidth = MaxWidth,
    ...rest
  } = props;
  const [value, setValue] = useState(initialValue);
  const theme = useTheme();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChangeHandler = useCallback(
    debounce(onChange, debounceMs),
    [],
  );

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    // Set the value immediately for view purposes
    // but debounce the onChange event
    setValue(value);
    debouncedOnChangeHandler(value);
  };

  const handleClear = () => {
    const emptyValue = "";
    setValue(emptyValue);
    debouncedOnChangeHandler(emptyValue);
  };

  return (
    <TextField
      value={value}
      onChange={handleOnChange}
      placeholder="Cari"
      variant="standard"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <CancelIcon
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={handleClear}
            />
          ) : null,
          sx: {
            px: 2,
            py: 0.5,
            borderRadius: 7,
            backgroundColor: theme.palette.neutral,
            maxWidth,
            border: "1px solid transparent",
            "&.Mui-focused": {
              backgroundColor: "white",
              border: `1px solid ${theme.palette.primary.main}`,
            },
          },
          disableUnderline: true,
        },
      }}
      fullWidth
      {...rest}
    />
  );
};
