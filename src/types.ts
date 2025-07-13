export type RuleFn = (value: any, arg?: string) => boolean;
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}
export interface FormValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
}
