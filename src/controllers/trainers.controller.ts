import { Request, Response, NextFunction } from "express";
import * as svc from "../services/trainers.service";

/**
 * Create trainer profile
 * requires authentication 
 */
export async function createProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const uid = req.user && (req.user as any).uid;
    if (!uid) return res.status(401).json({ message: "Unauthorized" });

    const payload = { ...req.body } as any;
    payload.userId = uid;

    const created = await svc.createProfile(payload);
    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
}


export async function listProfiles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await svc.listProfiles();
    return res.json(data);
  } catch (err) {
    return next(err);
  }
}


export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const p = await svc.getProfile(req.params.id);
    if (!p) return res.status(404).send();
    return res.json(p);
  } catch (err) {
    return next(err);
  }
}

export async function assignClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const uid = req.user && (req.user as any).uid;
    if (!uid) return res.status(401).json({ message: "Unauthorized" });

    const trainerId = req.params.trainerId;
    const { clientId } = req.body;
    if (!clientId) return res.status(400).json({ message: "clientId is required" });


    const trainer = await svc.getProfile(trainerId);
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });

    if (!trainer.userId) {
      return res.status(403).json({ message: "Forbidden: trainer has no owner" });
    }

    if (trainer.userId !== uid) {
      return res.status(403).json({ message: "Forbidden: only the trainer owner may assign clients" });
    }

    const result = await svc.assignClient(trainerId, clientId);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
}
