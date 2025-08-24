import { RuleFn } from "../types";

const max: RuleFn = (value, arg) => {
  return typeof value === "string" && value.length <= parseInt(arg || "0");
};

export default max;
