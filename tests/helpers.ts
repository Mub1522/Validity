import { validate } from "../src/validate";
import { validateForm } from "../src/validateForm";
import { expect, it } from "vitest";

interface ValidationCase {
  value: any;
  rules: string;
  valid: boolean;
  errors?: string[];
}

export function testValidationCases(cases: ValidationCase[]) {
  cases.forEach(({ value, rules, valid, errors }, index) => {
    const result = validate(value, rules);

    it(`Case #${index + 1} - "${rules}" on "${value}"`, () => {
      expect(result.valid).toBe(valid);
      if (errors) {
        expect(result.errors).toEqual(errors);
      }
    });
  });
}

export function expectFormValidation(
  data: Record<string, any>,
  rules: Record<string, string>,
  expected
) {
  const result = validateForm(data, rules);
  it("Case #1", () => {
    expect(result).toEqual(expected);
  });
}
