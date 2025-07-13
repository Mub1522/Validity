export default function email(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof value === "string" && regex.test(value);
}
