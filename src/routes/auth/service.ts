// src/routes/auth/service.ts
import { Static } from "elysia";
import {
  signinBody,
  signupBody,
  switchOrgBody,
  switchBranchBody,
} from "./schemas/request-body";
import Response from "@src/utils/global-response";
import db from "@src/utils/db";
import ApiError from "@src/utils/global-error";
import { ElysiaCookie, Cookie } from "elysia/dist/cookies";
import { $Enums, User } from "@prisma/client";

export const signup = async (data: Static<typeof signupBody>) => {
  const { email, name, password } = data;

  // check if the user already exists
  const user = await db.user.findUnique({
    where: { email },
  });
  if (user?.id) throw new ApiError("User Already Exists");

  // if user doesnt already exists then create new one
  const newUser = await db.user.create({
    data: {
      email,
      name,
      password: await Bun.password.hash(password),
    },
  });
  if (!newUser.id) throw new ApiError("Error while creating new user");

  return {
    success: true,
    message: "user created successfuly",
    data: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    },
  };
};

export const signin = async (data: Static<typeof signinBody>) => {
  const { email, password } = data;

  // check if the user exists
  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user?.id) throw new ApiError("Invalid credentials");

  // verify if the password is matching
  const verifyPassword = await Bun.password.verify(password, user.password);
  if (!verifyPassword) throw new ApiError("Invalid credentials");

  return {
    success: true,
    message: "Signed in successfully",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const signout = async (
  accessToken: Cookie<unknown>,
  refreshToken: Cookie<unknown>,
) => {
  accessToken.remove();
  refreshToken.remove();
  return {
    success: true,
    message: "Signed out successfully",
    data: null,
  };
};

export const refreshTokens = async () => {
  return {
    success: true,
    message: "Refreshed tokens successfully.",
    data: null,
  };
};

export const me = async (
  data:
    | {
        readonly selectedOrganizationSlug: string | undefined;
        readonly selectedBranchSlug: string | undefined;
        readonly name: string;
        readonly email: string;
        readonly password: string;
        readonly id: string;
        readonly role: $Enums.UserRole;
        readonly createdAt: Date;
        readonly updatedAt: Date;
      }
    | undefined,
) => {
  if (!data?.id) throw new ApiError("User Doesnt Exists, Unautherized call");

  return {
    success: true,
    message: "user details fetched successfully",
    data: {
      ...data,
      selectedOrganizationSlug: data.selectedOrganizationSlug,
      selectedBranchSlug: data.selectedBranchSlug,
    },
  };
};

export const userExistsInThisOrg = async (
  user: User | undefined,
  orgSlug: string,
) => {
  if (!user) throw new ApiError("User Doesnt Exists, Unautherized call");

  // check if user has membership inside org with this slug
  const membership = await db.branchMembership.findFirst({
    where: {
      userId: user.id,
      branch: {
        organization: {
          slug: orgSlug,
        },
      },
    },
    select: {
      id: true,
    },
  });

  if (!membership?.id)
    throw new ApiError("User dont have access to this organization.");
};

export const switchOrg = async (data: Static<typeof switchOrgBody>) => {
  return {
    success: true,
    message: "Organization selected successfully.",
    data: null,
  };
};

export const userExistsInThisBranch = async (
  user: User | undefined,
  branchSlug: string,
) => {
  if (!user) throw new ApiError("User Doesnt Exists, Unautherized call");

  // check if user has membership with this branch
  const membership = await db.branchMembership.findFirst({
    where: {
      userId: user.id,
      branch: {
        slug: branchSlug,
      },
    },
    select: {
      id: true,
    },
  });
  if (!membership?.id)
    throw new ApiError("User dont have access to this branch.");
};

export const switchBranch = async (data: Static<typeof switchBranchBody>) => {
  return {
    success: true,
    message: "Branch selected successfully.",
    data: null,
  };
};

export const getBranches = async (user: User | undefined) => {
  if (!user) throw new ApiError("User Doesnt Exists, Unautherized call");

  // get all branches that have this user inside it, then show these branches organizations, filter out duplications as well
  const membership = await db.branchMembership.findMany({
    where: {
      userId: user.id,
    },
    select: {
      branch: true,
    },
  });

  const branches = membership?.map((i) => i.branch);

  return {
    success: true,
    message: "Branches listed successfully",
    data: branches,
  };
};

export const getOrgs = async (user: User | undefined) => {
  if (!user) throw new ApiError("User Doesnt Exists, Unautherized call");

  // get all branches that have this user inside it, then show these branches organizations, filter out duplications as well
  const membership = await db.branchMembership.findMany({
    where: {
      userId: user.id,
    },
    select: {
      branch: {
        include: {
          organization: true,
        },
      },
    },
  });

  const orgs = membership?.map((i) => i.branch.organization);

  return {
    success: true,
    message: "Organizations listed successfully",
    data: orgs,
  };
};
