/**
 * Check Firebase Setup Status
 * 
 * Verifies that Firestore and Storage are properly configured
 * Run with: npm run check-setup
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

console.log('🔍 Checking Firebase Setup...\n');

// Check credentials
console.log('📋 Environment Variables:');
console.log(`   FIREBASE_PROJECT_ID: ${projectId ? '✅' : '❌ Missing'}`);
console.log(`   FIREBASE_CLIENT_EMAIL: ${clientEmail ? '✅' : '❌ Missing'}`);
console.log(`   FIREBASE_PRIVATE_KEY: ${privateKey ? '✅' : '❌ Missing'}`);
console.log(`   FIREBASE_STORAGE_BUCKET: ${storageBucket}\n`);

if (!projectId || !clientEmail || !privateKey) {
  console.error('❌ Missing Firebase credentials. Check your .env.local file.\n');
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

async function checkSetup() {
  try {
    // Check categories
    console.log('📂 Checking Firestore Categories:');
    const categoriesSnapshot = await db.collection('categories').get();
    console.log(`   Categories found: ${categoriesSnapshot.size}`);
    
    if (categoriesSnapshot.size === 0) {
      console.log('   ⚠️  No categories found. Run: npm run init-categories\n');
    } else {
      console.log('   ✅ Categories initialized\n');
      categoriesSnapshot.docs.slice(0, 3).forEach(doc => {
        console.log(`      • ${doc.data().name} (${doc.id})`);
      });
      if (categoriesSnapshot.size > 3) {
        console.log(`      ... and ${categoriesSnapshot.size - 3} more\n`);
      } else {
        console.log('');
      }
    }

    // Check products
    console.log('🛍️  Checking Firestore Products:');
    const productsSnapshot = await db.collection('products').get();
    console.log(`   Products found: ${productsSnapshot.size}`);
    
    if (productsSnapshot.size === 0) {
      console.log('   ℹ️  No products yet. Upload from admin panel.\n');
    } else {
      console.log('   ✅ Products in database\n');
      productsSnapshot.docs.slice(0, 3).forEach(doc => {
        const data = doc.data();
        console.log(`      • ${data.name} (${data.categorySlug})`);
      });
      if (productsSnapshot.size > 3) {
        console.log(`      ... and ${productsSnapshot.size - 3} more\n`);
      } else {
        console.log('');
      }
    }

    // Check storage
    console.log('🖼️  Checking Firebase Storage:');
    console.log(`   Bucket: ${bucket.name}`);
    
    const [files] = await bucket.getFiles({ prefix: 'products/' });
    console.log(`   Product images: ${files.length}`);
    
    let publicCount = 0;
    if (files.length === 0) {
      console.log('   ℹ️  No images uploaded yet.\n');
    } else {
      console.log('   ✅ Images in storage\n');
      
      // Check if images are public
      for (const file of files.slice(0, 3)) {
        if (file.name.endsWith('/')) continue;
        const [metadata] = await file.getMetadata();
        const isPublic = metadata.acl?.some(
          acl => acl.entity === 'allUsers' && acl.role === 'READER'
        );
        if (isPublic) publicCount++;
        
        console.log(`      • ${file.name} - ${isPublic ? '✅ Public' : '❌ Not public'}`);
      }
      
      if (publicCount < Math.min(3, files.length)) {
        console.log('\n   ⚠️  Some images are not public. Run: npm run fix-images\n');
      } else {
        console.log('');
      }
    }

    // Check clients
    console.log('🏢 Checking Client Logos:');
    const clientsSnapshot = await db.collection('clients').get();
    console.log(`   Clients found: ${clientsSnapshot.size}\n`);

    // Check certifications
    console.log('🏆 Checking Certifications:');
    const certsSnapshot = await db.collection('certifications').get();
    console.log(`   Certifications found: ${certsSnapshot.size}\n`);

    // Summary
    console.log('📊 Summary:');
    console.log(`   ✅ Firebase connection: Working`);
    console.log(`   ${categoriesSnapshot.size >= 10 ? '✅' : '⚠️ '} Categories: ${categoriesSnapshot.size >= 10 ? 'Initialized' : 'Need to run init-categories'}`);
    console.log(`   ${productsSnapshot.size > 0 ? '✅' : 'ℹ️ '} Products: ${productsSnapshot.size > 0 ? productsSnapshot.size + ' uploaded' : 'None yet'}`);
    console.log(`   ${files.length > 0 ? '✅' : 'ℹ️ '} Storage: ${files.length > 0 ? files.length + ' files' : 'Empty'}`);
    
    console.log('\n💡 Next Steps:');
    if (categoriesSnapshot.size < 10) {
      console.log('   1. Run: npm run init-categories');
    }
    if (files.length > 0 && publicCount < files.length) {
      console.log('   2. Run: npm run fix-images');
    }
    if (categoriesSnapshot.size >= 10 && productsSnapshot.size === 0) {
      console.log('   1. Go to http://localhost:3000/admin');
      console.log('   2. Upload products');
    }
    if (categoriesSnapshot.size >= 10 && productsSnapshot.size > 0) {
      console.log('   ✅ Everything looks good!');
      console.log('   • Visit http://localhost:3000/products');
      console.log('   • Visit http://localhost:3000/products/woven-tops');
    }

  } catch (error) {
    console.error('\n❌ Error checking setup:', error.message);
    process.exit(1);
  }
}

checkSetup()
  .then(() => {
    console.log('\n✅ Setup check complete!\n');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Setup check failed:', error);
    process.exit(1);
  });
