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
