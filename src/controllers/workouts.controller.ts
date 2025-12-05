import { Request, Response, NextFunction } from "express";
import * as svc from "../services/workouts.service";

export async function createWorkout(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = { ...req.body };

    
    if (req.user && req.user.uid) {
      payload.creatorId = req.user.uid;
    }

    const created = await svc.createWorkout(payload);
    return res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function listWorkouts(req: Request, res: Response, next: NextFunction) {
  try {
    const list = await svc.listWorkouts();
    return res.json(list);
  } catch (err) {
    next(err);
  }
}

export async function getWorkout(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await svc.getWorkout(req.params.id);
    if (!item) return res.status(404).json({ message: "Workout not found" });
    return res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function updateWorkout(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const existing = await svc.getWorkout(id);

    if (!existing) return res.status(404).json({ message: "Workout not found" });

    // Ownership check 
    const uid = req.user?.uid;
    if (existing.creatorId && existing.creatorId !== uid) {
      return res.status(403).json({ message: "Forbidden — not the workout owner" });
    }

    const updated = await svc.updateWorkout(id, req.body);
    return res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteWorkout(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const existing = await svc.getWorkout(id);

    if (!existing) return res.status(404).json({ message: "Workout not found" });

    // Ownership check
    const uid = req.user?.uid;
    if (existing.creatorId && existing.creatorId !== uid) {
      return res.status(403).json({ message: "Forbidden — not the workout owner" });
    }

    await svc.deleteWorkout(id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}
