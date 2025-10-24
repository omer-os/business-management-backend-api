import { DocumentDecoration } from "elysia";

export const businessListMenusDoc: DocumentDecoration = {
  summary: "list menus",
  description: "List all menus in selected branch",
  operationId: "businessListMenus",
};
export const businessShowMenuDoc: DocumentDecoration = {
  summary: "show menu",
  description: "Show menu details",
  operationId: "businessShowMenu",
};

export const businessCreateMenuDoc: DocumentDecoration = {
  summary: "create menu",
  description: "Create new menu in selected branch",
  operationId: "businessCreateMenu",
};

export const businessUpdateMenuDoc: DocumentDecoration = {
  summary: "update menu",
  description: "Update menu details",
  operationId: "businessUpdateMenu",
};

export const businessDeleteMenuDoc: DocumentDecoration = {
  summary: "delete menu",
  description: "Delete menu",
  operationId: "businessDeleteMenu",
};
