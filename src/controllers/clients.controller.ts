import { Request, Response, NextFunction } from "express";
import * as svc from "../services/clients.service";

function assertOwnership(req: Request, resourceUserId?: string) {
  const uid = req.user?.uid;
  if (!uid) return { ok: false, message: "Unauthorized" };

  if (resourceUserId && uid !== resourceUserId) {
    return { ok: false, message: "Forbidden: You do not own this resource" };
  }
  return { ok: true };
}

export async function createClient(req: Request, res: Response, next: NextFunction) {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ message: "Unauthorized" });

    const payload = { ...req.body, userId: uid };
    const client = await svc.createClient(payload);
    return res.status(201).json(client);
  } catch (err) {
    next(err);
  }
}

export async function listClients(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await svc.listClients());
  } catch (err) {
    next(err);
  }
}

export async function getClient(req: Request, res: Response, next: NextFunction) {
  try {
    const c = await svc.getClient(req.params.id);
    if (!c) return res.status(404).json({ message: "Client not found" });
    res.json(c);
  } catch (err) {
    next(err);
  }
}

export async function updateClient(req: Request, res: Response, next: NextFunction) {
  try {
    const existing = await svc.getClient(req.params.id);
    if (!existing) return res.status(404).json({ message: "Client not found" });

    // Ownership check
    const check = assertOwnership(req, existing.userId);
    if (!check.ok) return res.status(403).json({ message: check.message });

    const updated = await svc.updateClient(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteClient(req: Request, res: Response, next: NextFunction) {
  try {
    const existing = await svc.getClient(req.params.id);
    if (!existing) return res.status(404).json({ message: "Client not found" });

    // Ownership check
    const check = assertOwnership(req, existing.userId);
    if (!check.ok) return res.status(403).json({ message: check.message });

    await svc.deleteClient(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function assignTrainer(req: Request, res: Response, next: NextFunction) {
  try {
    const existing = await svc.getClient(req.params.id);
    if (!existing) return res.status(404).json({ message: "Client not found" });

    // Ownership check
    const check = assertOwnership(req, existing.userId);
    if (!check.ok) return res.status(403).json({ message: check.message });

    const updated = await svc.assignTrainer(req.params.id, req.body.trainerId);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}
