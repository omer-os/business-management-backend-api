import Elysia from "elysia";
import { adminBranchRoutes } from "./admin (branch)/route";
import { adminOrgRoutes } from "./admin (org)/route";
import { authRoutes } from "./auth/route";

const AllRoutes = new Elysia()
  .use(authRoutes)
  .use(adminOrgRoutes)
  .use(adminBranchRoutes);

export default AllRoutes;
