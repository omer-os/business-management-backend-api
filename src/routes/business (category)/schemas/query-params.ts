import { t } from "elysia";

export const categorySelectQueryParams = t.Object({
  id: t.String({
    format: "uuid",
    description: "Category id",
  }),
});

export const businessListCategoriesQueryParams = t.Object({
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Category id",
    }),
  ),
});
