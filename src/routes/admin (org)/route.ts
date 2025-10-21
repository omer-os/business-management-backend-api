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

export const adminOrgRoutes = new Elysia({
  prefix: "/admin/org",
  tags: ["admin (Org)"],
})
  .get("/", () => {}, {
    detail: adminListOrgsDoc,
    response: adminListOrgsResponse,
  })
  .post("/", () => {}, {
    body: createOrganizationBody,
    params: organizationSelectParams,
    detail: adminCreateOrgDoc,
    response: adminCreateOrgResponse,
  })
  .patch("/", () => {}, {
    body: updateOrganizationBody,
    params: organizationSelectParams,
    detail: adminUpdateOrgDoc,
    response: adminUpdateOrgResponse,
  })
  .delete("/", () => {}, {
    params: organizationSelectParams,
    detail: adminDeleteOrgDoc,
    response: adminDeleteOrgResponse,
  })
  .get("/show", () => {}, {
    params: organizationSelectParams,
    detail: adminShowOrgDoc,
    response: adminShowOrgResponse,
  })
  .get("/branches", () => {}, {
    params: organizationSelectParams,
    detail: adminListOrgBranchesResponse,
  })
  .get("/members", () => {}, {
    params: organizationSelectParams,
    detail: adminListOrgMembersDoc,
    response: adminListOrgMembersResponse,
  });
