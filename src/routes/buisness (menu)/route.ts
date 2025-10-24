import Response from "@src/utils/global-response";
import Elysia from "elysia";
import { businessPlugin } from "@src/plugins/auth-plugin";
import {
  businessCreateMenuService,
  businessDeleteMenuService,
  businessListMenusService,
  businessShowMenuService,
  businessUpdateMenuService,
} from "./service";
import {
  businessCreateMenuDoc,
  businessDeleteMenuDoc,
  businessListMenusDoc,
  businessShowMenuDoc,
  businessUpdateMenuDoc,
} from "./docs/docs";
import {
  businessCreateMenuResponseSchema,
  businessDeleteMenuResponseSchema,
  businessListMenusResponseSchema,
  businessShowMenuResponseSchema,
  businessUpdateMenuResponseSchema,
} from "./schemas/response";
import {
  businessListMenusQueryParams,
  menuSelectQueryParams,
} from "./schemas/query-params";
import {
  businessCreateMenuSchema,
  businessUpdateMenuSchema,
} from "./schemas/request-body";

export const businessMenuRoutes = new Elysia({
  prefix: "/business/menus",
  tags: ["Business (Menu)"],
})
  .use(businessPlugin)
  .get(
    "/",
    async ({ user, query }) => {
      return await businessListMenusService(user?.selectedBranchSlug, query);
    },
    {
      detail: businessListMenusDoc,
      response: Response(businessListMenusResponseSchema),
      query: businessListMenusQueryParams,
    },
  )
  .get(
    "/show",
    async ({ user, query }) => {
      return await businessShowMenuService(user?.selectedBranchSlug, query);
    },
    {
      detail: businessShowMenuDoc,
      response: Response(businessShowMenuResponseSchema),
      query: menuSelectQueryParams,
    },
  )
  .post(
    "/",
    async ({ user, body }) => {
      return await businessCreateMenuService(user?.selectedBranchSlug, body);
    },
    {
      detail: businessCreateMenuDoc,
      body: businessCreateMenuSchema,
      response: Response(businessCreateMenuResponseSchema),
    },
  )
  .patch(
    "/",
    async ({ user, query, body }) => {
      return await businessUpdateMenuService(
        user?.selectedBranchSlug,
        query,
        body,
      );
    },
    {
      detail: businessUpdateMenuDoc,
      query: menuSelectQueryParams,
      body: businessUpdateMenuSchema,
      response: Response(businessUpdateMenuResponseSchema),
    },
  )
  .delete(
    "/",
    async ({ user, query }) => {
      return await businessDeleteMenuService(user?.selectedBranchSlug, query);
    },
    {
      detail: businessDeleteMenuDoc,
      query: menuSelectQueryParams,
      response: Response(businessDeleteMenuResponseSchema),
    },
  );
