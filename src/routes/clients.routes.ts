/**
 * @openapi
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
 *     summary: Create a client profile
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *           examples:
 *             example:
 *               $ref: '#/components/examples/ClientExample'
 *     responses:
 *       201:
 *         description: Created
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
 *       404:
 *         description: Not found
 *
 *   patch:
 *     summary: Update client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Updated
 *
 *   delete:
 *     summary: Delete client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: No content
 *
 * /clients/{id}/assign-trainer:
 *   post:
 *     summary: Assign a trainer to a client (updates client's assignedTrainerId)
 *     tags: [Clients]
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
 *     responses:
 *       200:
 *         description: Updated client
 */

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
