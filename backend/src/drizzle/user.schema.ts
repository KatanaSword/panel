import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core"
import { availableUserRoleEnum } from "../utils/helpers";
import { timestamp } from "../utils/helpers"

export const users = table("users", {
    id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(),
    fullName: t.varchar("full_name"),
    username: t.varchar("user_name", {length: 15}).unique().notNull(),
    email: t.varchar("email").unique().notNull(),
    phoneNumber: t.varchar("phone_number").unique(),
    avatar: t.varchar("avatar").default(""),
    role: availableUserRoleEnum().default("USER"),
    password: t.varchar("password").notNull(),
    refreshToken: t.varchar("refresh_token"),
    isEmailVerified: t.boolean("is_email_verified").default(false),
    emailVerificationToken: t.varchar("email_verification_token"),
    emailVerificationExpiry: t.time("email_verification_expiry").defaultNow(),
    forgotPasswordToken: t.varchar("forgot_password_token"),
    forgotPasswordExpiry: t.time("forgot_password_expiry").defaultNow(),
    ...timestamp
}, 
    (table) => {
        return [
            t.uniqueIndex("email_idx").on(table.email),
            t.uniqueIndex("username_idx").on(table.username),
        ]
    }
)