import { DocumentDecoration } from "elysia";

export const adminListOrgsDoc: DocumentDecoration = {
  summary: "list organization",
  description: "List all rganizations",
  operationId: "adminListOrgs",
};

export const adminCreateOrgDoc: DocumentDecoration = {
  summary: "add organization",
  description: "Add new organization",
  operationId: "adminAddOrg",
};

export const adminUpdateOrgDoc: DocumentDecoration = {
  summary: "update organization",
  description: "Update organization details",
  operationId: "adminUpdateOrg",
};

export const adminDeleteOrgDoc: DocumentDecoration = {
  summary: "delete organization",
  description: "Delete organization and all of its related children/",
  operationId: "adminDeleteOrg",
};

export const adminShowOrgDoc: DocumentDecoration = {
  summary: "show organization",
  description: "Show organization details",
  operationId: "adminShowOrg",
};

export const adminListOrgBranchesDoc: DocumentDecoration = {
  summary: "list organization branches",
  description: "List all branches inside organization.",
  operationId: "adminListOrgBranches",
};

export const adminListOrgMembersDoc: DocumentDecoration = {
  summary: "list organization members",
  description: "List all members inside organization.",
  operationId: "adminListOrgMembers",
};
