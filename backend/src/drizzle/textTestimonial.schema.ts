import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from 'drizzle-orm/pg-core'
import { users } from "./user.schema";
import { generateUniqueString, timestamp } from "../utils/helpers";

export const textTestimonials = table("text_testimonials", {
    id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(),
    slug: t.varchar("slug").$default(() => generateUniqueString(16)),
    name: t.varchar("name", {length: 20}).notNull(),
    company: t.varchar("company", {length: 20}),
    avatar: t.varchar("avatar").default(""),
    review: t.varchar("review", {length:100}).notNull(),
    socialLink: t.varchar("social_link"),
    username: t.varchar("username"),
    video: t.varchar("video"),
    ownerId: t.integer("owner_id").notNull().references(() => users.id),
    ...timestamp
}, (table) => {
    return [
        t.uniqueIndex("slug_idx").on(table.slug),
        t.index("name_idx").on(table.name)
    ]
})