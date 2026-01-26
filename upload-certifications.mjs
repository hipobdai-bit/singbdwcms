/**
 * Upload Certifications to Firestore
 * 
 * This script uploads certification logos to Firebase Storage
 * and creates entries in Firestore
 * 
 * Run with: npm run upload-certifications
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { config } from 'dotenv';
import { readdirSync, readFileSync } from 'fs';
import { join, extname } from 'path';

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

const CERTIFICATIONS_DIR = '/Users/tzl/Documents/GitHub/SingBDwCMS/public/images/Sustainability-Certifications';

// Mapping of filenames to certification details
const certificationData = {
  'GOTS.png': {
    name: 'GOTS Certified',
    status: 'Certified',
    description: 'Global Organic Textile Standard for organic fibers',
  },
  'Wrap Logo.svg': {
    name: 'Wrap — Member',
    status: 'Member',
    description: 'Responsible Production',
  },
  'Accord Logo.png': {
    name: 'Accord — Member',
    status: 'Member',
    description: 'Ensuring Safety',
  },
  'sedex-logo-png_seeklogo-460003.png': {
    name: 'SEDEX',
    status: 'Certified',
    description: 'Supplier Ethical Data Exchange',
  },
  'betterwork.png': {
    name: 'Better Work',
    status: 'Certified',
    description: 'Improving working conditions in global supply chains',
  },
  'Business-social-compliance-initiative.jpg': {
    name: 'BSCI',
    status: 'Certified',
    description: 'Business Social Compliance Initiative',
  },
  'confidence-in-textiles-oeko-tex-standard-100-seeklogo.png': {
    name: 'OEKO-TEX Standard 100',
    status: 'Certified',
    description: 'Confidence in Textiles - Harmful Substance Testing',
  },
  'Fairware.png': {
    name: 'Fairware',
    status: 'Certified',
    description: 'Ethical and sustainable promotional products',
  },
  'bluesign.png': {
    name: 'bluesign®',
    status: 'Certified',
    description: 'Sustainable textile production',
  },
  'global-recycled.png': {
    name: 'Global Recycled Standard',
    status: 'Certified',
    description: 'Verification of recycled content in products',
  },
  'higg-index.jpg': {
    name: 'Higg Index',
    status: 'Member',
    description: 'Sustainability measurement and improvement',
  },
};

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function uploadImage(filePath, fileName) {
  try {
    const buffer = readFileSync(filePath);
    const ext = extname(fileName);
    const timestamp = Date.now();
    const safeFileName = `certifications/${timestamp}-${fileName}`;
    
    const file = bucket.file(safeFileName);
    
    await file.save(buffer, {
      contentType: ext === '.svg' ? 'image/svg+xml' : `image/${ext.slice(1)}`,
      resumable: false,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });
    
    // Make public
    await file.makePublic();
    
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(safeFileName).replace(/%2F/g, '/')}`;
    
    return publicUrl;
  } catch (error) {
    console.error(`   ❌ Failed to upload image: ${error.message}`);
    throw error;
  }
}

async function uploadCertifications() {
  console.log('🚀 Starting certification upload...\n');
  console.log(`📁 Source: ${CERTIFICATIONS_DIR}\n`);
  
  let totalCreated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  try {
    const files = readdirSync(CERTIFICATIONS_DIR);
    
    for (const file of files) {
      if (file.startsWith('.')) continue;
      
      const certData = certificationData[file];
      
      if (!certData) {
        console.log(`⚠️  Skipped: ${file} (no data mapping)`);
        totalSkipped++;
        continue;
      }
      
      const slug = slugify(certData.name);
      
      try {
        // Check if certification already exists
        const existing = await db.collection('certifications')
          .where('slug', '==', slug)
          .limit(1)
          .get();
        
        if (!existing.empty) {
          console.log(`   ⚠️  Skipped: ${certData.name} (already exists)`);
          totalSkipped++;
          continue;
        }
        
        // Upload image
        const filePath = join(CERTIFICATIONS_DIR, file);
        const imageUrl = await uploadImage(filePath, file);
        
        // Create certification in Firestore
        await db.collection('certifications').add({
          name: certData.name,
          status: certData.status,
          description: certData.description,
          image: imageUrl,
          slug: slug,
          isActive: true,
          order: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        
        console.log(`   ✅ ${certData.name}`);
        totalCreated++;
        
      } catch (error) {
        console.error(`   ❌ Failed: ${certData.name} - ${error.message}`);
        totalErrors++;
      }
    }
    
    console.log('\n📊 Upload Summary:');
    console.log(`   ✅ Certifications created: ${totalCreated}`);
    console.log(`   ⚠️  Certifications skipped: ${totalSkipped}`);
    console.log(`   ❌ Errors: ${totalErrors}`);
    
  } catch (error) {
    console.error('\n❌ Upload failed:', error);
    process.exit(1);
  }
}

uploadCertifications()
  .then(() => {
    console.log('\n🎉 Upload complete!');
    console.log('\n💡 Next steps:');
    console.log('   1. Visit http://localhost:3000/sustainability');
    console.log('   2. Check certifications in admin panel');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Upload failed:', error);
    process.exit(1);
  });
