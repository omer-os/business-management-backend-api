import { t } from "elysia";

export const menuSelectQueryParams = t.Object({
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Menu slug",
    }),
  ),
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Menu id",
    }),
  ),
});

export const businessListMenusQueryParams = t.Object({
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Menu slug",
    }),
  ),
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Menu id",
    }),
  ),
});
