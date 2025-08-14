import { capitalize } from "../helpers/capitalize";
import { RuleFnWithData } from "../types";

const confirm: RuleFnWithData = (value, arg, data) => {
  let isValidFnWithData = false;
  let args = {};

  if (data) {
    const { __field__ } = data;
    const confirmField = `confirm${capitalize(__field__)}`;

    if (data[__field__] === data[confirmField]) {
      isValidFnWithData = true;
    } else {
      args = { arg1: __field__, arg2: `confirm ${__field__}` };
    }
  }

  return { isValidFnWithData, args };
};

export default confirm;
