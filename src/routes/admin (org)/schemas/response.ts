import { t } from "elysia";
import { BranchPlain } from "prisma/prismabox/Branch";
import { BranchMembershipPlain } from "prisma/prismabox/BranchMembership";
import { OrganizationPlain } from "prisma/prismabox/Organization";
import { UserPlain } from "prisma/prismabox/User";

export const adminListOrgsResponse = t.Array(OrganizationPlain);
export const adminCreateOrgResponse = OrganizationPlain;
export const adminUpdateOrgResponse = OrganizationPlain;
export const adminDeleteOrgResponse = t.Null();
export const adminShowOrgResponse = OrganizationPlain;
export const adminListOrgBranchesResponse = t.Array(BranchPlain);
export const adminListOrgMembersResponse = t.Array(
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
