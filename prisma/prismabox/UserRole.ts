import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const UserRole = t.Union([t.Literal("Admin"), t.Literal("User")], {
  additionalProperties: false,
});
