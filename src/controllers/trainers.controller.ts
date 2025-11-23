import { Request, Response, NextFunction } from "express";
import * as svc from "../services/trainers.service";

export async function createProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.status(201).json(await svc.createProfile(req.body));
  } catch (err) {
    next(err);
  }
}
export async function listProfiles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await svc.listProfiles());
  } catch (err) {
    next(err);
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
    res.json(p);
  } catch (err) {
    next(err);
  }
}
export async function assignClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { trainerId } = req.params;
    const { clientId } = req.body;
    const r = await svc.assignClient(trainerId, clientId);
    res.json(r);
  } catch (err) {
    next(err);
  }
}
