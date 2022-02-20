import { fromRange } from './range';

describe('fromRange', () => {
  it('returns provided value when min and max are the same', () => {
    const min = 15;
    const max = 15;

    expect(fromRange(min, max)).toBe(15);
  });
});
