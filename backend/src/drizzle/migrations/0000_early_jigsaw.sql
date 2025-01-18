CREATE TABLE "testimonial_collections" (
	"text_testimonial_id" uuid,
	"video_testimonial_id" uuid
);
--> statement-breakpoint
CREATE TABLE "text_testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(20) NOT NULL,
	"company" varchar(20),
	"avatar" varchar DEFAULT '',
	"review" varchar(100) NOT NULL,
	"social_link" varchar,
	"username" varchar,
	"video" varchar,
	"owner_id" uuid NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255),
	"username" varchar(15) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar,
	"avatar" varchar DEFAULT '',
	"role" varchar DEFAULT 'USER',
	"password" varchar(255) NOT NULL,
	"refresh_token" varchar,
	"is_email_verified" boolean DEFAULT false,
	"email_verification_token" varchar,
	"email_verification_expiry" time,
	"forgot_password_token" varchar,
	"forgot_password_expiry" time,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE "video_testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(20) NOT NULL,
	"company" varchar(20),
	"avatar" varchar DEFAULT '',
	"social_link" varchar,
	"video" varchar NOT NULL,
	"owner_id" uuid NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "testimonial_collections" ADD CONSTRAINT "testimonial_collections_text_testimonial_id_text_testimonials_id_fk" FOREIGN KEY ("text_testimonial_id") REFERENCES "public"."text_testimonials"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonial_collections" ADD CONSTRAINT "testimonial_collections_video_testimonial_id_video_testimonials_id_fk" FOREIGN KEY ("video_testimonial_id") REFERENCES "public"."video_testimonials"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "text_testimonials" ADD CONSTRAINT "text_testimonials_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_testimonials" ADD CONSTRAINT "video_testimonials_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;