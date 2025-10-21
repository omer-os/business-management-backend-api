import { t } from "elysia";
import { UserRole } from "@prisma/client";
import { BranchPlain } from "prisma/prismabox/Branch";
import { OrganizationPlain } from "prisma/prismabox/Organization";
import { UserPlain } from "prisma/prismabox/User";

const signinResponse = t.Object({
  id: t.String(),
  email: t.String(),
  name: t.String(),
  role: t.Enum({
    Admin: UserRole.Admin,
    User: UserRole.User,
  }),
});

const signupResponse = t.Object({
  id: t.String(),
  email: t.String(),
  name: t.String(),
  role: t.Enum({
    Admin: UserRole.Admin,
    User: UserRole.User,
  }),
});

const getMeResponse = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String(),
  role: t.Union([t.Literal("Admin"), t.Literal("User")], {
    additionalProperties: false,
  }),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  selectedOrganizationSlug: t.Optional(t.String()),
  selectedBranchSlug: t.Optional(t.String()),
});

const signoutResponse = t.Null();
const refreshTokensResponse = t.Null();
const switchOrgResponse = t.Null();
const switchBranchResponse = t.Null();
const listBranchesResponse = t.Array(BranchPlain);
const listOrgsResponse = t.Array(OrganizationPlain);

export {
  signinResponse,
  signoutResponse,
  refreshTokensResponse,
  switchOrgResponse,
  switchBranchResponse,
  listBranchesResponse,
  listOrgsResponse,
  getMeResponse,
  signupResponse,
};
