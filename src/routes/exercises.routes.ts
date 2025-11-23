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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *           examples:
 *             example:
 *               $ref: '#/components/examples/ExerciseExample'
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
 *         schema: { type: string }
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
 *     summary: Update exercise
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *     responses:
 *       200:
 *         description: Updated
 *
 *   delete:
 *     summary: Delete exercise
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: No content
 */

import { Router } from 'express';
import * as ctrl from '../controllers/exercises.controller';
import { validate } from '../middleware/validate.middleware';
import { exerciseSchema } from '../validators/exercises.validator';

const router = Router();

router.post('/', validate(exerciseSchema), ctrl.createExercise);
router.get('/', ctrl.listExercises);
router.get('/:id', ctrl.getExercise);
router.patch('/:id', validate(exerciseSchema, true), ctrl.updateExercise);
router.delete('/:id', ctrl.deleteExercise);

export default router;
