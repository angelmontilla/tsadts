import { DQueueIterator } from './dqueue-iterator';

describe('DQueueIterator', () => {
  it('should create an instance', () => {
    expect(() => {new DQueueIterator(null, -1); }).toThrow();
  });
});
