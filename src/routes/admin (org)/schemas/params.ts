// patch, post

import { t } from "elysia";

export const organizationSelectParams = t.Object({
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Organization slug",
      examples: ["omaro-llc"],
    }),
  ),
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Organization id",
      examples: ["omaro-llc"],
    }),
  ),
});
