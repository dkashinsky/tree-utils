import { TreeItemCreator, TreeItemMeta } from "./types";

export type TreeItem = {
  id: string,
  parentId?: string;
  name: string;
  depth: number;
};

export const defaultItemCreatorFactory = (): TreeItemCreator<TreeItem> => {
  let id = 0;

  return (parent: TreeItem | undefined, meta: TreeItemMeta) => ({
    id: `${++id}`,
    parentId: parent?.id,
    name: `Item ${id}`,
    depth: meta.level,
  });
};
