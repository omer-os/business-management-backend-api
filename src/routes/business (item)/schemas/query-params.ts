import { t } from "elysia";

export const itemSelectQueryParams = t.Object({
  id: t.String({
    format: "uuid",
    description: "Item id",
  }),
});

export const businessListItemsQueryParams = t.Object({
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Item id",
    }),
  ),
});