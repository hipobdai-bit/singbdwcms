import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

let cachedApp: ReturnType<typeof initializeApp> | null = null;

function getAdminApp() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firestore credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY."
    );
  }

  if (cachedApp) {
    return cachedApp;
  }

  const storageBucket =
    process.env.FIREBASE_STORAGE_BUCKET ?? `${projectId}.appspot.com`;

  cachedApp =
    getApps().length > 0
      ? getApps()[0]
      : initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
          storageBucket,
        });

  return cachedApp;
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}

export function getAdminBucket() {
  return getStorage(getAdminApp()).bucket();
}
