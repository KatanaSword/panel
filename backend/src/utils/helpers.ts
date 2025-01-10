import { pgEnum } from "drizzle-orm/pg-core"; 
import * as t from "drizzle-orm/pg-core"
import crypto from "crypto"

export const availableUserRolesEnum = pgEnum("role", ["USER", "SUBSCRIBER", "ADMIN"])

export const availablePaymentMethodEnum = pgEnum("payment_method", ["UNKNOWN", "RAZORPAY"])

export const timestamp = {
    updated_at: t.timestamp("updated_at"),
    created_at: t.timestamp("created_at").defaultNow().notNull(),
    deleted_at: t.timestamp("deleted_at"),
}

export const generateUniqueString = (length: number = 12): string => {
    const uniqueString = crypto.randomBytes(length).toString("hex")
    return uniqueString
}