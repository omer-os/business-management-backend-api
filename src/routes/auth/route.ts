import Elysia, { t } from "elysia";
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
import Response from "@src/utils/global-response";
import {
  signinResponse,
  signupResponse,
  signoutResponse,
  refreshTokensResponse,
  switchOrgResponse,
  switchBranchResponse,
  listBranchesResponse,
  listOrgsResponse,
  getMeResponse,
} from "./schemas/response";

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
      response: Response(signinResponse),
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
      response: Response(signupResponse),
    },
  )
  .get(
    "/sign-out",
    async () => {
      return await signout();
    },
    {
      detail: signoutDocs,
      response: Response(signoutResponse),
    },
  )
  .get(
    "/refresh-tokens",
    async () => {
      return await refreshTokens();
    },
    {
      detail: refreshDocs,
      response: Response(refreshTokensResponse),
    },
  )
  .get(
    "/me",
    async () => {
      return await me();
    },
    {
      detail: meDocs,
      response: Response(getMeResponse),
    },
  )
  .post(
    "/switch-org",
    async ({ body }) => {
      return await switchOrg(body);
    },
    {
      detail: switchOrgDocs,
      body: switchOrgBody,
      response: Response(switchOrgResponse),
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
      response: Response(switchBranchResponse),
    },
  )
  .get(
    "/branches",
    async () => {
      return await getBranches();
    },
    {
      detail: branchesDocs,
      response: Response(listBranchesResponse),
    },
  )
  .get(
    "/orgs",
    async () => {
      return await getOrgs();
    },
    {
      detail: orgsDocs,
      response: Response(listOrgsResponse),
    },
  );
