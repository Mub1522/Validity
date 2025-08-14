import { validate } from "./validate";
import { FormValidationResult } from "./types";

export function validateForm(
  data: Record<string, any>,
  rules: Record<string, string>
): FormValidationResult {
  let isFormValid = true;
  const errors: Record<string, string[]> = {};

  for (const field in rules) {
    const value = data[field];

    /* Skip internal fields */
    if (/^__/.test(field)) continue;

    const ruleList = rules[field].split("|");

    /* Validations */
    if (!ruleList.length) continue;

    data.__field__ = field;
    const result = validate(value, rules[field], data);

    if (!result.valid) {
      errors[field] = result.errors;
      isFormValid = false;
    }
  }

  return {
    valid: isFormValid,
    errors
  };
}
