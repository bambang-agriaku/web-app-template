import { Button, CircularProgress } from "@mui/material";
import { useFormContext } from "@/forms";

type Props = {
  label: string;
  loadingLabel?: string;
  fullWidth?: boolean;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error" | "success" | "inherit";
};

export function SubmitButton({
  label,
  loadingLabel = "Submitting...",
  fullWidth = true,
  variant = "contained",
  color = "primary",
}: Props) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type="submit"
          fullWidth={fullWidth}
          variant={variant}
          color={color}
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}
        >
          {isSubmitting ? loadingLabel : label}
        </Button>
      )}
    </form.Subscribe>
  );
}
