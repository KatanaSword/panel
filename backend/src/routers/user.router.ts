import { Router } from "express";
import { signInUser, userRegister } from "../controllers/user.controller.ts";

const router = Router();

// Unsecure routes
router.route("/register").post(userRegister);
router.route("/signin").post(signInUser);

// Secure routes

export default router;
