import { t } from "elysia";

const LocalStringSchema = t.Object({
  en: t.Optional(t.String()),
  ar: t.Optional(t.String()),
  ku: t.Optional(t.String()),
  tr: t.Optional(t.String()),
});

const ItemResponse = t.Object({
  id: t.String(),
  name: LocalStringSchema,
  branchId: t.Nullable(t.String()),
});

export const businessListItemsResponseSchema = t.Array(ItemResponse);
export const businessShowItemResponseSchema = ItemResponse;
export const businessCreateItemResponseSchema = ItemResponse;
export const businessUpdateItemResponseSchema = ItemResponse;
export const businessDeleteItemResponseSchema = t.Null();