import { Request, Response, NextFunction } from "express";
import * as service from "../services/exercises.service";

function fileToMediaUrl(req: Request) {
  if (!req.file) return undefined;
  return `/uploads/${req.file.filename}`;
}

export async function createExercise(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const mediaUrl = fileToMediaUrl(req);
    const payload = { ...req.body } as any;
    if (mediaUrl) payload.mediaUrl = mediaUrl;
    const result = await service.createExercise(payload);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}


export async function listExercises(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await service.listExercises();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getExercise(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const item = await service.getExercise(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function updateExercise(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const mediaUrl = fileToMediaUrl(req);
    const payload = { ...req.body } as any;
    if (mediaUrl) payload.mediaUrl = mediaUrl;

    const updated = await service.updateExercise(req.params.id, payload);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    return res.json(updated);
  } catch (err) {
    next(err);
  }
}



export async function deleteExercise(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await service.deleteExercise(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
}
