import { Request, Response, NextFunction } from 'express';
import * as service from '../services/exercises.service';

function fileToMediaUrl(req: Request) {
  if (!req.file) return undefined;
  return `/uploads/${req.file.filename}`;
}

export async function createExercise(req: Request, res: Response, next: NextFunction) {
  try {
    const mediaUrl = fileToMediaUrl(req);
    const payload = { ...req.body } as any;

    if (mediaUrl) payload.mediaUrl = mediaUrl;

    // If user is authenticated
    if (req.user && (req.user as any).uid) {
      payload.creatorId = (req.user as any).uid;
    } else {

      return res.status(401).json({ message: 'Unauthorized' });
    }

    const result = await service.createExercise(payload);
    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
}

export async function listExercises(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const offset = req.query.offset ? Number(req.query.offset) : undefined;
    const filters: Record<string, any> = {};
    if (req.query.difficulty) filters.difficulty = req.query.difficulty;
    const opts = (limit || offset || Object.keys(filters).length) ? { limit, offset, filters } : undefined;

    const data = await service.listExercises(opts as any);
    return res.json(data);
  } catch (err) {
    return next(err);
  }
}

export async function getExercise(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const item = await service.getExercise(id);
    if (!item) return res.status(404).json({ message: 'Exercise not found' });
    return res.json(item);
  } catch (err) {
    return next(err);
  }
}

export async function updateExercise(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const existing = await service.getExercise(id);
    if (!existing) return res.status(404).json({ message: 'Exercise not found' });

    const uid = req.user && (req.user as any).uid;
    if (!uid) return res.status(401).json({ message: 'Unauthorized' });


    if (!existing.creatorId) {
      return res.status(403).json({ message: 'Forbidden: No creator assigned' });
    }

    if (existing.creatorId !== uid) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const mediaUrl = fileToMediaUrl(req);
    const payload = { ...req.body } as any;
    if (mediaUrl) payload.mediaUrl = mediaUrl;

    const updated = await service.updateExercise(id, payload);
    if (!updated) return res.status(404).json({ message: 'Exercise not found' });
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
}

export async function deleteExercise(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const existing = await service.getExercise(id);
    if (!existing) return res.status(404).json({ message: 'Exercise not found' });

    const uid = req.user && (req.user as any).uid;
    if (!uid) return res.status(401).json({ message: 'Unauthorized' });

    if (!existing.creatorId) {
      return res.status(403).json({ message: 'Forbidden: No creator assigned' });
    }

    if (existing.creatorId !== uid) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const result = await service.deleteExercise(id);
    if (!result) return res.status(404).json({ message: 'Exercise not found' });

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}
