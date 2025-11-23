import * as repo from "../repositories/firestore.repository";
import { Client } from "../models/types";

const COLLECTION = "clients";

export async function createClient(payload: Client) {
  return repo.createDoc<Client>(COLLECTION, payload);
}

export async function listClients() {
  return repo.listDocs(COLLECTION);
}

export async function getClient(id: string) {
  return repo.getDoc(COLLECTION, id);
}

export async function updateClient(id: string, payload: Partial<Client>) {
  return repo.updateDoc(COLLECTION, id, payload);
}

export async function deleteClient(id: string) {
  return repo.deleteDoc(COLLECTION, id);
}

export async function assignTrainer(clientId: string, trainerId: string) {
  return repo.updateDoc(COLLECTION, clientId, { assignedTrainerId: trainerId });
}
