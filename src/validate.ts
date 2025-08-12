import { rules } from "./rules";
import { rulesWithData } from "./rulesWithData";
import { locales } from "./locales";
import { ValidationResult } from "./types";

const defaultLocale = locales.en;

export function validate(
  value: any,
  ruleString: string,
  data?: Record<string, any>
): ValidationResult {
  const ruleList = ruleString.split("|");
  const errors: string[] = [];

  for (const rule of ruleList) {

    /* Rules */
    const [ruleName, arg] = rule.split(":");
    const fn = rules[ruleName as keyof typeof rules];
    const fnWithData = rulesWithData[ruleName as keyof typeof rulesWithData];

    /* Validations */
    if (!fn && !fnWithData) continue;

    /* Response */
    if (fn) {
      let isValidFn = fn(value, arg);
      if (!isValidFn) {
        const template =
          defaultLocale[ruleName as keyof typeof defaultLocale] || "Validation failed";
        const message = template.replace(":arg", arg || "");
        errors.push(message);
      }
    } else if (fnWithData) {
      const { isValidFnWithData, args } = fnWithData(value, arg, data);
      if (!isValidFnWithData) {
        const template =
          defaultLocale[ruleName as keyof typeof defaultLocale] || "Validation failed";

        let message = template;
        for (const [key, value] of Object.entries(args || {})) {
          message = message.replace(`:${key}`, value);
        }
        errors.push(message);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
