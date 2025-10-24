import Elysia from "elysia";
import { adminBranchRoutes } from "./admin (branch)/route";
import { adminOrgRoutes } from "./admin (org)/route";
import { authRoutes } from "./auth/route";
import { adminUserRoutes } from "./admin (user)/route";
import { businessMenuRoutes } from "./buisness (menu)/route";

const AllRoutes = new Elysia()
  .use(authRoutes)
  .use(adminOrgRoutes)
  .use(adminBranchRoutes)
  .use(adminUserRoutes)
  .use(businessMenuRoutes);

export default AllRoutes;
