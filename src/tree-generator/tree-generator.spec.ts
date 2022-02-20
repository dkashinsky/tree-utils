import { treeGenerator } from './tree-generator';
import { defaultItemCreatorFactory, TreeItem } from './tree-item';
import { TreeItemCreator } from './types';

describe('treeGenerator', () => {
  let itemCreator: TreeItemCreator<TreeItem> = null!;

  beforeEach(() => {
    itemCreator = defaultItemCreatorFactory();
  });

  it('yields tree item based on item creator provided', () => {
    const generator = treeGenerator({
      maxDepth: 10,
      minSiblings: 3,
      maxSiblings: 7,
      itemCreator,
    });
    const treeItem = generator.next().value;

    expect(treeItem).toEqual(expect.objectContaining({
      id: expect.any(String),
      parentId: undefined,
      name: expect.any(String),
      depth: expect.any(Number)
    }))
  });

  it('yields single item when `maxDepth` is set to `0`', () => {
    const generator = treeGenerator({
      maxDepth: 0,
      minSiblings: 3,
      maxSiblings: 7,
      itemCreator,
    });

    expect(generator.next().value).toBeDefined();
    expect(generator.next().done).toBe(true);
  });

  it('yields single item when `min/max` sibling options are set to `0`', () => {
    const generator = treeGenerator({
      maxDepth: 10,
      minSiblings: 0,
      maxSiblings: 0,
      itemCreator,
    });

    expect(generator.next().value).toBeDefined();
    expect(generator.next().done).toBe(true);
  });
});
