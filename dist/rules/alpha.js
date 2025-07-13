export default function alpha(value) {
    const regex = /^[a-zA-Z]+$/;
    return typeof value === "string" && regex.test(value);
}
