import { t } from "elysia";

export const menuSelectQueryParams = t.Object({
  id: t.String({
    format: "uuid",
    description: "Menu id",
  }),
});

export const businessListMenusQueryParams = t.Object({
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Menu id",
    }),
  ),
});
