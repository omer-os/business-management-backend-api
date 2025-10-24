import { t } from "elysia";

const LocalStringSchema = t.Object({
  en: t.Optional(t.String()),
  ar: t.Optional(t.String()),
  ku: t.Optional(t.String()),
  tr: t.Optional(t.String()),
});

const MenuResponse = t.Object({
  id: t.String(),
  name: LocalStringSchema, // JSON type
  theme: t.Optional(t.Any()),
  menuStructure: t.Array(t.Any()),
  branchId: t.Nullable(t.String()),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const businessListMenusResponseSchema = t.Array(MenuResponse);
export const businessShowMenuResponseSchema = MenuResponse;
export const businessCreateMenuResponseSchema = MenuResponse;
export const businessUpdateMenuResponseSchema = MenuResponse;
export const businessDeleteMenuResponseSchema = t.Null();
