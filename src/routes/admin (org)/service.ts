import db from "@src/utils/db";
import { Static } from "elysia";
import { createOrganizationBody } from "./schemas/request-body";
import { organizationSelectParams } from "./schemas/params";
import ApiError from "@src/utils/global-error";

export const adminListAllOrgsService = async () => {
  const orgs = await db.organization.findMany();

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
  // first check if organization with this slug exists
  const check = await db.organization.findUnique({
    where: {
      slug: body.slug,
    },
  });
  if (check?.id)
    throw new ApiError("Organization with this slug already exists");

  const newOrg = await db.organization.create({
    data: {
      ...body,
    },
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
