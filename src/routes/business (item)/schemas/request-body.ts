import { t } from "elysia";

const LocalStringSchema = t.Object({
  en: t.Optional(t.String()),
  ar: t.Optional(t.String()),
  ku: t.Optional(t.String()),
  tr: t.Optional(t.String()),
});

export const businessCreateItemSchema = t.Object({
  name: LocalStringSchema,
});

export const businessUpdateItemSchema = t.Object({
  name: t.Optional(LocalStringSchema),
});