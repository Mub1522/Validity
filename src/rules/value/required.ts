export default function required(value: any): boolean {
  return value !== undefined && value !== null && value !== "";
}
