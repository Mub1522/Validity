import { validate } from "./validate";
export function validateForm(data, rules) {
    const errors = {};
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
