import { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["guest", "user", "admin"]);

export const user = table(
  "user",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    // firstName: t.varchar("first_name", { length: 256 }),
    // lastName: t.varchar("last_name", { length: 256 }),
    email: t.varchar().notNull(),
    // invitee: t.integer().references((): AnyPgColumn => users.id),
    role: rolesEnum().default("guest"),
  },
  (table) => [t.uniqueIndex("email_idx").on(table.email)],
);

export const feed = table(
  "feed",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    ownerId: t.integer("owner_id").references(() => user.id),
    url: t.varchar().notNull(),
    name: t.varchar(),
  },
  (table) => [t.uniqueIndex("owner_id_idx").on(table.ownerId)],
);

export const post = table(
  "post",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    feedId: t.integer("feed_id").references(() => feed.id),
    url: t.varchar().notNull(),
    title: t.varchar(),
  },
  (table) => [t.uniqueIndex("feed_id_idx").on(table.feedId)],
);

export const postPlacement = table(
  "postPlacement",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    postId: t.integer().references(() => post.id),
  },
  (table) => [t.uniqueIndex("post_id_idx").on(table.postId)],
);

export const broadsheetGenerationRules = table(
  "broadsheetGenerationRules",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    ownerId: t.integer("owner_id").references(() => user.id),
  },
  (table) => [t.uniqueIndex("owner_id_idx").on(table.ownerId)],
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
    t.uniqueIndex("generation_rule_id_idx").on(table.generationRuleId),
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
    t.uniqueIndex("generation_rule_id_idx").on(table.generationRuleId),
  ],
);
