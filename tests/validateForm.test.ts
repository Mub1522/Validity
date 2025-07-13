import { describe } from "vitest";
import { expectFormValidation } from "./helpers";

describe("Validation forms cases", () => {
  expectFormValidation(
    {
      name: "",
      email: "correo@x",
      password: "123",
    },
    {
      name: "required|alpha",
      email: "required|email",
      password: "required|min:6",
    },
    {
      valid: false,
      errors: {
        name: ["This field is required", "Only letters are allowed"],
        email: ["This field must be a valid email address"],
        password: ["Must be at least 6 characters long"],
      },
    }
  );
});
