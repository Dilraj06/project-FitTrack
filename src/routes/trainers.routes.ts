import { Router } from "express";
import * as ctrl from "../controllers/trainers.controller";
import { validate } from "../middleware/validate.middleware";
import { trainerSchema } from "../validators/trainers.validator";

const router = Router();
router.post("/", validate(trainerSchema), ctrl.createProfile);
router.get("/", ctrl.listProfiles);
router.get("/:id", ctrl.getProfile);
router.post("/:trainerId/assign-client", ctrl.assignClient);
export default router;
