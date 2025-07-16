export const validationMessages = {
  required: "This field is required",
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be at most ${max} characters`,
  number: "Must be a valid number",
  positiveNumber: "Must be a positive number",
  email: "Invalid email address",
};
