import { treeGenerator } from './tree-generator';

describe('tree generator', () => {
  it('yields `not implemented`', () => {
    const generator = treeGenerator();

    expect(generator.next().value).toBe('not implemented');
    expect(generator.next().done).toBeTruthy();
  });
});
