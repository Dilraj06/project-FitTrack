import { Request, Response, NextFunction } from "express";
import * as svc from "../services/workouts.service";

export async function createWorkout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const r = await svc.createWorkout(req.body);
    res.status(201).json(r);
  } catch (err) {
    next(err);
  }
}
export async function listWorkouts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await svc.listWorkouts());
  } catch (err) {
    next(err);
  }
}
export async function getWorkout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const i = await svc.getWorkout(req.params.id);
    if (!i) return res.status(404).send();
    res.json(i);
  } catch (err) {
    next(err);
  }
}
export async function updateWorkout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await svc.updateWorkout(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
}
export async function deleteWorkout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await svc.deleteWorkout(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
