// patch, post

import { t } from "elysia";

export const organizationSelectQueryParams = t.Object({
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Organization slug",
    }),
  ),
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Organization id",
    }),
  ),
});

export const adminListOrgsQueryParamsSchema = t.Object({
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Organization slug",
    }),
  ),
  name: t.Optional(
    t.String({
      description: "Organization name",
    }),
  ),
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Organization id",
    }),
  ),
});
