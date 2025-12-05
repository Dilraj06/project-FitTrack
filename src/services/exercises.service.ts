import * as repo from '../repositories/firestore.repository';
import { Exercise } from '../models/types';

const COLLECTION = 'exercises';

export async function createExercise(payload: Exercise) {
  if (!payload || !payload.name) {
    throw new Error('Exercise name is required');
  }

  const now = new Date().toISOString();
  const doc = { ...payload, createdAt: now };

  return repo.createDoc(COLLECTION, doc);
}

export async function listExercises(
  opts?: { limit?: number; offset?: number; filters?: Record<string, any> }
) {
  return repo.listDocs(COLLECTION, opts);
}


export async function getExercise(id: string) {
  if (!id) return null;
  return repo.getDoc(COLLECTION, id);
}

export async function updateExercise(id: string, payload: Partial<Exercise>) {
  if (!id) throw new Error('id is required for update');
  if (!payload || Object.keys(payload).length === 0) {
    throw new Error('No update payload provided');
  }

  const now = new Date().toISOString();
  const updateData = { ...payload, updatedAt: now };

  return repo.updateDoc(COLLECTION, id, updateData);
}

export async function deleteExercise(id: string) {
  if (!id) throw new Error('id is required for delete');
  return repo.deleteDoc(COLLECTION, id);
}
