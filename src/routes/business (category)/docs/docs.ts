import { DocumentDecoration } from "elysia";

export const businessListCategoriesDoc: DocumentDecoration = {
  summary: "list categories",
  description: "List all categories in selected branch",
  operationId: "businessListCategories",
};

export const businessShowCategoryDoc: DocumentDecoration = {
  summary: "show category",
  description: "Show category details",
  operationId: "businessShowCategory",
};

export const businessCreateCategoryDoc: DocumentDecoration = {
  summary: "create category",
  description: "Create new category in selected branch",
  operationId: "businessCreateCategory",
};

export const businessUpdateCategoryDoc: DocumentDecoration = {
  summary: "update category",
  description: "Update category details",
  operationId: "businessUpdateCategory",
};

export const businessDeleteCategoryDoc: DocumentDecoration = {
  summary: "delete category",
  description: "Delete category",
  operationId: "businessDeleteCategory",
};