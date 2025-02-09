import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { timestamp } from "../utils/helpers";
import { relations } from "drizzle-orm";

export const videoTestimonials = table(
  "video_testimonials",
  {
    id: t.uuid("id").defaultRandom().primaryKey(),
    fullName: t.varchar("full_name", { length: 20 }).notNull(),
    email: t.varchar("email", { length: 250 }).notNull(),
    company: t.varchar("company", { length: 20 }),
    avatar: t.varchar("avatar").default(""),
    socialLink: t.varchar("social_link"),
    video: t.varchar("video").notNull(),
    companyRole: t.varchar("company_role"),
    ownerId: t
      .uuid("owner_id")
      .references(() => users.id)
      .notNull(),
    ...timestamp,
  },
  (table) => {
    return [
      {
        fullNameIndex: t.index("full_name_idx").on(table.fullName),
        emailIndex: t.index("email_idx").on(table.email),
      },
    ];
  }
);

// Relation

export const videoTestimonialTableRelation = relations(
  videoTestimonials,
  ({ one }) => {
    return {
      user: one(users, {
        fields: [videoTestimonials.ownerId],
        references: [users.id],
      }),
    };
  }
);
