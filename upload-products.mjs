/**
 * Upload Products from Local Directory
 * 
 * This script uploads all products from /Users/tzl/Downloads/Products
 * to Firebase Storage and creates Firestore entries
 * 
 * Run with: npm run upload-products
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { config } from 'dotenv';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

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

const PRODUCTS_DIR = '/Users/tzl/Downloads/Products';

// Map folder names to category slugs
const CATEGORY_MAP = {
  'Woven Tops': 'woven-tops',
  'Woven Bottoms': 'woven-bottoms',
  'Coats & Jackets': 'coats-jackets',
  'Denim': 'denim',
  'Kintwear': 'knitwear',
  'Sweater': 'sweater',
  'Sportswear': 'sportswear',
  'Homeware': 'homeware',
  'Handicrafts': 'handicrafts',
  'Workwear': 'workwear',
};

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function cleanProductName(filename) {
  // Remove file extension
  let name = filename.replace(/\.(webp|jpg|jpeg|png)$/i, '');
  
  // Remove numbers in parentheses like (2), (3), etc.
  name = name.replace(/\s*\(\d+\)\s*$/g, '');
  
  // Replace underscores with proper apostrophes
  name = name.replace(/_/g, "'");
  
  return name.trim();
}

async function uploadImage(filePath, categorySlug, productName) {
  try {
    const buffer = readFileSync(filePath);
    const ext = extname(filePath);
    const timestamp = Date.now();
    const safeProductName = slugify(productName);
    const fileName = `products/${timestamp}-${safeProductName}${ext}`;
    
    const file = bucket.file(fileName);
    
    await file.save(buffer, {
      contentType: `image/${ext.slice(1)}`,
      resumable: false,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });
    
    // Make public
    await file.makePublic();
    
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(fileName).replace(/%2F/g, '/')}`;
    
    return publicUrl;
  } catch (error) {
    console.error(`   ❌ Failed to upload image: ${error.message}`);
    throw error;
  }
}

async function uploadProducts() {
  console.log('🚀 Starting product upload from local directory...\n');
  console.log(`📁 Source: ${PRODUCTS_DIR}\n`);
  
  let totalCreated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  let totalUploaded = 0;

  try {
    const categories = readdirSync(PRODUCTS_DIR);
    
    for (const categoryFolder of categories) {
      if (categoryFolder.startsWith('.')) continue; // Skip .DS_Store, etc.
      
      const categoryPath = join(PRODUCTS_DIR, categoryFolder);
      const stats = statSync(categoryPath);
      
      if (!stats.isDirectory()) continue;
      
      const categorySlug = CATEGORY_MAP[categoryFolder];
      
      if (!categorySlug) {
        console.log(`⚠️  Unknown category: ${categoryFolder}, skipping...`);
        continue;
      }
      
      console.log(`📂 Processing: ${categoryFolder} (${categorySlug})`);
      
      const files = readdirSync(categoryPath);
      let categoryCount = 0;
      
      for (const file of files) {
        if (file.startsWith('.')) continue; // Skip hidden files
        
        const ext = extname(file).toLowerCase();
        if (!['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) {
          console.log(`   ⚠️  Skipped: ${file} (not an image)`);
          continue;
        }
        
        const productName = cleanProductName(file);
        const slug = slugify(productName);
        
        try {
          // Check if product already exists
          const existing = await db.collection('products')
            .where('slug', '==', slug)
            .where('categorySlug', '==', categorySlug)
            .limit(1)
            .get();
          
          if (!existing.empty) {
            console.log(`   ⚠️  Skipped: ${productName} (already exists)`);
            totalSkipped++;
            continue;
          }
          
          // Upload image
          const filePath = join(categoryPath, file);
          const imageUrl = await uploadImage(filePath, categorySlug, productName);
          totalUploaded++;
          
          // Create product in Firestore
          await db.collection('products').add({
            name: productName,
            shortDescription: `${productName} from our ${categoryFolder} collection`,
            description: `${productName} from our ${categoryFolder} collection`,
            productCode: '',
            image: imageUrl,
            categorySlug: categorySlug,
            slug: slug,
            isActive: true,
            order: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          
          console.log(`   ✅ ${productName}`);
          totalCreated++;
          categoryCount++;
          
        } catch (error) {
          console.error(`   ❌ Failed: ${productName} - ${error.message}`);
          totalErrors++;
        }
      }
      
      console.log(`   📊 Added ${categoryCount} products to ${categoryFolder}\n`);
    }
    
    console.log('📊 Upload Summary:');
    console.log(`   ✅ Products created: ${totalCreated}`);
    console.log(`   📤 Images uploaded: ${totalUploaded}`);
    console.log(`   ⚠️  Products skipped: ${totalSkipped}`);
    console.log(`   ❌ Errors: ${totalErrors}`);
    
  } catch (error) {
    console.error('\n❌ Upload failed:', error);
    process.exit(1);
  }
}

uploadProducts()
  .then(() => {
    console.log('\n🎉 Upload complete!');
    console.log('\n💡 Next steps:');
    console.log('   1. Visit http://localhost:3000/all-products');
    console.log('   2. Visit http://localhost:3000/products');
    console.log('   3. Check products in admin panel');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Upload failed:', error);
    process.exit(1);
  });
