import db from "@src/utils/db";
import { Static } from "elysia";
import {
  businessListItemsQueryParams,
  itemSelectQueryParams,
} from "./schemas/query-params";
import {
  businessCreateItemSchema,
  businessUpdateItemSchema,
} from "./schemas/request-body";
import ApiError from "@src/utils/global-error";

export const businessListItemsService = async (
  branchSlug: string | undefined,
  params: Static<typeof businessListItemsQueryParams>,
) => {
  if (!branchSlug) throw new ApiError("Branch not selected");

  const items = await db.item.findMany({
    where: {
      id: params.id,
      Branch: {
        slug: branchSlug,
      },
    },
  });

  return {
    success: true,
    message: "Items listed successfully",
    data: items,
  };
};

export const businessShowItemService = async (
  branchSlug: string | undefined,
  params: Static<typeof itemSelectQueryParams>,
) => {
  if (!branchSlug) throw new ApiError("Branch not selected");

  const item = await db.item.findFirst({
    where: {
      id: params.id,
      Branch: {
        slug: branchSlug,
      },
    },
  });

  if (!item?.id) throw new ApiError("Item not found in this branch");

  return {
    success: true,
    message: "Item details fetched successfully",
    data: item,
  };
};

export const businessCreateItemService = async (
  branchSlug: string | undefined,
  body: Static<typeof businessCreateItemSchema>,
) => {
  if (!branchSlug) throw new ApiError("Branch not selected");

  const branch = await db.branch.findUnique({
    where: { slug: branchSlug },
  });
  if (!branch?.id) throw new ApiError("Branch not found");

  const newItem = await db.item.create({
    data: {
      name: body.name,
      branchId: branch.id,
    },
  });

  if (!newItem?.id) throw new ApiError("Issue happened while creating item");

  return {
    success: true,
    message: "Item created successfully",
    data: newItem,
  };
};

export const businessUpdateItemService = async (
  branchSlug: string | undefined,
  params: Static<typeof itemSelectQueryParams>,
  body: Static<typeof businessUpdateItemSchema>,
) => {
  if (!branchSlug) throw new ApiError("Branch not selected");

  const item = await db.item.findFirst({
    where: {
      id: params.id,
      Branch: {
        slug: branchSlug,
      },
    },
  });

  if (!item?.id) throw new ApiError("Item not found in this branch");

  const updatedItem = await db.item.update({
    where: { id: item.id },
    data: body,
  });

  if (!updatedItem?.id)
    throw new ApiError("Issue happened while updating item");

  return {
    success: true,
    message: "Item updated successfully",
    data: updatedItem,
  };
};

export const businessDeleteItemService = async (
  branchSlug: string | undefined,
  params: Static<typeof itemSelectQueryParams>,
) => {
  if (!branchSlug) throw new ApiError("Branch not selected");

  const item = await db.item.findFirst({
    where: {
      id: params.id,
      Branch: {
        slug: branchSlug,
      },
    },
  });

  if (!item?.id) throw new ApiError("Item not found in this branch");

  const deleted = await db.item.delete({
    where: { id: item.id },
  });

  if (!deleted?.id) throw new ApiError("Issue happened while deleting item");

  return {
    success: true,
    message: "Item deleted successfully",
    data: null,
  };
};