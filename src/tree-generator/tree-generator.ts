import { fromRange } from "../utils/range";
import { TreeItemOptions, TreeOptions } from "./types";

export type TreeGeneratorOptions<T> = TreeOptions & TreeItemOptions<T>;

export function* treeGenerator<T>(
  options: TreeGeneratorOptions<T>,
  depth: number = 0,
  parent?: T,
): Generator<T, void, void> {
  const {
    maxDepth,
    minSiblings,
    maxSiblings,
    itemCreator,
  } = options;

  const siblingsCount = fromRange(minSiblings, maxSiblings);
  const isLeaf = maxDepth === 0 || siblingsCount === 0;
  const currentItem = itemCreator(parent, {
    level: depth,
    isLeaf,
  });

  yield currentItem;

  if (!isLeaf) {
    for (let i = 0; i < siblingsCount; i++) {
      yield* treeGenerator({
        ...options,
        maxDepth: fromRange(0, maxDepth - 1),
      }, depth + 1, currentItem);
    }
  }
}

export const defaults: TreeOptions = {
  maxDepth: 10,
  minSiblings: 3,
  maxSiblings: 7,
};

export function generateTree<T>(
  options: Partial<TreeOptions> & TreeItemOptions<T>,
  maxItems: number = 1000,
): T[] {
  const generator = treeGenerator({ ...defaults, ...options });
  const result: T[] = [];

  let current = generator.next();
  while (!current.done && result.length < maxItems) {
    result.push(current.value);
    current = generator.next();
  }

  return result;
};
