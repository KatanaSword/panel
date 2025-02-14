import { Router } from "express";
import {
  createTextTestimonial,
  deleteTextTestimonial,
  getAllTextTestimonials,
  getTextTestimonialById,
  updateAvatar,
  updateTextTestimonial,
} from "../controllers/textTestimonial.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { imageUpload } from "../middlewares/multer.middleware";

const router = Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getAllTextTestimonials)
  .post(imageUpload.single("avatar"), createTextTestimonial);
router
  .route("/update_avatar/:textTestimonialId")
  .patch(imageUpload.single("avatar"), updateAvatar);
router
  .route("/:textTestimonialId")
  .get(getTextTestimonialById)
  .patch(updateTextTestimonial)
  .delete(deleteTextTestimonial);

export default router;
