import * as repo from "../repositories/firestore.repository";
import { TrainerProfile } from "../models/types";

const COLLECTION = "trainers";

export async function createProfile(payload: TrainerProfile) {
  return repo.createDoc<TrainerProfile>(COLLECTION, payload);
}
export async function getProfile(id: string) {
  return repo.getDoc(COLLECTION, id);
}
export async function listProfiles() {
  return repo.listDocs(COLLECTION);
}
export async function updateProfile(id: string, data: Partial<TrainerProfile>) {
  return repo.updateDoc(COLLECTION, id, data);
}
export async function deleteProfile(id: string) {
  return repo.deleteDoc(COLLECTION, id);
}
export async function assignClient(trainerId: string, clientId: string) {
  const profile = await getProfile(trainerId);
  const clients = (profile?.clients as string[] | undefined) || [];
  if (!clients.includes(clientId)) clients.push(clientId);
  return updateProfile(trainerId, { clients });
}
