import { rules } from "./rules";
import { locales } from "./locales";
const defaultLocale = locales.en;
export function validate(value, ruleString) {
    const ruleList = ruleString.split("|");
    const errors = [];
    for (const rule of ruleList) {
        const [ruleName, arg] = rule.split(":");
        const fn = rules[ruleName];
        if (!fn)
            continue;
        const isValid = fn(value, arg);
        if (!isValid) {
            const template = defaultLocale[ruleName] || "Invalid rule";
            const message = template.replace(":arg", arg || "");
            errors.push(message);
        }
    }
    return {
        valid: errors.length === 0,
        errors,
    };
}
