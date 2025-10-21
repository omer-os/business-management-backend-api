import db from "@src/utils/db";
import { Static } from "elysia";
import {
  createOrganizationBody,
  updateOrganizationBody,
} from "./schemas/request-body";
import ApiError from "@src/utils/global-error";
import {
  adminListOrgsQueryParamsSchema,
  organizationSelectQueryParams,
} from "./schemas/query-params";

export const adminListAllOrgsService = async (
  params: Static<typeof adminListOrgsQueryParamsSchema>,
) => {
  const orgs = await db.organization.findMany({
    where: {
      id: params.id,
      slug: params.slug,

      name: params.name
        ? {
            contains: params.name,
            mode: "insensitive",
          }
        : undefined,
    },
  });

  return {
    success: true,
    message: "All organizations listed successfully",
    data: orgs,
  };
};
export const admincreateOrgService = async (
  body: Static<typeof createOrganizationBody>,
  userId: string | undefined,
) => {
  const { includeMeAsMember, ...orgArgs } = body;
  // first check if organization with this slug exists
  const check = await db.organization.findUnique({
    where: {
      slug: body.slug,
    },
  });
  if (check?.id)
    throw new ApiError("Organization with this slug already exists");

  const newOrg = await db.organization.create({
    data: orgArgs,
  });

  if (!newOrg?.id)
    throw new ApiError("Issue happened while trying to add this organization.");

  // check if we wanted our account to be member inside this organization
  if (body.includeMeAsMember && userId) {
    // we need to create a branch then create membership with our account inside
    const branch = await db.branch.create({
      data: {
        name: newOrg.name,
        slug: newOrg.slug,
        organizationId: newOrg.id,
        userAccess: {
          create: {
            userId: userId,
          },
        },
      },
    });
    if (!branch?.id)
      throw new ApiError(
        "Issue happened while trying to add branch inside this organization.",
      );
  }

  return {
    success: true,
    message: "Created new organization successfully",
    data: newOrg,
  };
};

export const adminUpdateOrgService = async (
  params: Static<typeof organizationSelectQueryParams>,
  body: Static<typeof updateOrganizationBody>,
) => {
  // check if the organization actually exists
  const org = await db.organization.findUnique({
    where: {
      slug: params.slug,
      id: params.id,
    },
  });

  if (!org?.id)
    throw new ApiError("Organization with this slug/id doesnt exist.");

  // we need to first check if theres other organization with this provided slug so we dont have two organizations with same slug
  if (body.slug) {
    const existingSlugOrg = await db.organization.findUnique({
      where: {
        slug: body.slug,
      },
    });

    if (existingSlugOrg && existingSlugOrg.id !== org.id) {
      throw new ApiError("Organization with this slug already exists");
    }
  }

  const updating = await db.organization.update({
    where: {
      id: org.id,
    },
    data: body,
  });
  if (!updating?.id)
    throw new ApiError("Issue happened while trying to update organization.");

  return {
    success: true,
    message: "Organization updated successfully.",
    data: updating,
  };
};

export const adminDeleteOrgService = async (
  params: Static<typeof organizationSelectQueryParams>,
) => {
  // check if the organization actually exists
  const org = await db.organization.findFirst({
    where: {
      slug: params.slug,
      id: params.id,
    },
  });
  if (!org?.id)
    throw new ApiError("Organization with this slug/id doesnt exist.");

  const deleting = await db.organization.delete({
    where: {
      id: org.id,
    },
  });
  if (!deleting?.id)
    throw new ApiError("Issue happened while trying to update organization.");

  return {
    success: true,
    message: "Organization deleted successfully.",
    data: null,
  };
};

export const adminShowOrgService = async (
  params: Static<typeof organizationSelectQueryParams>,
) => {
  // check if the organization actually exists
  const org = await db.organization.findFirst({
    where: {
      slug: params.slug,
      id: params.id,
    },
  });
  if (!org?.id)
    throw new ApiError("Organization with this slug/id doesnt exist.");

  return {
    success: true,
    message: "Organization details fetched successfully.",
    data: org,
  };
};

export const adminListOrgBranchesService = async (
  params: Static<typeof organizationSelectQueryParams>,
) => {
  // check if the organization actually exists
  const org = await db.organization.findFirst({
    where: {
      slug: params.slug,
      id: params.id,
    },
  });
  if (!org?.id)
    throw new ApiError("Organization with this slug/id doesnt exist.");

  // now get list of branches connected to this organization
  const branches = await db.branch.findMany({
    where: {
      organization: {
        slug: params.slug,
        id: params.id,
      },
    },
  });
  if (!branches)
    throw new ApiError(
      "Error happened while trying to fetch branches for this organization.",
    );

  return {
    success: true,
    message: "Organization branches listed successfully.",
    data: branches,
  };
};

export const adminListOrgMembersService = async (
  params: Static<typeof organizationSelectQueryParams>,
) => {
  // check if the organization actually exists
  const org = await db.organization.findFirst({
    where: {
      slug: params.slug,
      id: params.id,
    },
  });
  if (!org?.id)
    throw new ApiError("Organization with this slug/id doesnt exist.");

  // now get list of branches connected to this organization
  const members = await db.branchMembership.findMany({
    where: {
      branch: {
        organization: {
          slug: params.slug,
          id: params.id,
        },
      },
    },
    include: {
      user: true,
    },
  });
  if (!members)
    throw new ApiError(
      "Error happened while trying to fetch members for this organization.",
    );

  return {
    success: true,
    message: "Organization members listed successfully.",
    data: members.map((i) => ({
      ...i,
      user: {
        ...i.user,
        password: undefined,
      },
    })),
  };
};
