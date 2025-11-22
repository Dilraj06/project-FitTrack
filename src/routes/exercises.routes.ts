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
