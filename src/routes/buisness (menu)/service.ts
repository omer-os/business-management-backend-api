import db from "@src/utils/db";
import { Static } from "elysia";

import {
  businessListMenusQueryParams,
  menuSelectQueryParams,
} from "./schemas/query-params";
import ApiError from "@src/utils/global-error";

export const businessListMenusService = async (
  branchSlug: string | undefined,
  params: Static<typeof businessListMenusQueryParams>,
) => {
  if (!branchSlug) throw new ApiError("Branch not selected");

  const menus = await db.menu.findMany({
    where: {
      id: params.id,
      Branch: {
        slug: branchSlug,
      },
    },
  });

  return {
    success: true,
    message: "Menus listed successfully",
    data: menus,
  };
};

export const businessShowMenuService = async (
  branchSlug: string | undefined,
  params: Static<typeof menuSelectQueryParams>,
) => {
  if (!branchSlug) throw new ApiError("Branch not selected");

  const menu = await db.menu.findFirst({
    where: {
      id: params.id,
      Branch: {
        slug: branchSlug,
      },
    },
  });

  if (!menu?.id) throw new ApiError("Menu not found in this branch");

  return {
    success: true,
    message: "Menu details fetched successfully",
    data: menu,
  };
};
export const businessCreateMenuService = async (
  branchSlug: string | undefined,
  body: Static<typeof businessCreateMenuSchema>,
) => {
  if (!branchSlug) throw new ApiError("Branch not selected");

  const branch = await db.branch.findUnique({
    where: { slug: branchSlug },
  });
  if (!branch?.id) throw new ApiError("Branch not found");

  const newMenu = await db.menu.create({
    data: {
      name: body.name,
      theme: body.theme || null,
      menuStructure: body.menuStructure || [],
      branchId: branch.id,
    },
  });

  if (!newMenu?.id) throw new ApiError("Issue happened while creating menu");

  return {
    success: true,
    message: "Menu created successfully",
    data: newMenu,
  };
};

export const businessUpdateMenuService = async (
  branchSlug: string | undefined,
  params: Static<typeof menuSelectQueryParams>,
  body: Static<typeof businessUpdateMenuSchema>,
) => {
  if (!branchSlug) throw new ApiError("Branch not selected");

  const menu = await db.menu.findFirst({
    where: {
      id: params.id,
      Branch: {
        slug: branchSlug,
      },
    },
  });

  if (!menu?.id) throw new ApiError("Menu not found in this branch");

  const updatedMenu = await db.menu.update({
    where: { id: menu.id },
    data: body,
  });

  if (!updatedMenu?.id)
    throw new ApiError("Issue happened while updating menu");

  return {
    success: true,
    message: "Menu updated successfully",
    data: updatedMenu,
  };
};

export const businessDeleteMenuService = async (
  branchSlug: string | undefined,
  params: Static<typeof menuSelectQueryParams>,
) => {
  if (!branchSlug) throw new ApiError("Branch not selected");

  const menu = await db.menu.findFirst({
    where: {
      id: params.id,
      Branch: {
        slug: branchSlug,
      },
    },
  });

  if (!menu?.id) throw new ApiError("Menu not found in this branch");

  const deleted = await db.menu.delete({
    where: { id: menu.id },
  });

  if (!deleted?.id) throw new ApiError("Issue happened while deleting menu");

  return {
    success: true,
    message: "Menu deleted successfully",
    data: null,
  };
};
