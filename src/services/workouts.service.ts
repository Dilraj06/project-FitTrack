import * as repo from "../repositories/firestore.repository";
import { Workout } from "../models/types";

const COLLECTION = "workouts";

export async function createWorkout(payload: Workout) {
  return repo.createDoc<Workout>(COLLECTION, payload);
}
export async function listWorkouts() {
  return repo.listDocs(COLLECTION);
}
export async function getWorkout(id: string) {
  return repo.getDoc(COLLECTION, id);
}
export async function updateWorkout(id: string, payload: Partial<Workout>) {
  return repo.updateDoc(COLLECTION, id, payload);
}
export async function deleteWorkout(id: string) {
  return repo.deleteDoc(COLLECTION, id);
}
