import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
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
