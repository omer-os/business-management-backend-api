import Elysia from "elysia";
import {
  signinDocs,
  signupDocs,
  signoutDocs,
  refreshDocs,
  meDocs,
  switchOrgDocs,
  switchBranchDocs,
  branchesDocs,
  orgsDocs,
} from "./docs/docs";
import {
  signinBody,
  signupBody,
  switchBranchBody,
  switchOrgBody,
} from "./schemas/request-body";
import {
  getBranches,
  getOrgs,
  me,
  refreshTokens,
  signin,
  signout,
  signup,
  switchBranch,
  switchOrg,
} from "./service";

export const authRoutes = new Elysia({
  prefix: "/auth",
  tags: ["auth"],
})
  .post(
    "/sign-in",
    async ({ body }) => {
      return await signin(body);
    },
    {
      detail: signinDocs,
      body: signinBody,
    },
  )
  .post(
    "/sign-up",
    async ({ body }) => {
      return await signup(body);
    },
    {
      detail: signupDocs,
      body: signupBody,
    },
  )
  .get(
    "/sign-out",
    async ({ body }) => {
      return await signout();
    },
    { detail: signoutDocs },
  )
  .get(
    "/refresh-tokens",
    async ({ body }) => {
      return await refreshTokens();
    },
    { detail: refreshDocs },
  )
  .get(
    "/me",
    async ({ body }) => {
      return await me();
    },
    { detail: meDocs },
  )
  .post(
    "/switch-org",
    async ({ body }) => {
      return await switchOrg(body);
    },
    {
      detail: switchOrgDocs,
      body: switchOrgBody,
    },
  )
  .post(
    "/switch-branch",
    async ({ body }) => {
      return await switchBranch(body);
    },
    {
      detail: switchBranchDocs,
      body: switchBranchBody,
    },
  )
  .get(
    "/branches",
    async ({ body }) => {
      return await getBranches();
    },
    { detail: branchesDocs },
  )
  .get(
    "/orgs",
    async ({ body }) => {
      return await getOrgs();
    },
    { detail: orgsDocs },
  );
