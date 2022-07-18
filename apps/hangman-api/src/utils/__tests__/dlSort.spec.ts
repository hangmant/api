import { dlSort } from '../dlSort';

describe('dlSort', () => {
  const fakeValues = [
    { _id: '3', body: 'c' },
    { _id: '1', body: 'a' },
    { _id: '2', body: 'b' },
    { _id: '4', body: 'd' },
  ];

  describe('with default fieldKey as _id', () => {
    it('should return sorted values for keys', () => {
      const keys = ['1', '2', '3'];

      const result = dlSort(keys, fakeValues);
      expect(result).toEqual([
        { _id: '1', body: 'a' },
        { _id: '2', body: 'b' },
        { _id: '3', body: 'c' },
      ]);
    });

    it('should return null values for non-existent values', () => {
      const keys = ['1', '999999', '3'];

      const result = dlSort(keys, fakeValues);
      expect(result).toEqual([
        { _id: '1', body: 'a' },
        null,
        { _id: '3', body: 'c' },
      ]);
    });
  });

  describe('with custom default fieldKey', () => {
    it('should return sorted values for keys', () => {
      const keys = ['a', 'c', 'd'];

      const result = dlSort(keys, fakeValues, 'body');
      expect(result).toEqual([
        { _id: '1', body: 'a' },
        { _id: '3', body: 'c' },
        { _id: '4', body: 'd' },
      ]);
    });

    it('should return null values for non-existent values', () => {
      const keys = ['a', '999999', 'b', 'haha', 'another-key'];

      const result = dlSort(keys, fakeValues, 'body');
      expect(result).toEqual([
        { _id: '1', body: 'a' },
        null,
        { _id: '2', body: 'b' },
        null,
        null,
      ]);
    });
  });
});
