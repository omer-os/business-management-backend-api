import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const BranchMembershipPlain = t.Object(
  { id: t.String(), userId: t.String(), branchId: t.String() },
  { additionalProperties: false },
);

export const BranchMembershipRelations = t.Object(
  {
    user: t.Object(
      {
        id: t.String(),
        name: t.String(),
        email: t.String(),
        password: t.String(),
        role: t.Union([t.Literal("Admin"), t.Literal("User")], {
          additionalProperties: false,
        }),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
    branch: t.Object(
      {
        id: t.String(),
        name: t.String(),
        slug: t.String(),
        organizationId: t.String(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const BranchMembershipPlainInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const BranchMembershipPlainInputUpdate = t.Object(
  {},
  { additionalProperties: false },
);

export const BranchMembershipRelationsInputCreate = t.Object(
  {
    user: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    branch: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const BranchMembershipRelationsInputUpdate = t.Partial(
  t.Object(
    {
      user: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
      branch: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
);

export const BranchMembershipWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          userId: t.String(),
          branchId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "BranchMembership" },
  ),
);

export const BranchMembershipWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              userId_branchId: t.Object(
                { userId: t.String(), branchId: t.String() },
                { additionalProperties: false },
              ),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({
              userId_branchId: t.Object(
                { userId: t.String(), branchId: t.String() },
                { additionalProperties: false },
              ),
            }),
          ],
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            { id: t.String(), userId: t.String(), branchId: t.String() },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "BranchMembership" },
);

export const BranchMembershipSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      userId: t.Boolean(),
      branchId: t.Boolean(),
      user: t.Boolean(),
      branch: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const BranchMembershipInclude = t.Partial(
  t.Object(
    { user: t.Boolean(), branch: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const BranchMembershipOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      branchId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const BranchMembership = t.Composite(
  [BranchMembershipPlain, BranchMembershipRelations],
  { additionalProperties: false },
);

export const BranchMembershipInputCreate = t.Composite(
  [BranchMembershipPlainInputCreate, BranchMembershipRelationsInputCreate],
  { additionalProperties: false },
);

export const BranchMembershipInputUpdate = t.Composite(
  [BranchMembershipPlainInputUpdate, BranchMembershipRelationsInputUpdate],
  { additionalProperties: false },
);
