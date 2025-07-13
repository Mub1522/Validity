export default function alpha(value: any): boolean {
  const regex = /^[a-zA-Z]+$/;
  return typeof value === "string" && regex.test(value);
}
