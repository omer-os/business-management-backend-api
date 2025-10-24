import { DocumentDecoration } from "elysia";

export const businessListItemsDoc: DocumentDecoration = {
  summary: "list items",
  description: "List all items in selected branch",
  operationId: "businessListItems",
};

export const businessShowItemDoc: DocumentDecoration = {
  summary: "show item",
  description: "Show item details",
  operationId: "businessShowItem",
};

export const businessCreateItemDoc: DocumentDecoration = {
  summary: "create item",
  description: "Create new item in selected branch",
  operationId: "businessCreateItem",
};

export const businessUpdateItemDoc: DocumentDecoration = {
  summary: "update item",
  description: "Update item details",
  operationId: "businessUpdateItem",
};

export const businessDeleteItemDoc: DocumentDecoration = {
  summary: "delete item",
  description: "Delete item",
  operationId: "businessDeleteItem",
};