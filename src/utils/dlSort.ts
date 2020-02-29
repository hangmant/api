import keyBy = require('lodash.keyby')
import get = require('lodash.get')

export function dlSort(keys: readonly string[], listValues: any[], fieldKey: string = '_id') {
  const listByKey = keyBy(listValues, fieldKey)
  return keys.map(_id => get(listByKey, _id, null))
}
