import { RuleFn } from "../types";

const min: RuleFn = (value, arg) => {
  return typeof value === "string" && value.length >= parseInt(arg || "0");
};

export default min;
