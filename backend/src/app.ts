import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "18kb" }));
app.use(express.urlencoded({ limit: "18kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Import router
import userRouter from "./routers/user.router.ts";
import companyRoleRouter from "./routers/companyRole.router.ts";
import textTestimonialRouter from "./routers/textTestimonial.router.ts";

// Declear router
app.use("/api/v1/users", userRouter);
app.use("/api/v1/company_roles", companyRoleRouter);
app.use("/api/v1/text_testimonials", textTestimonialRouter);

export { app };
