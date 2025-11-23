/**
 * @openapi
 * /workouts:
 *   get:
 *     summary: List workouts
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: Array of workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workout'
 *
 *   post:
 *     summary: Create a workout
 *     tags: [Workouts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *           examples:
 *             workout:
 *               $ref: '#/components/examples/WorkoutExample'
 *     responses:
 *       201:
 *         description: Created workout
 *
 * /workouts/{id}:
 *   get:
 *     summary: Get workout by id
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Workout object
 *       404:
 *         description: Not found
 *
 *   patch:
 *     summary: Update workout
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       200:
 *         description: Updated
 *
 *   delete:
 *     summary: Delete workout
 *     tags: [Workouts]
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
import * as ctrl from '../controllers/workouts.controller';
import { validate } from '../middleware/validate.middleware';
import { workoutSchema } from '../validators/workouts.validator';

const router = Router();
router.post('/', validate(workoutSchema), ctrl.createWorkout);
router.get('/', ctrl.listWorkouts);
router.get('/:id', ctrl.getWorkout);
router.patch('/:id', validate(workoutSchema, true), ctrl.updateWorkout);
router.delete('/:id', ctrl.deleteWorkout);
export default router;
