import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core"
import { timestamp } from "../utils/helpers"
import { relations } from "drizzle-orm";
import { textTestimonials } from "./textTestimonial.schema";
import { videoTestimonials } from "./videoTestimonial.schema";

export const users = table("users", {
    id: t.uuid("id").primaryKey().defaultRandom(),
    fullName: t.varchar("full_name", {length: 255}),
    username: t.varchar("username", {length: 15}).notNull(),
    email: t.varchar("email", {length: 255}).notNull(),
    phoneNumber: t.varchar("phone_number").unique(),
    avatar: t.varchar("avatar").default(""),
    role: t.varchar("role").$type<"USER" | "SUBSCRIBER" | "ADMIN">().default("USER"),
    password: t.varchar("password", {length: 255}).notNull(),
    refreshToken: t.varchar("refresh_token"),
    isEmailVerified: t.boolean("is_email_verified").default(false),
    emailVerificationToken: t.varchar("email_verification_token"),
    emailVerificationExpiry: t.time("email_verification_expiry"),
    forgotPasswordToken: t.varchar("forgot_password_token"),
    forgotPasswordExpiry: t.time("forgot_password_expiry"),
    ...timestamp
}, 
    (table) => {
        return [{
            emailIndex: t.uniqueIndex("email_idx").on(table.email),
            usernameIndex: t.uniqueIndex("username_idx").on(table.username)
        }]
    }
)

// Relation

export const userTableRelations = relations(
    users , ({ many }) => {
        return {
            textTestimonials: many(textTestimonials),
            videoTestimonials: many(videoTestimonials)
        }
    }
)