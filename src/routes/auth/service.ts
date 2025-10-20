// src/routes/auth/service.ts
import { Static } from "elysia";
import {
  signinBody,
  signupBody,
  switchOrgBody,
  switchBranchBody,
} from "./schemas/request-body";
import Response from "@src/utils/global-response";
import { signinResponse } from "./schemas/response";

export const signup = async (data: Static<typeof signupBody>) => {
  return {
    success: true,
    message: "",
    data: {
      email: "s",
      id: "s",
      name: "s",
    },
  };
};

export const signin = async (data: Static<typeof signinBody>) => {
  throw Error("something bad happened");

  return {
    success: true,
    message: "",
    data: {
      email: "s",
      id: "s",
      name: "s",
    },
  };
};

export const signout = async () => {};

export const refreshTokens = async () => {};

export const me = async () => {};

export const switchOrg = async (data: Static<typeof switchOrgBody>) => {};

export const switchBranch = async (data: Static<typeof switchBranchBody>) => {};

export const getBranches = async () => {};

export const getOrgs = async () => {};
