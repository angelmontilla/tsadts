import { DStackIterator } from './d-stack-iterator';

describe('DStackIterator', () => {
  it('should create an instance', () => {
    expect(() => { new DStackIterator(null, -1); }).toThrow();
  });
});
