/**
 * Fix CORS for Firebase Storage
 * 
 * This script sets CORS configuration on the Firebase Storage bucket
 * Run with: npm run fix-cors
 */

import { initializeApp, cert } from 'firebase-admin/app';
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

const bucket = getStorage().bucket();

async function fixCors() {
  console.log('🔧 Configuring CORS for Firebase Storage bucket...\n');
  console.log(`📦 Bucket: ${bucket.name}\n`);
  
  try {
    // Set CORS configuration
    await bucket.setCorsConfiguration([
      {
        origin: ['*'],
        method: ['GET', 'HEAD'],
        maxAgeSeconds: 3600,
      }
    ]);
    
    console.log('✅ CORS configuration applied successfully!');
    console.log('\n💡 CORS Settings:');
    console.log('   - Origin: * (all origins allowed)');
    console.log('   - Methods: GET, HEAD');
    console.log('   - Max Age: 3600 seconds');
    console.log('\n🎉 Your images should now load without CORS errors!');
    
  } catch (error) {
    console.error('❌ Failed to set CORS configuration:', error);
    console.log('\n⚠️  Alternative method:');
    console.log('   Install Google Cloud SDK and run:');
    console.log(`   gsutil cors set cors.json gs://${bucket.name}`);
    process.exit(1);
  }
}

fixCors()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
