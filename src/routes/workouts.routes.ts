/**
 * @openapi
 * tags:
 *   - name: Workouts
 *     description: Workout creation, listing, and user-specific ownership controls
 *
 * /workouts:
 *   get:
 *     summary: List all workouts
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
 *     summary: Create a workout (authenticated)
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     exerciseId:
 *                       type: string
 *                     order:
 *                       type: integer
 *                     reps:
 *                       type: integer
 *                     sets:
 *                       type: integer
 *                     restSeconds:
 *                       type: integer
 *               visibility:
 *                 type: string
 *                 enum: [public, private]
 *           example:
 *             title: "Full Body Beginner Workout"
 *             description: "A simple full-body routine for beginners"
 *             exercises:
 *               - exerciseId: "abc123"
 *                 order: 1
 *                 reps: 12
 *                 sets: 3
 *                 restSeconds: 60
 *             visibility: "private"
 *     responses:
 *       201:
 *         description: Workout created
 *       401:
 *         description: Unauthorized — missing or invalid token
 *
 * /workouts/{id}:
 *   get:
 *     summary: Get workout by ID
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workout object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Not found
 *
 *   patch:
 *     summary: Update a workout (owner only)
 *     tags: [Workouts]
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *               visibility:
 *                 type: string
 *                 enum: [public, private]
 *     responses:
 *       200:
 *         description: Updated workout
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden — only the creator may update
 *       404:
 *         description: Workout not found
 *
 *   delete:
 *     summary: Delete a workout (owner only)
 *     tags: [Workouts]
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
 *         description: Workout deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden — only the creator may delete
 *       404:
 *         description: Workout not found
 */


import { Router } from 'express';
import * as ctrl from '../controllers/workouts.controller';
import { validate } from '../middleware/validate.middleware';
import { workoutSchema } from '../validators/workouts.validator';
import { verifyJwt } from '../middleware/jwt.middleware';

const router = Router();

//  must be logged in
router.post('/', verifyJwt, validate(workoutSchema), ctrl.createWorkout);

// Public
router.get('/', ctrl.listWorkouts);
router.get('/:id', ctrl.getWorkout);

// owner only
router.patch('/:id', verifyJwt, validate(workoutSchema, true), ctrl.updateWorkout);
router.delete('/:id', verifyJwt, ctrl.deleteWorkout);

export default router;

