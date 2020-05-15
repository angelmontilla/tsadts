import { StackIterator } from './stack-iterator';

describe('StackIterator', () => {
  it('should create an instance', () => {
    expect(new StackIterator([{p: 0}])).toBeTruthy();
  });
});
