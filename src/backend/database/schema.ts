import { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const rolesEnum = pgEnum("roles", ["guest", "user", "admin"]);
export type Role = (typeof rolesEnum.enumValues)[number];

// export const user = table(
//   // We use "account" instead of "user" because user is reserved
//   // in postgres.
//   "account",
//   {
//     id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
//     // firstName: t.varchar("first_name", { length: 256 }),
//     // lastName: t.varchar("last_name", { length: 256 }),
//     email: t.varchar().notNull(),
//     // invitee: t.integer().references((): AnyPgColumn => users.id),
//     role: rolesEnum().default("guest"),
//   },
//   (table) => [t.uniqueIndex("account_email_idx").on(table.email)],
// );

/**
 * TODO:
 * With better-auth, how do I create this record when a new user is created
 * via that library?
 *
 * How do I include this value on the session/user information that is returned
 * to the clients so we do not need to make an extra network call for
 * this information.
 */
export const userRole = table(
  "userRole",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    ownerId: t
      .text("owner_id")
      .references(() => user.id)
      .notNull(),
    role: rolesEnum().default("guest").notNull(),
  },
  (table) => [t.uniqueIndex("userRole_owner_id_idx").on(table.ownerId)],
);

export const feed = table(
  "feed",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    ownerId: t.text("owner_id").references(() => user.id),
    url: t.varchar().notNull(),
    name: t.varchar(),
  },
  (table) => [t.uniqueIndex("feed_owner_id_idx").on(table.ownerId)],
);

export const post = table(
  "post",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    feedId: t.integer("feed_id").references(() => feed.id),
    url: t.varchar().notNull(),
    title: t.varchar(),
  },
  (table) => [t.uniqueIndex("post_feed_id_idx").on(table.feedId)],
);

export const postPlacement = table(
  "postPlacement",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    postId: t.integer().references(() => post.id),
  },
  (table) => [t.uniqueIndex("postPlacement_post_id_idx").on(table.postId)],
);

export const broadsheetGenerationRules = table(
  "broadsheetGenerationRules",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    ownerId: t.text("owner_id").references(() => user.id),
  },
  (table) => [
    t.uniqueIndex("broadsheetGenerationRules_owner_id_idx").on(table.ownerId),
  ],
);

export const broadsheetGenerationSchedule = table(
  "broadsheetGenerationSchedule",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    generationRuleId: t
      .integer("generation_rule_id")
      .references(() => broadsheetGenerationRules.id),
  },
  (table) => [
    t
      .uniqueIndex("broadsheetGenerationSchedule_generation_rule_id_idx")
      .on(table.generationRuleId),
  ],
);

export const broadsheet = table(
  "broadsheet",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    generationRuleId: t
      .integer("generation_rule_id")
      .references(() => broadsheetGenerationRules.id),
  },
  (table) => [
    t
      .uniqueIndex("broadsheet_generation_rule_id_idx")
      .on(table.generationRuleId),
  ],
);
