// patch, post

import { t } from "elysia";

export const createOrganizationBody = t.Object({
  name: t.String({
    minLength: 2,
    maxLength: 50,
    description: "Organization Name",
    examples: ["omaro-llc"],
  }),
  slug: t.String({
    format: "uri-reference",
    description: "Organization slug",
    examples: ["omaro-llc"],
  }),
  includeMeAsMember: t.Boolean({
    default: false,
    description:"Option to include my account as member of this organization" 
  }),
});

export const updateOrganizationBody = t.Object({
  name: t.Optional(
    t.String({
      minLength: 2,
      maxLength: 50,
      description: "Organization Name",
      examples: ["omaro-llc"],
    }),
  ),
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Organization slug",
      examples: ["omaro-llc"],
    }),
  ),
});
