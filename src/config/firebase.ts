import admin from 'firebase-admin';
import path from 'path';

const keyPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!admin.apps.length) {
  if (keyPath) {
    const serviceAccount = require(path.resolve(keyPath));
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  } else {
    admin.initializeApp();
  }
}

export const firestore = admin.firestore();
export const auth = admin.auth();
