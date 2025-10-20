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

export const refreshTokens = async () => {};

export const me = async () => {};

export const switchOrg = async (data: Static<typeof switchOrgBody>) => {};

export const switchBranch = async (data: Static<typeof switchBranchBody>) => {};

export const getBranches = async () => {};

export const getOrgs = async () => {};
