/**
 * @openapi
 * /trainers:
 *   get:
 *     summary: List trainer profiles
 *     tags: [Trainers]
 *     responses:
 *       200:
 *         description: Array of trainer profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainerProfile'
 *
 *   post:
 *     summary: Create trainer profile
 *     tags: [Trainers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainerProfile'
 *           examples:
 *             example:
 *               $ref: '#/components/examples/TrainerExample'
 *     responses:
 *       201:
 *         description: Created
 *
 * /trainers/{id}:
 *   get:
 *     summary: Get trainer profile
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Trainer profile
 *       404:
 *         description: Not found
 *
 * /trainers/{trainerId}/assign-client:
 *   post:
 *     summary: Assign a client to a trainer (adds clientId to trainer and sets client's assignedTrainerId)
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: trainerId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *             required: [clientId]
 *     responses:
 *       200:
 *         description: Updated trainer profile
 */

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
