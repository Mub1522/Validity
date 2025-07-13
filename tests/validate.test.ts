import { describe } from "vitest";
import { testValidationCases } from "./helpers";

describe("Validation cases", () => {
  testValidationCases([
    {
      value: "",
      rules: "required",
      valid: false,
      errors: ["This field is required"],
    },
    {
      value: "abc",
      rules: "required|min:5",
      valid: false,
      errors: ["Must be at least 5 characters long"],
    },
    {
      value: "abcdef",
      rules: "required|min:5",
      valid: true,
    },
    {
      value: "correo@x.com",
      rules: "required|email",
      valid: true,
    },
    {
      value: "no-es-email",
      rules: "email",
      valid: false,
      errors: ["This field must be a valid email address"],
    },
  ]);
});
