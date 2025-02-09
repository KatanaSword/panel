import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { timestamp } from "../utils/helpers";
import { relations } from "drizzle-orm";

export const textTestimonials = table(
  "text_testimonials",
  {
    id: t.uuid("id").defaultRandom().primaryKey(),
    fullName: t.varchar("full_name", { length: 50 }).notNull(),
    company: t.varchar("company", { length: 50 }),
    email: t.varchar("email", { length: 250 }).notNull(),
    avatar: t.varchar("avatar").default(""),
    testimonialTitle: t.varchar("testimonial_title", { length: 100 }).notNull(),
    testimonial: t.varchar("testimonial", { length: 250 }).notNull(),
    socialLink: t.varchar("social_link"),
    companyRole: t.varchar("company_role").notNull(),
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

export const textTestimonialTableRelation = relations(
  textTestimonials,
  ({ one }) => {
    return {
      user: one(users, {
        fields: [textTestimonials.ownerId],
        references: [users.id],
      }),
    };
  }
);
