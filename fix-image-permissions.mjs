/**
 * Fix Image Permissions Script
 * 
 * Makes all uploaded images in Firebase Storage publicly accessible
 * Run with: npm run fix-images
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

async function makeAllImagesPublic() {
  console.log('🔧 Making all images publicly accessible...\n');
  
  const folders = ['products', 'clients', 'certifications'];
  let totalFixed = 0;

  for (const folder of folders) {
    console.log(`📂 Processing ${folder}/...`);
    const [files] = await bucket.getFiles({ prefix: `${folder}/` });
    
    let count = 0;
    for (const file of files) {
      // Skip folders (they end with /)
      if (file.name.endsWith('/')) continue;
      
      try {
        await file.makePublic();
        count++;
        console.log(`   ✅ ${file.name}`);
      } catch (error) {
        console.error(`   ❌ Failed: ${file.name} - ${error.message}`);
      }
    }
    
    console.log(`   📊 Made ${count} file(s) public in ${folder}\n`);
    totalFixed += count;
  }

  console.log(`✅ Total files made public: ${totalFixed}`);
}

makeAllImagesPublic()
  .then(() => {
    console.log('\n🎉 Done! All images should now be visible on your website.');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Error:', error);
    process.exit(1);
  });
