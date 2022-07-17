export function deepClone<T extends object>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}
