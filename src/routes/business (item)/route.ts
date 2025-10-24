import Response from "@src/utils/global-response";
import Elysia from "elysia";
import { businessPlugin } from "@src/plugins/auth-plugin";
import {
  businessCreateItemService,
  businessDeleteItemService,
  businessListItemsService,
  businessShowItemService,
  businessUpdateItemService,
} from "./service";
import {
  businessCreateItemDoc,
  businessDeleteItemDoc,
  businessListItemsDoc,
  businessShowItemDoc,
  businessUpdateItemDoc,
} from "./docs/docs";
import {
  businessCreateItemResponseSchema,
  businessDeleteItemResponseSchema,
  businessListItemsResponseSchema,
  businessShowItemResponseSchema,
  businessUpdateItemResponseSchema,
} from "./schemas/response";
import {
  businessListItemsQueryParams,
  itemSelectQueryParams,
} from "./schemas/query-params";
import {
  businessCreateItemSchema,
  businessUpdateItemSchema,
} from "./schemas/request-body";

export const businessItemRoutes = new Elysia({
  prefix: "/business/items",
  tags: ["Business (Item)"],
})
  .use(businessPlugin)
  .get(
    "/",
    async ({ user, query }) => {
      return await businessListItemsService(user?.selectedBranchSlug, query);
    },
    {
      detail: businessListItemsDoc,
      response: Response(businessListItemsResponseSchema),
      query: businessListItemsQueryParams,
    },
  )
  .get(
    "/show",
    async ({ user, query }) => {
      return await businessShowItemService(user?.selectedBranchSlug, query);
    },
    {
      detail: businessShowItemDoc,
      response: Response(businessShowItemResponseSchema),
      query: itemSelectQueryParams,
    },
  )
  .post(
    "/",
    async ({ user, body }) => {
      return await businessCreateItemService(user?.selectedBranchSlug, body);
    },
    {
      detail: businessCreateItemDoc,
      body: businessCreateItemSchema,
      response: Response(businessCreateItemResponseSchema),
    },
  )
  .patch(
    "/",
    async ({ user, query, body }) => {
      return await businessUpdateItemService(
        user?.selectedBranchSlug,
        query,
        body,
      );
    },
    {
      detail: businessUpdateItemDoc,
      query: itemSelectQueryParams,
      body: businessUpdateItemSchema,
      response: Response(businessUpdateItemResponseSchema),
    },
  )
  .delete(
    "/",
    async ({ user, query }) => {
      return await businessDeleteItemService(user?.selectedBranchSlug, query);
    },
    {
      detail: businessDeleteItemDoc,
      query: itemSelectQueryParams,
      response: Response(businessDeleteItemResponseSchema),
    },
  );
