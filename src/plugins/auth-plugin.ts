import jwt from "@elysiajs/jwt";
import db from "@src/utils/db";
import ApiError from "@src/utils/global-error";
import Elysia, { t } from "elysia";
import { UserRole } from "prisma/prismabox/UserRole";

export const authPlugin = async (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: Bun.env.JWT_SECRET!,
        schema: t.Object({
          sub: t.String(),
          role: UserRole,
          selectedOrganizationSlug: t.Optional(t.String()),
          selectedBranchSlug: t.Optional(t.String()),
        }),
        exp: "1h",
      }),
    )
    .derive(async ({ jwt, cookie: { accessToken, refreshToken } }) => {
      // check if the user has accessToken
      if (!accessToken.value) throw new ApiError("Unautherized.");

      // check if the user is signed in
      const payload = await jwt.verify(accessToken.value.toString());
      if (!payload) throw new ApiError("Unautherized");

      const { sub, selectedOrganizationSlug, selectedBranchSlug } = payload;

      // get the user
      const user = await db.user.findUnique({
        where: { id: sub },
      });

      if (!user?.id)
        throw new ApiError("User Doesnt Exists, Unautherized call");

      return {
        user: { ...user, selectedOrganizationSlug, selectedBranchSlug },
      };
    });

export const adminCheckPlugin = (app: Elysia) =>
  app.use(authPlugin).derive(async ({ user }) => {
    if (!user?.id) throw new ApiError("Unautherized.");

    if (user.role !== "Admin") throw new ApiError("Unautherized call.");
  });

export const businessPlugin = async (app: Elysia) =>
  app.use(authPlugin).derive(async ({ user }) => {
    if (!user?.id) throw new ApiError("User Doesnt Exists, Unautherized call");

    if (!user.selectedBranchSlug)
      throw new ApiError("Please select branch first.");
  });
