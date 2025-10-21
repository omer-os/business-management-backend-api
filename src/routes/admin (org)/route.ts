import Elysia from "elysia";
import {
  createOrganizationBody,
  updateOrganizationBody,
} from "./schemas/request-body";
import { adminListOrgsQueryParamsSchema, organizationSelectQueryParams } from "./schemas/query-params";
import {
  adminCreateOrgDoc,
  adminDeleteOrgDoc,
  adminListOrgBranchesDoc,
  adminListOrgMembersDoc,
  adminListOrgsDoc,
  adminShowOrgDoc,
  adminUpdateOrgDoc,
} from "./docs/docs";
import Response from "@src/utils/global-response";
import {
  adminCreateOrgResponse,
  adminDeleteOrgResponse,
  adminListOrgBranchesResponse,
  adminListOrgMembersResponse,
  adminListOrgsResponse,
  adminShowOrgResponse,
  adminUpdateOrgResponse,
} from "./schemas/response";
import { adminCheckPlugin } from "@src/plugins/auth-plugin";
import {
  admincreateOrgService,
  adminDeleteOrgService,
  adminListAllOrgsService,
  adminListOrgBranchesService,
  adminListOrgMembersService,
  adminShowOrgService,
  adminUpdateOrgService,
} from "./service";

export const adminOrgRoutes = new Elysia({
  prefix: "/admin/org",
  tags: ["admin (Org)"],
})
  .use(adminCheckPlugin)
  .get(
    "/",
    async ({ user, query }) => {
      return await adminListAllOrgsService(query);
    },
    {
      detail: adminListOrgsDoc,
      response: Response(adminListOrgsResponse),
      query: adminListOrgsQueryParamsSchema,
    },
  )
  .post(
    "/",
    async ({ body, user }) => {
      return await admincreateOrgService(body, user?.id);
    },
    {
      body: createOrganizationBody,
      detail: adminCreateOrgDoc,
      response: Response(adminCreateOrgResponse),
    },
  )
  .patch(
    "/",
    async ({ body, query }) => {
      return await adminUpdateOrgService(query, body);
    },
    {
      body: updateOrganizationBody,
      query: organizationSelectQueryParams,
      detail: adminUpdateOrgDoc,
      response: Response(adminUpdateOrgResponse),
    },
  )
  .delete(
    "/",
    async ({ query }) => {
      return await adminDeleteOrgService(query);
    },
    {
      query: organizationSelectQueryParams,
      detail: adminDeleteOrgDoc,
      response: Response(adminDeleteOrgResponse),
    },
  )
  .get(
    "/show",
    async ({ query }) => {
      return await adminShowOrgService(query);
    },
    {
      query: organizationSelectQueryParams,
      detail: adminShowOrgDoc,
      response: Response(adminShowOrgResponse),
    },
  )
  .get(
    "/branches",
    async ({ query }) => {
      return await adminListOrgBranchesService(query);
    },
    {
      query: organizationSelectQueryParams,
      detail: adminListOrgBranchesDoc,
      response: Response(adminListOrgBranchesResponse),
    },
  )
  .get(
    "/members",
    async ({ query }) => {
      return await adminListOrgMembersService(query);
    },
    {
      query: organizationSelectQueryParams,
      detail: adminListOrgMembersDoc,
      response: Response(adminListOrgMembersResponse),
    },
  );
