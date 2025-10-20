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
import { jwt } from "@elysiajs/jwt";
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
import { UserRole } from "prisma/prismabox/UserRole";
import ApiError from "@src/utils/global-error";

export const authRoutes = new Elysia({
  prefix: "/auth",
  tags: ["auth"],
  cookie: {
    maxAge: 10,
    secure: true,
    httpOnly: true,
  },
})
  .use(
    jwt({
      name: "jwt",
      secret: Bun.env.JWT_SECERET!,
      schema: t.Object({
        sub: t.String(),
        role: UserRole,
      }),
      exp: "1h",
    }),
  )
  .use(
    jwt({
      name: "refreshJwt",
      secret: Bun.env.JWT_SECERET!,
      schema: t.Object({
        sub: t.String(),
        role: UserRole,
      }),
      exp: 5,
    }),
  )
  .post(
    "/sign-in",
    async ({
      body,
      jwt,
      refreshJwt,
      cookie: { accessToken, refreshToken },
    }) => {
      const user = await signin(body);

      const payload = { sub: user.data.id, role: user.data.role };

      const signedAccessToken = await jwt.sign(payload);
      if (!signedAccessToken)
        throw new ApiError("Error while trying to sign access token");

      const signedRefreshToken = await refreshJwt.sign(payload);
      if (!signedRefreshToken)
        throw new ApiError("Error while trying to sign refresh token");

      accessToken.set({
        value: signedAccessToken.toString(),
      });
      refreshToken.set({
        value: signedRefreshToken.toString(),
      });

      return user;
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
    async ({ cookie: { accessToken, refreshToken } }) => {
      return await signout(accessToken, refreshToken);
    },
    {
      detail: signoutDocs,
      response: Response(signoutResponse),
    },
  )
  .get(
    "/refresh-tokens",
    async ({ jwt, refreshJwt, cookie: { accessToken, refreshToken } }) => {
      // const token = refreshToken.value;
      // if (!token) throw new ApiError("Refresh token missing", 401);

      // const payload = await refreshJwt.verify(token);
      // if (!payload) throw new ApiError("Invalid or expired refresh token", 401);

      // const newAccessPayload = { sub: payload.sub, role: payload.role };
      // const newRefreshPayload = { sub: payload.sub, role: payload.role };

      // const newSignedAccessToken = await jwt.sign(newAccessPayload);
      // if (!newSignedAccessToken)
      //   throw new ApiError("Error while trying to sign new access token");

      // const newSignedRefreshToken = await refreshJwt.sign(newRefreshPayload);
      // if (!newSignedRefreshToken)
      //   throw new ApiError("Error while trying to sign new refresh token");

      // accessToken.set({ value: newSignedAccessToken.toString() });
      // refreshToken.set({ value: newSignedRefreshToken.toString() });

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
