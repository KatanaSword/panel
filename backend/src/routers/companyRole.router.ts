import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware";
import {
  createCompanyRole,
  deleteCompanyRole,
  getAllCompanyRoles,
  getCompanyRoleById,
  updateCompanyRole,
} from "../controllers/companyRole.controller";

const router = Router();

router.use(verifyJWT, verifyPermission(["ADMIN"]));

router.route("/").get(getAllCompanyRoles).post(createCompanyRole);

router
  .route("/:companyRoleId")
  .get(getCompanyRoleById)
  .patch(updateCompanyRole)
  .delete(deleteCompanyRole);

export default router;
