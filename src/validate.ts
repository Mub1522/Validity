import { rules } from "./rules";
import { locales } from "./locales";
import { ValidationResult } from "./types";

const defaultLocale = locales.en;

export function validate(value: any, ruleString: string): ValidationResult {
  const ruleList = ruleString.split("|");
  const errors: string[] = [];

  for (const rule of ruleList) {
    const [ruleName, arg] = rule.split(":");
    const fn = rules[ruleName as keyof typeof rules];

    if (!fn) continue;

    const isValid = fn(value, arg);

    if (!isValid) {
      const template =
        defaultLocale[ruleName as keyof typeof defaultLocale] || "Invalid rule";
      const message = template.replace(":arg", arg || "");
      errors.push(message);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
