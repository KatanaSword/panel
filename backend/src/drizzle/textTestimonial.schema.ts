import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from 'drizzle-orm/pg-core'
import { users } from "./user.schema";
import { timestamp } from "../utils/helpers";
import { relations } from "drizzle-orm";

export const textTestimonials = table("text_testimonials", {
    id: t.uuid("id").primaryKey().defaultRandom(),
    name: t.varchar("name", {length: 20}).notNull(),
    company: t.varchar("company", {length: 20}),
    avatar: t.varchar("avatar").default(""),
    review: t.varchar("review", {length:100}).notNull(),
    socialLink: t.varchar("social_link"),
    username: t.varchar("username"),
    video: t.varchar("video"),
    ownerId: t.uuid("owner_id").references(() => users.id).notNull(),
    ...timestamp
}, (table) => {
    return [{
        nameIndex: t.index("name_idx").on(table.name)
    }]
})

// Relation

export const textTestimonialTableRelation = relations(textTestimonials, ({ one }) => {
    return {
        user: one(users, {
            fields: [textTestimonials.ownerId],
            references: [users.id]
        })
    }
})