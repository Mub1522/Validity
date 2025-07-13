function required(value) {
    return value !== undefined && value !== null && value !== "";
}

const min = (value, arg) => {
    return typeof value === "string" && value.length >= parseInt(arg || "0");
};

const max = (value, arg) => {
    return typeof value === "string" && value.length <= parseInt(arg || "0");
};

function email(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof value === "string" && regex.test(value);
}

function numeric(value) {
    const regex = /^-?\d+(\.\d+)?$/;
    return typeof value === "string" && regex.test(value);
}

function alpha(value) {
    const regex = /^[a-zA-Z]+$/;
    return typeof value === "string" && regex.test(value);
}

const rules = {
    required,
    min,
    max,
    email,
    numeric,
    alpha,
};

const messages$1 = {
    required: "El campo es obligatorio",
    min: "Debe tener al menos :arg caracteres",
    max: "Debe tener como máximo :arg caracteres",
    email: "El campo debe ser un correo válido",
    numeric: "El valor debe ser numérico",
    alpha: "Solo se permiten letras",
};

const messages = {
    required: "This field is required",
    min: "Must be at least :arg characters long",
    max: "Must be at most :arg characters long",
    email: "This field must be a valid email address",
    numeric: "The value must be numeric",
    alpha: "Only letters are allowed",
};

const locales = {
    es: messages$1,
    en: messages,
};

const defaultLocale = locales.en;
function validate(value, ruleString) {
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

function validateForm(data, rules) {
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

export { locales, rules, validate, validateForm };
