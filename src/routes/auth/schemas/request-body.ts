import { t } from "elysia";

export const signupBody = t.Object({
  name: t.String({
    minLength: 2,
    maxLength: 50,
    description: "User full name",
    examples: ["Omar Chatin"],
  }),
  email: t.String({
    format: "email",
    description: "User email address",
    examples: ["omerchetin19@gmail.com"],
  }),
  password: t.String({
    minLength: 6,
    maxLength: 100,
    description: "Password (6–100 characters)",
    examples: ["123456789"],
  }),
});

export const signinBody = t.Object({
  email: t.String({
    format: "email",
    description: "Registered email",
    examples: ["omerchetin19@gmail.com"],
  }),
  password: t.String({
    minLength: 6,
    maxLength: 100,
    description: "User password",
    examples: ["123456789"],
  }),
});

export const switchOrgBody = t.Object({
  organizationId: t.String({
    format: "uuid",
    description: "Target organization UUID",
    examples: ["9f1a3b4c-2d7e-4c5f-b6a1-2f6b0a4e1b8f"],
  }),
});

export const switchBranchBody = t.Object({
  branchId: t.String({
    format: "uuid",
    description: "Target branch UUID",
    examples: ["c7d9a2b3-5e6f-4a8d-9c0e-2b3f1d7e4a5c"],
  }),
});

export type SignupBody = typeof signupBody.static;
export type SigninBody = typeof signinBody.static;
export type SwitchOrgBody = typeof switchOrgBody.static;
export type SwitchBranchBody = typeof switchBranchBody.static;
