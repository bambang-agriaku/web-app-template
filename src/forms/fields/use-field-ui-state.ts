import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "@/forms";

/**
 * Extracts value, change handlers, and error state for a field.
 */
export function useFieldUIState<T = string>() {
  const field = useFieldContext<T>();
  const meta = useStore(field.store, (state) => state.meta);

  const errors = meta.errors ?? [];
  const hasError = meta.isTouched && errors.length > 0;

  const errorText =
    errors
      .map((e) => (typeof e === "string" ? e : (e?.message ?? "")))
      .filter(Boolean)
      .join(", ") || undefined;

  return {
    field,
    value: field.state.value ?? ("" as T),
    onChange: field.handleChange,
    onBlur: field.handleBlur,
    hasError,
    errorText,
  };
}
