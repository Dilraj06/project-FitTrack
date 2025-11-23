import * as repo from '../repositories/firestore.repository';
import { Exercise } from '../models/types';

const COLLECTION = 'exercises';

export async function createExercise(payload: Exercise) {
  if (!payload.name) throw new Error('Exercise name is required');
  return repo.createDoc<Exercise>(COLLECTION, payload);
}

export async function listExercises() {
  return repo.listDocs(COLLECTION);
}

export async function getExercise(id: string) {
  return repo.getDoc(COLLECTION, id);
}

export async function updateExercise(id: string, payload: Partial<Exercise>) {
  return repo.updateDoc(COLLECTION, id, payload);
}

export async function deleteExercise(id: string) {
  return repo.deleteDoc(COLLECTION, id);
}
