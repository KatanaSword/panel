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
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router
  .route("/")
  .get(verifyJWT, getAllTextTestimonials)
  .post(verifyJWT, upload.single("avatar"), createTextTestimonial);
router
  .route("/update_avatar/:textTestimonialId")
  .patch(verifyJWT, upload.single("avatar"), updateAvatar);
router
  .route("/:textTestimonialId")
  .get(verifyJWT, getTextTestimonialById)
  .patch(verifyJWT, updateTextTestimonial)
  .delete(verifyJWT, deleteTextTestimonial);

export default router;
