import { Router } from 'express';
import exercises from './exercises.routes';
import workouts from './workouts.routes';
const router = Router();
router.use('/exercises', exercises);
router.use('/workouts',workouts )
export default router;
