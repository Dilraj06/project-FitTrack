/**
 * @openapi
 * tags:
 *   - name: Clients
 *     description: Client profiles and trainer assignment
 *
 * /clients:
 *   get:
 *     summary: List clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Array of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *
 *   post:
 *     summary: Create a client profile (authenticated)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               heightCm:
 *                 type: number
 *               weightKg:
 *                 type: number
 *               goals:
 *                 type: array
 *                 items:
 *                   type: string
 *               assignedTrainerId:
 *                 type: string
 *           example:
 *             name: "Aman Singh"
 *             age: 27
 *             heightCm: 178
 *             weightKg: 72
 *             goals: ["build muscle","improve endurance"]
 *             assignedTrainerId: null
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized — missing or invalid token
 *
 * /clients/{id}:
 *   get:
 *     summary: Get client profile
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Client object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Not found
 *
 *   patch:
 *     summary: Update client (owner only)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               heightCm:
 *                 type: number
 *               weightKg:
 *                 type: number
 *               goals:
 *                 type: array
 *                 items:
 *                   type: string
 *               assignedTrainerId:
 *                 type: string
 *           example:
 *             weightKg: 74
 *             goals: ["build muscle","increase flexibility"]
 *     responses:
 *       200:
 *         description: Updated
 *       401:
 *         description: Unauthorized — missing or invalid token
 *       403:
 *         description: Forbidden — authenticated but not the owner
 *       404:
 *         description: Not found
 *
 *   delete:
 *     summary: Delete client (owner only)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: No content
 *       401:
 *         description: Unauthorized — missing or invalid token
 *       403:
 *         description: Forbidden — authenticated but not the owner
 *       404:
 *         description: Not found
 *
 * /clients/{id}/assign-trainer:
 *   post:
 *     summary: Assign a trainer to a client (owner only)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainerId:
 *                 type: string
 *             required: [trainerId]
 *           example:
 *             trainerId: "trainer_doc_xyz789"
 *     responses:
 *       200:
 *         description: Updated client
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Bad request — missing trainerId
 *       401:
 *         description: Unauthorized — missing or invalid token
 *       403:
 *         description: Forbidden — authenticated but not the owner
 *       404:
 *         description: Client not found
 */


import { Router } from "express";
import * as ctrl from "../controllers/clients.controller";
import { validate } from "../middleware/validate.middleware";
import { clientSchema } from "../validators/clients.validator";
import { verifyJwt } from "../middleware/jwt.middleware";

const router = Router();

// Create client (auth required)
router.post("/", verifyJwt, validate(clientSchema), ctrl.createClient);

// List clients (public)
router.get("/", ctrl.listClients);

// Get single client (public)
router.get("/:id", ctrl.getClient);

// Update client 
router.patch("/:id", verifyJwt, validate(clientSchema, true), ctrl.updateClient);

// Delete client
router.delete("/:id", verifyJwt, ctrl.deleteClient);

// Assign trainer to client 
router.post("/:id/assign-trainer", verifyJwt, ctrl.assignTrainer);

export default router;

