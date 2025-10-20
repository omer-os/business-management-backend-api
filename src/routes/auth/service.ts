// src/routes/auth/service.ts
import { Static } from "elysia";
import {
  signinBody,
  signupBody,
  switchOrgBody,
  switchBranchBody,
} from "./schemas/request-body";

export const signup = async (data: Static<typeof signupBody>) => {};

export const signin = async (data: Static<typeof signinBody>) => {};

export const signout = async () => {};

export const refreshTokens = async () => {};

export const me = async () => {};

export const switchOrg = async (data: Static<typeof switchOrgBody>) => {};

export const switchBranch = async (data: Static<typeof switchBranchBody>) => {};

export const getBranches = async () => {};

export const getOrgs = async () => {};
