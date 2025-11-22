import { Router } from 'express';
import exercises from './exercises.routes';
import workouts from './workouts.routes';
import trainers from './trainers.routes'
import clients from './clients.routes'
const router = Router();
router.use('/exercises', exercises);
router.use('/workouts',workouts )
router.use('/trainers',trainers)
router.use('/clients', clients);
export default router;
