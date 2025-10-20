import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import AllRoutes from "./routes/all-routes";

const app = new Elysia()
  .onError(({ code, error, status }) => {
    if (code === "VALIDATION") {
      // console.log();
      return {
        success: false,
        message: `Validation Error, ${error.all.map((i) => i.summary).join(", ")}`,
        data: null,
      };
    }
    if (code === "UNKNOWN") {
      return {
        success: false,
        message: `${error.message}`,
        data: null,
      };
    }
  })
  .use(AllRoutes)
  .use(
    openapi({
      documentation: {
        info: {
          title: "Multi tenant saas backend api design",
          version: "1.0.0",
          contact: {
            email: "omerchetin19@gmail.com",
            name: "omar chatin",
            url: "https://github.com/omer-os",
          },
          description:
            "Backend api documentation built for future saas with orgs branches and users.",
        },
      },
      path: "/docs",
    }),
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
