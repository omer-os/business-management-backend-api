import Response from "@src/utils/global-response";
import Elysia from "elysia";
import { businessPlugin } from "@src/plugins/auth-plugin";
import {
  businessCreateCategoryService,
  businessDeleteCategoryService,
  businessListCategoriesService,
  businessShowCategoryService,
  businessUpdateCategoryService,
} from "./service";
import {
  businessCreateCategoryDoc,
  businessDeleteCategoryDoc,
  businessListCategoriesDoc,
  businessShowCategoryDoc,
  businessUpdateCategoryDoc,
} from "./docs/docs";
import {
  businessCreateCategoryResponseSchema,
  businessDeleteCategoryResponseSchema,
  businessListCategoriesResponseSchema,
  businessShowCategoryResponseSchema,
  businessUpdateCategoryResponseSchema,
} from "./schemas/response";
import {
  businessListCategoriesQueryParams,
  categorySelectQueryParams,
} from "./schemas/query-params";
import {
  businessCreateCategorySchema,
  businessUpdateCategorySchema,
} from "./schemas/request-body";

export const businessCategoryRoutes = new Elysia({
  prefix: "/business/categories",
  tags: ["Business (Category)"],
})
  .use(businessPlugin)
  .get(
    "/",
    async ({ user, query }) => {
      return await businessListCategoriesService(
        user?.selectedBranchSlug,
        query,
      );
    },
    {
      detail: businessListCategoriesDoc,
      response: Response(businessListCategoriesResponseSchema),
      query: businessListCategoriesQueryParams,
    },
  )
  .get(
    "/show",
    async ({ user, query }) => {
      return await businessShowCategoryService(user?.selectedBranchSlug, query);
    },
    {
      detail: businessShowCategoryDoc,
      response: Response(businessShowCategoryResponseSchema),
      query: categorySelectQueryParams,
    },
  )
  .post(
    "/",
    async ({ user, body }) => {
      return await businessCreateCategoryService(
        user?.selectedBranchSlug,
        body,
      );
    },
    {
      detail: businessCreateCategoryDoc,
      body: businessCreateCategorySchema,
      response: Response(businessCreateCategoryResponseSchema),
    },
  )
  .patch(
    "/",
    async ({ user, query, body }) => {
      return await businessUpdateCategoryService(
        user?.selectedBranchSlug,
        query,
        body,
      );
    },
    {
      detail: businessUpdateCategoryDoc,
      query: categorySelectQueryParams,
      body: businessUpdateCategorySchema,
      response: Response(businessUpdateCategoryResponseSchema),
    },
  )
  .delete(
    "/",
    async ({ user, query }) => {
      return await businessDeleteCategoryService(
        user?.selectedBranchSlug,
        query,
      );
    },
    {
      detail: businessDeleteCategoryDoc,
      query: categorySelectQueryParams,
      response: Response(businessDeleteCategoryResponseSchema),
    },
  );
