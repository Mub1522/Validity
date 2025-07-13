export default function email(value: any): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof value === "string" && regex.test(value);
}