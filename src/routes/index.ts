import { Router } from 'express';
import exercises from './exercises.routes';

const router = Router();
router.use('/exercises', exercises);

export default router;
