import db from "@src/utils/db";
import { Static } from "elysia";
import {
  createBranchBody,
  updateBranchBody,
  addMemberToBranchBody,
} from "./schemas/request-body";
import ApiError from "@src/utils/global-error";
import {
  adminDeleteBranchQueryParams,
  adminListBranchesQueryParamsSchema,
  branchSelectQueryParams,
} from "./schemas/query-params";

export const adminListAllBranchesService = async (
  params: Static<typeof adminListBranchesQueryParamsSchema>,
) => {
  const branches = await db.branch.findMany({
    where: {
      id: params.id,
      slug: params.slug,
      organizationId: params.organizationId,
      name: params.name
        ? {
            contains: params.name,
            mode: "insensitive",
          }
        : undefined,
    },
    include: {
      organization: true,
    },
  });

  return {
    success: true,
    message: "All branches listed successfully",
    data: branches,
  };
};

export const adminCreateBranchService = async (
  body: Static<typeof createBranchBody>,
) => {
  // Check if branch with this slug exists in the organization
  const check = await db.branch.findUnique({
    where: {
      slug: body.slug,
      organization: {
        slug: body.organizationSlug,
      },
    },
  });
  console.log("check --->", check);
  if (check?.id)
    throw new ApiError("Branch with this slug already exists in organization");

  // Verify organization exists
  const org = await db.organization.findUnique({
    where: { slug: body.organizationSlug },
  });
  if (!org?.id) throw new ApiError("Organization not found");

  const newBranch = await db.branch.create({
    data: {
      name: body.name,
      slug: body.slug,
      organizationId: org.id,
    },
    include: {
      organization: true,
    },
  });

  if (!newBranch?.id)
    throw new ApiError("Issue happened while trying to add this branch.");

  return {
    success: true,
    message: "Created new branch successfully",
    data: newBranch,
  };
};

export const adminUpdateBranchService = async (
  params: Static<typeof branchSelectQueryParams>,
  body: Static<typeof updateBranchBody>,
) => {
  const branch = await db.branch.findFirst({
    where: {
      slug: params.slug,
      id: params.id,
    },
  });

  if (!branch?.id) throw new ApiError("Branch with this slug/id doesnt exist.");

  // Check slug uniqueness within organization if updating slug
  if (body.slug) {
    const existingSlugBranch = await db.branch.findUnique({
      where: {
        organizationId_slug: {
          organizationId: branch.organizationId,
          slug: body.slug,
        },
      },
    });

    if (existingSlugBranch && existingSlugBranch.id !== branch.id) {
      throw new ApiError(
        "Branch with this slug already exists in organization",
      );
    }
  }

  const updating = await db.branch.update({
    where: { id: branch.id },
    data: body,
    include: {
      organization: true,
    },
  });

  if (!updating?.id)
    throw new ApiError("Issue happened while trying to update branch.");

  return {
    success: true,
    message: "Branch updated successfully.",
    data: updating,
  };
};

export const adminDeleteBranchService = async (
  params: Static<typeof adminDeleteBranchQueryParams>,
) => {
  // check if this branch really exists
  const branch = await db.branch.findFirst({
    where: {
      id: params.id,
    },
  });
  if (!branch?.id) throw new ApiError("Branch with this slug/id doesnt exist.");

  const deleting = await db.branch.delete({
    where: { id: branch.id },
  });
  if (!deleting?.id)
    throw new ApiError("Issue happened while trying to delete branch.");

  return {
    success: true,
    message: "Branch deleted successfully.",
    data: null,
  };
};

export const adminShowBranchService = async (
  params: Static<typeof branchSelectQueryParams>,
) => {
  // if the params not given return error
  if (!params.id && !params.slug)
    throw new ApiError("please provide id or slug of the branch.");

  const branch = await db.branch.findFirst({
    where: {
      slug: params.slug,
      id: params.id,
    },
    include: {
      organization: true,
    },
  });
  if (!branch?.id) throw new ApiError("Branch with this slug/id doesnt exist.");

  return {
    success: true,
    message: "Branch details fetched successfully.",
    data: branch,
  };
};

export const adminAddMemberToBranchService = async (
  body: Static<typeof addMemberToBranchBody>,
) => {
  // Verify user exists
  const user = await db.user.findUnique({
    where: { id: body.userId },
  });
  if (!user?.id) throw new ApiError("User not found");

  // Verify branch exists
  const branch = await db.branch.findUnique({
    where: { id: body.branchId },
  });
  if (!branch?.id) throw new ApiError("Branch not found");

  // Check if membership already exists
  const existing = await db.branchMembership.findUnique({
    where: {
      userId_branchId: {
        userId: body.userId,
        branchId: body.branchId,
      },
    },
  });
  if (existing?.id)
    throw new ApiError("User is already a member of this branch");

  const membership = await db.branchMembership.create({
    data: {
      userId: body.userId,
      branchId: body.branchId,
    },
    include: {
      user: true,
      branch: {
        include: {
          organization: true,
        },
      },
    },
  });

  if (!membership?.id)
    throw new ApiError("Issue happened while adding member to branch.");

  return {
    success: true,
    message: "Member added to branch successfully.",
    data: {
      ...membership,
      user: {
        ...membership.user,
        password: undefined,
      },
    },
  };
};

export const adminRemoveMemberFromBranchService = async (
  body: Static<typeof addMemberToBranchBody>,
) => {
  const membership = await db.branchMembership.findUnique({
    where: {
      userId_branchId: {
        userId: body.userId,
        branchId: body.branchId,
      },
    },
  });

  if (!membership?.id)
    throw new ApiError("User is not a member of this branch");

  const deleting = await db.branchMembership.delete({
    where: { id: membership.id },
  });

  if (!deleting?.id)
    throw new ApiError("Issue happened while removing member from branch.");

  return {
    success: true,
    message: "Member removed from branch successfully.",
    data: null,
  };
};

export const adminListBranchMembersService = async (
  params: Static<typeof branchSelectQueryParams>,
) => {
  const branch = await db.branch.findFirst({
    where: {
      slug: params.slug,
      id: params.id,
    },
  });
  if (!branch?.id) throw new ApiError("Branch with this slug/id doesnt exist.");

  const members = await db.branchMembership.findMany({
    where: {
      branchId: branch.id,
    },
    include: {
      user: true,
    },
  });

  if (!members)
    throw new ApiError(
      "Error happened while trying to fetch members for this branch.",
    );

  return {
    success: true,
    message: "Branch members listed successfully.",
    data: members.map((i) => ({
      ...i,
      user: {
        ...i.user,
        password: undefined,
      },
    })),
  };
};
