<p align="center">
  <img src="./assets/logo.jpeg" width="200" alt="validity logo" />
</p>

# Validity

Validity is a lightweight JavaScript validation library inspired by Laravel's rule syntax.  
Validate individual fields or full forms with clean, readable rules and friendly error messages.

---

## Installation

```bash
npm install validity
# or
yarn add validity
```

## Usage

- Validate a single field

```ts
import { validate } from "validity";

const result = validate("test@example.com", "required|email");

console.log(result);
// {
//   valid: true,
//   errors: []
// }
```

- Validate a form (multiple fields)

```ts
import { validateForm } from "validity";

const data = {
  name: "",
  email: "bad-email",
  password: "123",
};

const rules = {
  name: "required|alpha",
  email: "required|email",
  password: "required|min:6",
};

const result = validateForm(data, rules);

console.log(result);
/*
{
  valid: false,
  errors: {
    name: ['This field is required'],
    email: ['This field must be a valid email address'],
    password: ['Must be at least 6 characters long']
  }
}
*/
```

## Built-in Rules

- required

- min:<'length'>

- max:<'length'>

- email

- alpha

- numeric

More coming soon.

## API Reference

| Function       | Description                             |
| -------------- | --------------------------------------- |
| `validate`     | Validate a single value and rule string |
| `validateForm` | Validate an object of values and rules  |
| `rules`        | Built-in validation rule set            |
| `locales`      | Translatable error messages             |

## Custom Rules

You can define your own validation rules by extending the rules object:

```ts
import { rules } from "validity";

// Add a custom rule: startsWith
rules.startsWith = (value: any, arg: string) =>
  typeof value === "string" && value.startsWith(arg);
```

⚠️ Important:

- You're modifying the global rule set. This affects all future validations using validate() or validateForm().

- Only extend existing objects — do not reassign rules entirely (e.g. rules = {} is unsafe).

- For large apps, you can create your own wrapper to isolate custom rules if needed.

## Localization

Supports multiple languages (e.g. English, Spanish). Default messages are in English.
Custom messages and i18n support are coming in future releases.

## Custom translates

You can override or translate default error messages by modifying the locales object:

```ts
import { locales } from "validity";

// Override the default message for the "required" rule in English
locales.en.required = "Este campo es obligatorio";
```

⚠️ Important:

- Only change messages after importing validity, and before performing any validation.

- This modifies the message globally. If you need per-form localization, consider wrapping validateForm().
