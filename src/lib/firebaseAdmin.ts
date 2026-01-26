import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

let cachedApp: ReturnType<typeof initializeApp> | null = null;

function getAdminApp() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  
  // Handle private key: undefined check, then remove wrapping quotes, then fix newlines
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    const missing = [];
    if (!projectId) missing.push("FIREBASE_PROJECT_ID");
    if (!clientEmail) missing.push("FIREBASE_CLIENT_EMAIL");
    if (!privateKey) missing.push("FIREBASE_PRIVATE_KEY");
    
    throw new Error(
      `Missing Firestore credentials: ${missing.join(", ")}`
    );
  }

  // Remove wrapping quotes if they exist (sometimes copy-paste error)
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }
  
  // Replace literal \n with actual newlines
  privateKey = privateKey.replace(/\\n/g, "\n");

  if (cachedApp) {
    return cachedApp;
  }

  try {
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
  } catch (error) {
    console.error("Firebase Admin Initialization Error:", error);
    throw error;
  }
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}

export function getAdminBucket() {
  return getStorage(getAdminApp()).bucket();
}
