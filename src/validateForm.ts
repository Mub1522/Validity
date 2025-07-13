import { validate } from "./validate";
import { FormValidationResult } from "./types";

export function validateForm(
  data: Record<string, any>,
  rules: Record<string, string>
): FormValidationResult {
  const errors: Record<string, string[]> = {};
  let isFormValid = true;

  for (const field in rules) {
    const value = data[field];
    const result = validate(value, rules[field]);

    if (!result.valid) {
      errors[field] = result.errors;
      isFormValid = false;
    }
  }

  return {
    valid: isFormValid,
    errors,
  };
}
