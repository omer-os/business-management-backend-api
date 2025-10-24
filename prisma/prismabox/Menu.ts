import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const MenuPlain = t.Object(
  {
    id: t.String(),
    slug: t.String(),
    name: t.Any({ description: `[LocalString]` }),
    theme: __nullable__(t.Any({ description: `[ThemeConfig]` })),
    menuStructure: t.Array(t.Any({ description: `[menuStructure]` }), {
      additionalProperties: false,
    }),
    branchId: __nullable__(t.String()),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const MenuRelations = t.Object(
  {
    Branch: __nullable__(
      t.Object(
        {
          id: t.String(),
          name: t.String(),
          slug: t.String(),
          organizationId: t.String(),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const MenuPlainInputCreate = t.Object(
  {
    slug: t.String(),
    name: t.Any({ description: `[LocalString]` }),
    theme: t.Optional(__nullable__(t.Any({ description: `[ThemeConfig]` }))),
    menuStructure: t.Array(t.Any({ description: `[menuStructure]` }), {
      additionalProperties: false,
    }),
  },
  { additionalProperties: false },
);

export const MenuPlainInputUpdate = t.Object(
  {
    slug: t.Optional(t.String()),
    name: t.Optional(t.Any({ description: `[LocalString]` })),
    theme: t.Optional(__nullable__(t.Any({ description: `[ThemeConfig]` }))),
    menuStructure: t.Optional(
      t.Array(t.Any({ description: `[menuStructure]` }), {
        additionalProperties: false,
      }),
    ),
  },
  { additionalProperties: false },
);

export const MenuRelationsInputCreate = t.Object(
  {
    Branch: t.Optional(
      t.Object(
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
    ),
  },
  { additionalProperties: false },
);

export const MenuRelationsInputUpdate = t.Partial(
  t.Object(
    {
      Branch: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const MenuWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          slug: t.String(),
          name: t.Any({ description: `[LocalString]` }),
          theme: t.Any({ description: `[ThemeConfig]` }),
          menuStructure: t.Array(t.Any({ description: `[menuStructure]` }), {
            additionalProperties: false,
          }),
          branchId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Menu" },
  ),
);

export const MenuWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), slug: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ slug: t.String() })],
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
            {
              id: t.String(),
              slug: t.String(),
              name: t.Any({ description: `[LocalString]` }),
              theme: t.Any({ description: `[ThemeConfig]` }),
              menuStructure: t.Array(
                t.Any({ description: `[menuStructure]` }),
                { additionalProperties: false },
              ),
              branchId: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Menu" },
);

export const MenuSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      slug: t.Boolean(),
      name: t.Boolean(),
      theme: t.Boolean(),
      menuStructure: t.Boolean(),
      Branch: t.Boolean(),
      branchId: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const MenuInclude = t.Partial(
  t.Object(
    { Branch: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const MenuOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      slug: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      theme: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      menuStructure: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      branchId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Menu = t.Composite([MenuPlain, MenuRelations], {
  additionalProperties: false,
});

export const MenuInputCreate = t.Composite(
  [MenuPlainInputCreate, MenuRelationsInputCreate],
  { additionalProperties: false },
);

export const MenuInputUpdate = t.Composite(
  [MenuPlainInputUpdate, MenuRelationsInputUpdate],
  { additionalProperties: false },
);
