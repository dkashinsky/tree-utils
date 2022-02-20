import { defaultItemCreatorFactory, TreeItem } from "./tree-item";
import { TreeItemCreator, TreeItemMeta } from "./types";

describe('defaultItemCreatorFactory', () => {
  it('produces item creator', () => {
    expect(defaultItemCreatorFactory()).toBeDefined();
  });

  describe('item creator', () => {
    let itemCreator: TreeItemCreator<TreeItem> = null!;

    beforeEach(() => {
      itemCreator = defaultItemCreatorFactory();
    });

    it('generates new unique `id` on each item creation', () => {
      const itemIds: string[] = [];
      const meta: TreeItemMeta = {
        level: 0,
        isLeaf: true,
      };
      const iterations = 10;

      for (let i = 0; i < iterations; i++) {
        itemIds.push(itemCreator(undefined, meta).id);
      }

      const uniqueIds = new Set(itemIds);

      expect(uniqueIds.size).toBe(iterations);
    });

    it('generates `name` based on id', () => {
      const meta: TreeItemMeta = {
        level: 5,
        isLeaf: true,
      };

      const item = itemCreator(undefined, meta);

      expect(item.name).toBe(`Item ${item.id}`);
    });

    it('sets `parentId` when provided', () => {
      const parentItem: TreeItem = {
        id: 'test-id',
        name: 'test-item',
        depth: 0,
      };
      const meta: TreeItemMeta = {
        level: 0,
        isLeaf: true,
      };

      const childItem = itemCreator(parentItem, meta);

      expect(childItem.parentId).toBe(parentItem.id);
    });

    it('sets `depth` from meta', () => {
      const meta: TreeItemMeta = {
        level: 5,
        isLeaf: true,
      };

      const item = itemCreator(undefined, meta);

      expect(item.depth).toBe(meta.level);
    });
  });
});
