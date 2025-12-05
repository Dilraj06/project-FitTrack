import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

let serviceAccount: any = null;

if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
  const resolved = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Service account file not found at: ${resolved}`);
  }
  serviceAccount = JSON.parse(fs.readFileSync(resolved, 'utf8'));
}

else if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
}



if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firestore = admin.firestore();
export const auth = admin.auth();
export default admin;
