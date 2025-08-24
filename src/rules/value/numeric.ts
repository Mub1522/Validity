export default function numeric(value: any): boolean {
  const regex = /^-?\d+(\.\d+)?$/;
  return typeof value === "string" && regex.test(value);
}
