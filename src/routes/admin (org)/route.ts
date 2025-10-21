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

export const adminOrgRoutes = new Elysia({ prefix: "/admin/org" })
  .post("/", () => {}, {
    detail: adminListOrgsDoc,
  })
  .get("/", () => {}, {
    body: createOrganizationBody,
    params: organizationSelectParams,
    detail: adminCreateOrgDoc,
  })
  .patch("/", () => {}, {
    body: updateOrganizationBody,
    params: organizationSelectParams,
    detail: adminUpdateOrgDoc,
  })
  .delete("/", () => {}, {
    params: organizationSelectParams,
    detail: adminDeleteOrgDoc,
  })
  .get("/show", () => {}, {
    params: organizationSelectParams,
    detail: adminShowOrgDoc,
  })
  .get("/branches", () => {}, {
    params: organizationSelectParams,
    detail: adminListOrgBranchesDoc,
  })
  .get("/members", () => {}, {
    params: organizationSelectParams,
    detail: adminListOrgMembersDoc,
  });
