import keyBy = require('lodash.keyby');

/**
 * Create new array with "values for keys" in the same order, if the
 * key doesn't exist in values, returns null for that index.
 * *It's useful to load data for graphql dataloaders
 * @param keys keys to get values
 * @param values values where the keys will be searched
 * @param {string} [fieldKey="_id"] field name in a value to compare with a key
 */
export function dlSort<T extends object>(
  keys: readonly string[],
  values: T[],
  fieldKey: string = '_id',
): T[] {
  const valuesMap = keyBy(values, fieldKey);
  return keys.map((key) => valuesMap?.[key] ?? null);
}
