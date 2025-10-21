import { t } from "elysia";
import { BranchPlain } from "prisma/prismabox/Branch";
import { BranchMembershipPlain } from "prisma/prismabox/BranchMembership";
import { OrganizationPlain } from "prisma/prismabox/Organization";

export const adminListBranchesResponse = t.Array(
  t.Object({
    ...BranchPlain.properties,
    organization: OrganizationPlain,
  }),
);

export const adminCreateBranchResponse = t.Object({
  ...BranchPlain.properties,
  organization: OrganizationPlain,
});

export const adminUpdateBranchResponse = t.Object({
  ...BranchPlain.properties,
  organization: OrganizationPlain,
});

export const adminDeleteBranchResponse = t.Null();

export const adminShowBranchResponse = t.Object({
  ...BranchPlain.properties,
  organization: OrganizationPlain,
});

export const adminAddMemberToBranchResponse = t.Object({
  ...BranchMembershipPlain.properties,
  user: t.Object({
    id: t.String(),
    name: t.String(),
    email: t.String(),
    role: t.Union([t.Literal("Admin"), t.Literal("User")], {
      additionalProperties: false,
    }),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  }),
  branch: t.Object({
    ...BranchPlain.properties,
    organization: OrganizationPlain,
  }),
});

export const adminRemoveMemberFromBranchResponse = t.Null();

export const adminListBranchMembersResponse = t.Array(
  t.Object({
    ...BranchMembershipPlain.properties,
    user: t.Object({
      id: t.String(),
      name: t.String(),
      email: t.String(),
      role: t.Union([t.Literal("Admin"), t.Literal("User")], {
        additionalProperties: false,
      }),
      createdAt: t.Date(),
      updatedAt: t.Date(),
    }),
  }),
);