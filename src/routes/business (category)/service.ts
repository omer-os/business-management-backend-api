import db from "@src/utils/db";
import { Static } from "elysia";
import {
  businessListCategoriesQueryParams,
  categorySelectQueryParams,
} from "./schemas/query-params";
import {
  businessCreateCategorySchema,
  businessUpdateCategorySchema,
} from "./schemas/request-body";
import ApiError from "@src/utils/global-error";

export const businessListCategoriesService = async (
  branchSlug: string | undefined,
  params: Static<typeof businessListCategoriesQueryParams>,
) => {
  if (!branchSlug) throw new ApiError("Branch not selected");

  const categories = await db.category.findMany({
    where: {
      id: params.id,
      Branch: {
        slug: branchSlug,
      },
    },
  });

  return {
    success: true,
    message: "Categories listed successfully",
    data: categories,
  };
};

export const businessShowCategoryService = async (
  branchSlug: string | undefined,
  params: Static<typeof categorySelectQueryParams>,
) => {
  if (!branchSlug) throw new ApiError("Branch not selected");

  const category = await db.category.findFirst({
    where: {
      id: params.id,
      Branch: {
        slug: branchSlug,
      },
    },
  });

  if (!category?.id) throw new ApiError("Category not found in this branch");

  return {
    success: true,
    message: "Category details fetched successfully",
    data: category,
  };
};

export const businessCreateCategoryService = async (
  branchSlug: string | undefined,
  body: Static<typeof businessCreateCategorySchema>,
) => {
  if (!branchSlug) throw new ApiError("Branch not selected");

  const branch = await db.branch.findUnique({
    where: { slug: branchSlug },
  });
  if (!branch?.id) throw new ApiError("Branch not found");

  const newCategory = await db.category.create({
    data: {
      name: body.name,
      branchId: branch.id,
    },
  });

  if (!newCategory?.id)
    throw new ApiError("Issue happened while creating category");

  return {
    success: true,
    message: "Category created successfully",
    data: newCategory,
  };
};

export const businessUpdateCategoryService = async (
  branchSlug: string | undefined,
  params: Static<typeof categorySelectQueryParams>,
  body: Static<typeof businessUpdateCategorySchema>,
) => {
  if (!branchSlug) throw new ApiError("Branch not selected");

  const category = await db.category.findFirst({
    where: {
      id: params.id,
      Branch: {
        slug: branchSlug,
      },
    },
  });

  if (!category?.id) throw new ApiError("Category not found in this branch");

  const updatedCategory = await db.category.update({
    where: { id: category.id },
    data: body,
  });

  if (!updatedCategory?.id)
    throw new ApiError("Issue happened while updating category");

  return {
    success: true,
    message: "Category updated successfully",
    data: updatedCategory,
  };
};

export const businessDeleteCategoryService = async (
  branchSlug: string | undefined,
  params: Static<typeof categorySelectQueryParams>,
) => {
  if (!branchSlug) throw new ApiError("Branch not selected");

  const category = await db.category.findFirst({
    where: {
      id: params.id,
      Branch: {
        slug: branchSlug,
      },
    },
  });

  if (!category?.id) throw new ApiError("Category not found in this branch");

  const deleted = await db.category.delete({
    where: { id: category.id },
  });

  if (!deleted?.id)
    throw new ApiError("Issue happened while deleting category");

  return {
    success: true,
    message: "Category deleted successfully",
    data: null,
  };
};