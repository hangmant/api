import { deepClone } from '../deepClone'

describe('deepClone', () => {
  const fakeDeepObject = {
    a: 1,
    b: 'b',
    c: {
      b: 2
    }
  }

  it('should clone object', () => {
    expect(deepClone(fakeDeepObject)).toEqual(fakeDeepObject)
  })

  it('should not be the same', () => {
    expect(deepClone(fakeDeepObject)).not.toBe(fakeDeepObject)
  })

  describe('for nested fields', () => {
    it('should not be the same', () => {
      expect(deepClone(fakeDeepObject).c).not.toBe(fakeDeepObject.c)
    })
  })
})
