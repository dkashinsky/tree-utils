export type TreeItemMeta = {
  level: number;
  isLeaf: boolean;
};

export type TreeItemCreator<T> = (parent: T | undefined, meta: TreeItemMeta) => T;

export type TreeOptions = {
  maxDepth: number;
  minSiblings: number;
  maxSiblings: number;
};

export type TreeItemOptions<T> = {
  itemCreator: TreeItemCreator<T>;
};
