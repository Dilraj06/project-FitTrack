/**
 * @openapi
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
 *     summary: Create a new exercise 
 *     tags: [Exercises]
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
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Image file upload
 *     responses:
 *       201:
 *         description: Created exercise
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *
 * /exercises/{id}:
 *   get:
 *     summary: Get exercise by id
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
 *         description: Not found
 *
 *   patch:
 *     summary: Update an exercise 
 *     tags: [Exercises]
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
 *                 description: Optional new image file
 *     responses:
 *       200:
 *         description: Updated exercise
 *
 *   delete:
 *     summary: Delete exercise
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 */

import { Router } from 'express';
import * as ctrl from '../controllers/exercises.controller';
import { validate } from '../middleware/validate.middleware';
import { exerciseSchema } from '../validators/exercises.validator';
import upload from '../middleware/multer.middleware';

const router = Router();
router.post('/', upload.single('media'), validate(exerciseSchema), ctrl.createExercise);

router.get('/', ctrl.listExercises);
router.get('/:id', ctrl.getExercise);
router.patch('/:id', upload.single('media'), validate(exerciseSchema, true), ctrl.updateExercise);
router.delete('/:id', ctrl.deleteExercise);

export default router;
