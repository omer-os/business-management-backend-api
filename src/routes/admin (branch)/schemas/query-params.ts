import { t } from "elysia";

export const branchSelectQueryParams = t.Object({
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Branch slug",
    }),
  ),
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Branch id",
    }),
  ),
});

export const adminListBranchesQueryParamsSchema = t.Object({
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Branch slug",
    }),
  ),
  name: t.Optional(
    t.String({
      description: "Branch name",
    }),
  ),
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Branch id",
    }),
  ),
  organizationId: t.Optional(
    t.String({
      format: "uuid",
      description: "Organization id",
    }),
  ),
});

export const adminDeleteBranchQueryParams = t.Object({
  id: t.String({
    format: "uuid",
    description: "Branch id",
  }),
});
