import required from "./required";
import min from "./min";
import max from "./max";
import email from "./email";
import numeric from "./numeric";
import alpha from "./alpha";
import { RuleFn } from "../types";

export const rules: Record<string, RuleFn> = {
  required,
  min,
  max,
  email,
  numeric,
  alpha,
};
