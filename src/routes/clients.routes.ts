import { Router } from "express";
import * as ctrl from "../controllers/clients.controller";
import { validate } from "../middleware/validate.middleware";
import { clientSchema } from "../validators/clients.validator";

const router = Router();

router.post("/", validate(clientSchema), ctrl.createClient);
router.get("/", ctrl.listClients);
router.get("/:id", ctrl.getClient);
router.patch("/:id", validate(clientSchema, true), ctrl.updateClient);
router.delete("/:id", ctrl.deleteClient);
router.post("/:id/assign-trainer", ctrl.assignTrainer);

export default router;
