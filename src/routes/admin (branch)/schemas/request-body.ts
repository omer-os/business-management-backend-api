import { t } from "elysia";

export const createBranchBody = t.Object({
  name: t.String({
    minLength: 2,
    maxLength: 50,
    description: "Branch Name",
    examples: ["Main Branch"],
  }),
  slug: t.String({
    format: "uri-reference",
    description: "Branch slug",
    examples: ["main-branch"],
  }),
  organizationSlug: t.String({
    format: "uri-reference",
    description: "Organization Slug",
  }),
});

export const updateBranchBody = t.Object({
  name: t.Optional(
    t.String({
      minLength: 2,
      maxLength: 50,
      description: "Branch Name",
      examples: ["Main Branch"],
    }),
  ),
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Branch slug",
      examples: ["main-branch"],
    }),
  ),
});

export const addMemberToBranchBody = t.Object({
  userId: t.String({
    format: "uuid",
    description: "User ID",
  }),
  branchId: t.String({
    format: "uuid",
    description: "Branch ID",
  }),
});