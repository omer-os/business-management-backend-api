import Elysia from "elysia";
import {
  createOrganizationBody,
  updateOrganizationBody,
} from "./schemas/request-body";
import { organizationSelectParams } from "./schemas/params";
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
import { admincreateOrgService, adminListAllOrgsService } from "./service";

export const adminOrgRoutes = new Elysia({
  prefix: "/admin/org",
  tags: ["admin (Org)"],
})
  .use(adminCheckPlugin)
  .get(
    "/",
    async ({ user }) => {
      return await adminListAllOrgsService();
    },
    {
      detail: adminListOrgsDoc,
      response: Response(adminListOrgsResponse),
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
  .patch("/", () => {}, {
    body: updateOrganizationBody,
    params: organizationSelectParams,
    detail: adminUpdateOrgDoc,
    response: Response(adminUpdateOrgResponse),
  })
  .delete("/", () => {}, {
    params: organizationSelectParams,
    detail: adminDeleteOrgDoc,
    response: Response(adminDeleteOrgResponse),
  })
  .get("/show", () => {}, {
    params: organizationSelectParams,
    detail: adminShowOrgDoc,
    response: Response(adminShowOrgResponse),
  })
  .get("/branches", () => {}, {
    params: organizationSelectParams,
    detail: adminListOrgBranchesResponse,
  })
  .get("/members", () => {}, {
    params: organizationSelectParams,
    detail: adminListOrgMembersDoc,
    response: Response(adminListOrgMembersResponse),
  });
