/**
 * Firebase Storage Permission Test Script
 * 
 * This script tests if images uploaded to Firebase Storage are publicly accessible.
 * Run this with: node test-storage-permissions.mjs
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

// Load environment variables
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

console.log('🔍 Testing Firebase Storage configuration...\n');

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert({
    projectId,
    clientEmail,
    privateKey,
  }),
  storageBucket,
});

const bucket = getStorage().bucket();

console.log(`📦 Bucket: ${bucket.name}\n`);

async function testStoragePermissions() {
  try {
    // List files in the products folder
    console.log('📂 Listing files in "products" folder...');
    const [files] = await bucket.getFiles({ prefix: 'products/' });
    
    if (files.length === 0) {
      console.log('⚠️  No files found in products folder');
      return;
    }

    console.log(`✅ Found ${files.length} file(s)\n`);

    // Test the first file
    const file = files[0];
    console.log(`🖼️  Testing file: ${file.name}`);

    // Check if file is public
    const [metadata] = await file.getMetadata();
    const isPublic = metadata.acl?.some(
      acl => acl.entity === 'allUsers' && acl.role === 'READER'
    );

    console.log(`   Public: ${isPublic ? '✅ Yes' : '❌ No'}`);

    // Get the public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(file.name).replace(/%2F/g, '/')}`;
    console.log(`   URL: ${publicUrl}\n`);

    if (!isPublic) {
      console.log('🔧 Making file public...');
      await file.makePublic();
      console.log('✅ File is now public!\n');
    }

    // Test making all files in products folder public
    console.log('🔧 Making all files in products folder public...');
    let count = 0;
    for (const file of files) {
      try {
        await file.makePublic();
        count++;
      } catch (error) {
        console.error(`   ❌ Failed to make ${file.name} public:`, error.message);
      }
    }
    console.log(`✅ Made ${count} file(s) public\n`);

    console.log('📋 CORS Configuration Instructions:');
    console.log('   Since gcloud CLI is not installed, configure CORS manually:');
    console.log('   1. Go to: https://console.cloud.google.com/storage/browser');
    console.log(`   2. Select bucket: ${bucket.name}`);
    console.log('   3. Click "Permissions" tab');
    console.log('   4. Under "Public access", grant "allUsers" the "Storage Object Viewer" role');
    console.log('   5. Go to "Configuration" tab and set CORS to:');
    console.log('      [{"origin": ["*"], "method": ["GET", "HEAD"], "maxAgeSeconds": 3600}]');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testStoragePermissions()
  .then(() => {
    console.log('\n✅ Test complete!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  });
