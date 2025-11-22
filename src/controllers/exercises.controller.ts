import { Request, Response, NextFunction } from 'express';
import * as service from '../services/exercises.service';

export async function createExercise(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await service.createExercise(req.body);
    res.json(result);
  } catch (err) { next(err); }
}

export async function listExercises(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.listExercises();
    res.json(data);
  } catch (err) { next(err); }
}

export async function getExercise(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await service.getExercise(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
}

export async function updateExercise(req: Request, res: Response, next: NextFunction) {
  try {
    const updated = await service.updateExercise(req.params.id, req.body);
    res.json(updated);
  } catch (err) { next(err); }
}

export async function deleteExercise(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deleteExercise(req.params.id);
    res.send();
  } catch (err) { next(err); }
}
