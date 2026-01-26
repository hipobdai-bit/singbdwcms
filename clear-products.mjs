/**
 * Clear All Products
 * 
 * This script removes all products from Firestore and Firebase Storage
 * Run with: npm run clear-products
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { config } from 'dotenv';

config({ path: '.env.local' });

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`;

if (!projectId || !clientEmail || !privateKey) {
  console.error('❌ Missing Firebase credentials in .env.local');
  process.exit(1);
}

const app = initializeApp({
  credential: cert({
    projectId,
    clientEmail,
    privateKey,
  }),
  storageBucket,
});

const db = getFirestore();
const bucket = getStorage().bucket();

async function clearProducts() {
  console.log('🗑️  Starting product cleanup...\n');
  
  // 1. Delete all products from Firestore
  console.log('📊 Deleting products from Firestore...');
  const productsSnapshot = await db.collection('products').get();
  const deletePromises = [];
  
  productsSnapshot.forEach(doc => {
    deletePromises.push(doc.ref.delete());
  });
  
  await Promise.all(deletePromises);
  console.log(`   ✅ Deleted ${productsSnapshot.size} products from Firestore\n`);
  
  // 2. Delete all files from products/ folder in Storage
  console.log('📁 Deleting images from Storage (products/ folder)...');
  const [files] = await bucket.getFiles({ prefix: 'products/' });
  
  const storageDeletePromises = files.map(file => file.delete());
  await Promise.all(storageDeletePromises);
  console.log(`   ✅ Deleted ${files.length} images from Storage\n`);
  
  console.log('✅ Cleanup complete!');
  console.log('\n💡 Next step: Run "npm run upload-products" to add fresh products');
}

clearProducts()
  .then(() => {
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Cleanup failed:', error);
    process.exit(1);
  });
