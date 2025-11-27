import { firestore } from '../config/firebase';

const collection = (name: string) => firestore.collection(name);

export async function createDoc<T>(collectionName: string, data: T) {
  const ref = await collection(collectionName).add({ ...data, createdAt: new Date().toISOString() });
  const snap = await ref.get();
  return { id: ref.id, ...(snap.data() as T) };
}

export async function getDoc(collectionName: string, id: string) {
  const snap = await collection(collectionName).doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...(snap.data() as any) };
}

export async function listDocs(collectionName: string, opts: { limit?: number; offset?: number; filters?: Record<string, any>; } | undefined) {
  const snaps = await collection(collectionName).get();
  return snaps.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
}

export async function updateDoc(collectionName: string, id: string, data: any) {
  await collection(collectionName).doc(id).update(data);
  const snap = await collection(collectionName).doc(id).get();
  return { id: snap.id, ...(snap.data() as any) };
}

export async function deleteDoc(collectionName: string, id: string) {
  await collection(collectionName).doc(id).delete();
  return { id };
}
