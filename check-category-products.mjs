/**
 * Check Products by Category
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';

config({ path: '.env.local' });

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

const app = initializeApp({
  credential: cert({
    projectId,
    clientEmail,
    privateKey,
  }),
});

const db = getFirestore();

async function checkProducts() {
  console.log('🔍 Checking products by category...\n');
  
  const categories = ['woven-tops', 'woven-bottoms', 'coats-jackets', 'denim', 'knitwear'];
  
  for (const cat of categories) {
    const snapshot = await db.collection('products').where('categorySlug', '==', cat).get();
    console.log(`📂 ${cat}: ${snapshot.size} products`);
    if (snapshot.size > 0 && snapshot.size <= 5) {
      snapshot.forEach(doc => {
        const data = doc.data();
        console.log(`   - ${data.name}`);
      });
    }
  }
}

checkProducts()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
