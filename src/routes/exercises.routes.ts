/**
 * @openapi
 * tags:
 *   - name: Exercises
 *     description: Exercise management (CRUD + File Upload)
 *
 * /exercises:
 *   get:
 *     summary: List all exercises
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: Array of exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 *
 *   post:
 *     summary: Create a new exercise (authenticated, with optional file upload)
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Push Up
 *               description:
 *                 type: string
 *               muscles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["chest", "triceps"]
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *                 example: easy
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Optional image upload for exercise
 *     responses:
 *       201:
 *         description: Created exercise
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       401:
 *         description: Unauthorized — missing or invalid token
 *
 * /exercises/{id}:
 *   get:
 *     summary: Get exercise by ID
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Exercise found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       404:
 *         description: Exercise not found
 *
 *   patch:
 *     summary: Update an exercise (creator only)
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               muscles:
 *                 type: array
 *                 items:
 *                   type: string
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Optional new file upload to replace existing media
 *     responses:
 *       200:
 *         description: Exercise updated
 *       401:
 *         description: Unauthorized — missing or invalid token
 *       403:
 *         description: Forbidden — only the creator may update
 *       404:
 *         description: Exercise not found
 *
 *   delete:
 *     summary: Delete exercise (creator only)
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Exercise deleted
 *       401:
 *         description: Unauthorized — missing or invalid token
 *       403:
 *         description: Forbidden — only the creator may delete
 *       404:
 *         description: Exercise not found
 */



import { Router } from 'express';
import * as ctrl from '../controllers/exercises.controller';
import { validate } from '../middleware/validate.middleware';
import { exerciseSchema } from '../validators/exercises.validator';
import upload from '../middleware/multer.middleware';
import { verifyJwt } from '../middleware/jwt.middleware';
const router = Router();

router.post('/', verifyJwt, upload.single('media'), validate(exerciseSchema), ctrl.createExercise);
router.get('/', ctrl.listExercises);
router.get('/:id', ctrl.getExercise);
router.patch('/:id', verifyJwt, upload.single('media'), validate(exerciseSchema, true), ctrl.updateExercise);
router.delete('/:id', verifyJwt, ctrl.deleteExercise);

export default router;
