import { drizzle } from "drizzle-orm/node-postgres";
import { DB_NAME } from "../constants.ts";
import { users } from "../drizzle/user.schema";
import { textTestimonials } from "../drizzle/textTestimonial.schema";
import { videoTestimonials } from "../drizzle/videoTestimonial.schema";
import { testimonialCollections } from "../drizzle/testimonialCollection.schema";

const db = drizzle(`${process.env.DATABASE_URL}/${DB_NAME}`, {
  schema: {
    users,
    textTestimonials,
    videoTestimonials,
    testimonialCollections,
  },
  logger: true,
});

export default db;
