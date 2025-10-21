import Elysia from "elysia";
import {
  createBranchBody,
  updateBranchBody,
  addMemberToBranchBody,
} from "./schemas/request-body";
import {
  adminDeleteBranchQueryParams,
  adminListBranchesQueryParamsSchema,
  branchSelectQueryParams,
} from "./schemas/query-params";
import {
  adminCreateBranchDoc,
  adminDeleteBranchDoc,
  adminListBranchesDoc,
  adminShowBranchDoc,
  adminUpdateBranchDoc,
  adminAddMemberToBranchDoc,
  adminRemoveMemberFromBranchDoc,
  adminListBranchMembersDoc,
} from "./docs/docs";
import Response from "@src/utils/global-response";
import {
  adminCreateBranchResponse,
  adminDeleteBranchResponse,
  adminListBranchesResponse,
  adminShowBranchResponse,
  adminUpdateBranchResponse,
  adminAddMemberToBranchResponse,
  adminRemoveMemberFromBranchResponse,
  adminListBranchMembersResponse,
} from "./schemas/response";
import { adminCheckPlugin } from "@src/plugins/auth-plugin";
import {
  adminCreateBranchService,
  adminDeleteBranchService,
  adminListAllBranchesService,
  adminShowBranchService,
  adminUpdateBranchService,
  adminAddMemberToBranchService,
  adminRemoveMemberFromBranchService,
  adminListBranchMembersService,
} from "./service";

export const adminBranchRoutes = new Elysia({
  prefix: "/admin/branch",
  tags: ["admin (Branch)"],
})
  .use(adminCheckPlugin)
  .get(
    "/",
    async ({ query }) => {
      return await adminListAllBranchesService(query);
    },
    {
      detail: adminListBranchesDoc,
      response: Response(adminListBranchesResponse),
      query: adminListBranchesQueryParamsSchema,
    },
  )
  .post(
    "/",
    async ({ body }) => {
      return await adminCreateBranchService(body);
    },
    {
      body: createBranchBody,
      detail: adminCreateBranchDoc,
      response: Response(adminCreateBranchResponse),
    },
  )
  .patch(
    "/",
    async ({ body, query }) => {
      return await adminUpdateBranchService(query, body);
    },
    {
      body: updateBranchBody,
      query: branchSelectQueryParams,
      detail: adminUpdateBranchDoc,
      response: Response(adminUpdateBranchResponse),
    },
  )
  .delete(
    "/",
    async ({ query }) => {
      return await adminDeleteBranchService(query);
    },
    {
      query: adminDeleteBranchQueryParams,
      detail: adminDeleteBranchDoc,
      response: Response(adminDeleteBranchResponse),
    },
  )
  .get(
    "/show",
    async ({ query }) => {
      return await adminShowBranchService(query);
    },
    {
      query: branchSelectQueryParams,
      detail: adminShowBranchDoc,
      response: Response(adminShowBranchResponse),
    },
  )
  .post(
    "/members",
    async ({ body }) => {
      return await adminAddMemberToBranchService(body);
    },
    {
      body: addMemberToBranchBody,
      detail: adminAddMemberToBranchDoc,
      response: Response(adminAddMemberToBranchResponse),
    },
  )
  .delete(
    "/members",
    async ({ body }) => {
      return await adminRemoveMemberFromBranchService(body);
    },
    {
      body: addMemberToBranchBody,
      detail: adminRemoveMemberFromBranchDoc,
      response: Response(adminRemoveMemberFromBranchResponse),
    },
  )
  .get(
    "/members",
    async ({ query }) => {
      return await adminListBranchMembersService(query);
    },
    {
      query: branchSelectQueryParams,
      detail: adminListBranchMembersDoc,
      response: Response(adminListBranchMembersResponse),
    },
  );
