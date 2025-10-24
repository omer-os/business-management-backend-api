import { t } from "elysia";

const LocalStringSchema = t.Object({
  en: t.Optional(t.String()),
  ar: t.Optional(t.String()),
  ku: t.Optional(t.String()),
  tr: t.Optional(t.String()),
});

const CategoryResponse = t.Object({
  id: t.String(),
  name: LocalStringSchema,
  branchId: t.Nullable(t.String()),
});

export const businessListCategoriesResponseSchema = t.Array(CategoryResponse);
export const businessShowCategoryResponseSchema = CategoryResponse;
export const businessCreateCategoryResponseSchema = CategoryResponse;
export const businessUpdateCategoryResponseSchema = CategoryResponse;
export const businessDeleteCategoryResponseSchema = t.Null();