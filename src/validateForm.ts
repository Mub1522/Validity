import { validate } from "./validate";
import { FormValidationResult } from "./types";
import { rulesWithData } from "./rulesWithData";

export function validateForm(
  data: Record<string, any>,
  rules: Record<string, string>
): FormValidationResult {
  let isFormValid = true;
  const errors: Record<string, string[]> = {};

  for (const field in rules) {
    const value = data[field];

    /* Validations */
    if (/^__/.test(field)) continue;
    const ruleList = rules[field].split("|");
    if (!ruleList.length) continue;

    let result;
    if (ruleList.some(rule => rule in rulesWithData)) {
      data.__field__ = field;
      result = validate(value, rules[field], data);
    } else {
      result = validate(value, rules[field]);
    }

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
