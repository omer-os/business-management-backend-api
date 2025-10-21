import { t } from "elysia";
import { BranchPlain } from "prisma/prismabox/Branch";
import { BranchMembershipPlain } from "prisma/prismabox/BranchMembership";
import { OrganizationPlain } from "prisma/prismabox/Organization";

export const adminListOrgsResponse = t.Array(OrganizationPlain);
export const adminCreateOrgResponse = OrganizationPlain;
export const adminUpdateOrgResponse = OrganizationPlain;
export const adminDeleteOrgResponse = t.Null();
export const adminShowOrgResponse = OrganizationPlain;
export const adminListOrgBranchesResponse = t.Array(BranchPlain);
export const adminListOrgMembersResponse = t.Array(BranchMembershipPlain);
