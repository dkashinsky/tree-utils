# Tree Utilities
A set of utility functions frequently used while working with tree-like structures

# API

## Tree Generator

Thare are 2 tree generation utility functions here:

 - `generateTree` - Helper function. Provided with options, it returns flat array of tree items. Works on top of the generator.
 - `treeGenerator` - Generator function. Provided with options, allows to generate random tree, yielding each tree item.

Usage Example:

`itemCreator` - Both `generateTree` and `treeGenerator` rely on creator function used to generate particular tree item.
```ts
import { defaultItemCreatorFactory, TreeItemMeta } from '@fsdk/tree-utils';
import { nanoid } from 'nanoid'

type FlatTreeItem = {
  id: string;
  parentId?: string;
  name: string;
  depth: number;
}

const flatItemCreator = (parent: FlatTreeItem | undefined, meta: TreeItemMeta) => ({
  id: nanoid(),
  parentId: parent?.id,
  name: `Item ${id}`,
  depth: meta.level,
});

type NestedTreeItem = {
  id: string;
  children: NestedTreeItem[];
}

const nestedItemCreator = (parent: NestedTreeItem | undefined, meta: TreeItemMeta) => {
  const item: NestedTreeItem = {
    id: nanoid(),
    children: [],
  };

  parent?.children.push(item);

  return item;
};

// alternatively you can use built-in item creator factory to produce `flatItemCreator` above
const itemCreator = defaultItemCreatorFactory();
```

`generateTree`:
```ts
import { generateTree } from '@fsdk/tree-utils';

const treeItems = generateTree({
  itemCreator,     // Required. Provides function used to create tree item object
  maxDepth: 5,     // Optional. Provides maximum depth of the randomly generated tree. Defults to 10
  minSiblings: 2,  // Optional. Provides minimum nested items count used by randomzier. Defaults to 3
  maxSiblings: 15, // Optional. Provides maximum nested items count used by randomizer. Defaults to 7
  maxItems: 1000,  // Optional. Limits total items generated in case generation exceeds specified distribution. Defaults to 1000
});

// if you use nested tree object structure it is handy to get `root` as all other items are accessible via children property
const [root] = generateTree({
  itemCreator: nestedItemCreator,
});
```

`treeGenerator`:
```ts
import { treeGenerator } from '@fsdk/tree-utils';

const generator = treeGenerator({
  itemCreator,    // Required. Provides function used to create tree item object
  maxDepth: 10,   // Required. Provides maximum depth of the randomly generated tree.
  minSiblings: 3, // Required. Provides minimum nested items count used by randomzier.
  maxSiblings: 7, // Required. Provides maximum nested items count used by randomizer.
});

// Start generate items by calling `next`
const treeItem = generator.next().value;
```
