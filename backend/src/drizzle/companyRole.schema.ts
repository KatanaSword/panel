import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { timestamp } from "../utils/helpers";
import { relations } from "drizzle-orm";
import { users } from "./user.schema";

export const companyRoles = table(
  "company_roles",
  {
    id: t.uuid("id").defaultRandom().primaryKey(),
    name: t.varchar("name", { length: 250 }).notNull(),
    ownerId: t
      .uuid("owner_id")
      .references(() => users.id)
      .notNull(),
    ...timestamp,
  },
  (table) => {
    return [
      {
        nameIndex: t.uniqueIndex("name_idx").on(table.name),
      },
    ];
  }
);

// Relation

export const companyRoleTableRelation = relations(companyRoles, ({ one }) => {
  return {
    user: one(users, {
      fields: [companyRoles.ownerId],
      references: [users.id],
    }),
  };
});
