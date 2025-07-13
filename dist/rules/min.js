const min = (value, arg) => {
    return typeof value === "string" && value.length >= parseInt(arg || "0");
};
export default min;
