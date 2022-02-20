# Tree Utilities
A set of utility functions frequently used while working with tree-like structures

# API

## Tree Generator

Thare are 2 tree generation utility functions here:

 - `generateTree` - Helper function. Provided with options, it returns flat array of tree items. Works on top of the generator.
 - `treeGenerator` - Generator function. Provided with options, allows to generate random tree, yielding each tree item.

Usage Example:

For demo purposes custom implementation is provided for `itemCreator` function but if your usage is limited to tests there is handy `defaultItemCreatorFactory` which creates default item creator which is basically the same as a custom one:
```ts
import { defaultItemCreatorFactory, TreeItemMeta } from '@fsdk/tree-utils';
import { nanoid } from 'nanoid'

const itemCreator = (parent: YourTreeItemDataType | undefined, meta: TreeItemMeta) => ({
  id: nanoid(),
  parentId: parent?.id,
  name: `Item ${id}`,
  depth: meta.level,
});

// alternatively you can use built in item creator
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

// Start generation by calling `next`
const treeItem = generator.next().value;
```
