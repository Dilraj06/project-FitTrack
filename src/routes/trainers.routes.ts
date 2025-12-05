/**
 * @openapi
 * tags:
 *   - name: Trainers
 *     description: Trainer profiles and client assignment
 *
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
 *     summary: Create trainer profile (authenticated)
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *               specialties:
 *                 type: array
 *                 items:
 *                   type: string
 *               clients:
 *                 type: array
 *                 items:
 *                   type: string
 *           example:
 *             bio: "Certified fitness coach with 5 years of experience"
 *             specialties: ["strength training", "HIIT"]
 *             clients: []
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized — missing or invalid token
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainerProfile'
 *       404:
 *         description: Not found
 *
 * /trainers/{trainerId}/assign-client:
 *   post:
 *     summary: Assign a client to a trainer
 *     description: >
 *       Adds `clientId` to the trainer's `clients` array and sets the client's `assignedTrainerId`.
 *       **Protected:** caller must be authenticated and must be the owner of the trainer profile
 *       (i.e. trainer.userId === caller UID).
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
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
 *           example:
 *             clientId: "client_abc123"
 *     responses:
 *       200:
 *         description: Updated trainer profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainerProfile'
 *       400:
 *         description: Bad request — missing clientId
 *       401:
 *         description: Unauthorized — missing or invalid token
 *       403:
 *         description: Forbidden — authenticated but not the trainer owner
 *       404:
 *         description: Trainer not found
 */

// src/routes/trainers.routes.ts
import { Router } from "express";
import * as ctrl from "../controllers/trainers.controller";
import { validate } from "../middleware/validate.middleware";
import { trainerSchema } from "../validators/trainers.validator";
import { verifyJwt } from "../middleware/jwt.middleware";

const router = Router();

// Create profile: requires login 
router.post("/", verifyJwt, validate(trainerSchema), ctrl.createProfile);

// Public
router.get("/", ctrl.listProfiles);
router.get("/:id", ctrl.getProfile);

// Assign client to trainer: requires login 
router.post("/:trainerId/assign-client", verifyJwt, ctrl.assignClient);

export default router;
