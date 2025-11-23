import { Request, Response, NextFunction } from "express";
import * as svc from "../services/clients.service";

export async function createClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const c = await svc.createClient(req.body);
    res.status(201).json(c);
  } catch (err) {
    next(err);
  }
}

export async function listClients(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await svc.listClients());
  } catch (err) {
    next(err);
  }
}

export async function getClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const c = await svc.getClient(req.params.id);
    if (!c) return res.status(404).json({ message: "Client not found" });
    res.json(c);
  } catch (err) {
    next(err);
  }
}

export async function updateClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await svc.updateClient(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
}

export async function deleteClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await svc.deleteClient(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function assignTrainer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const updated = await svc.assignTrainer(req.params.id, req.body.trainerId);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}
