import {pgTable as table} from "drizzle-orm/pg-core"
import * as t from "drizzle-orm/pg-core"
import { textTestimonials } from "./textTestimonial.schema"
import { videoTestimonials } from "./videoTestimonial.schema"
import { users } from "./user.schema"
import { timestamp } from "../utils/helpers"

export const testimonialCollections = table("testimonial_collections", {
    id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(),
    textTestimonialId: t.integer("text_testimonial_id").references(() => textTestimonials.id),
    videoTestimonialId: t.integer("video_testimonial_id").references(() => videoTestimonials.id),
    ownerId: t.integer("owner_id").notNull().references(() => users.id),
    ...timestamp
})