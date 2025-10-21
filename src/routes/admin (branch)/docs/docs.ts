import { DocumentDecoration } from "elysia";

export const adminListBranchesDoc: DocumentDecoration = {
  summary: "list branches",
  description: "List all branches",
  operationId: "adminListBranches",
};

export const adminCreateBranchDoc: DocumentDecoration = {
  summary: "add branch",
  description: "Add new branch",
  operationId: "adminAddBranch",
};

export const adminUpdateBranchDoc: DocumentDecoration = {
  summary: "update branch",
  description: "Update branch details",
  operationId: "adminUpdateBranch",
};

export const adminDeleteBranchDoc: DocumentDecoration = {
  summary: "delete branch",
  description: "Delete branch and all of its related children",
  operationId: "adminDeleteBranch",
};

export const adminShowBranchDoc: DocumentDecoration = {
  summary: "show branch",
  description: "Show branch details",
  operationId: "adminShowBranch",
};

export const adminAddMemberToBranchDoc: DocumentDecoration = {
  summary: "add member to branch",
  description: "Add a user as a member to a branch",
  operationId: "adminAddMemberToBranch",
};

export const adminRemoveMemberFromBranchDoc: DocumentDecoration = {
  summary: "remove member from branch",
  description: "Remove a user from a branch",
  operationId: "adminRemoveMemberFromBranch",
};

export const adminListBranchMembersDoc: DocumentDecoration = {
  summary: "list branch members",
  description: "List all members inside branch",
  operationId: "adminListBranchMembers",
};
