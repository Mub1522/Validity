export type RuleFn = (value: any, arg?: string, data?: Record<string, any>) => boolean;
export type RuleFnWithData = (value: any, arg?: string, data?: Record<string, any>) => { isValidFnWithData: boolean, args?: Record<string, string> };
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}
export interface FormValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  logs?: any;
}
