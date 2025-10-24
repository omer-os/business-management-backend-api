import { t } from "elysia";

const LocalStringSchema = t.Object({
  en: t.Optional(t.String()),
  ar: t.Optional(t.String()),
  ku: t.Optional(t.String()),
  tr: t.Optional(t.String()),
});

const ThemeConfigSchema = t.Object({
  theme: t.Union([t.Literal("dark"), t.Literal("light")]),
});

const StructureNodeSchema: any = t.Object({
  type: t.Union([t.Literal("category"), t.Literal("item")]),
  id: t.String(),
  children: t.Optional(t.Array(t.Any())),
});

export const businessCreateMenuSchema = t.Object({
  slug: t.String({
    format: "uri-reference",
    description: "Menu slug",
  }),
  name: LocalStringSchema,
  theme: t.Optional(ThemeConfigSchema),
  menuStructure: t.Optional(t.Array(StructureNodeSchema)),
});

export const businessUpdateMenuSchema = t.Object({
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Menu slug",
    }),
  ),
  name: t.Optional(LocalStringSchema),
  theme: t.Optional(ThemeConfigSchema),
  menuStructure: t.Optional(t.Array(StructureNodeSchema)),
});
