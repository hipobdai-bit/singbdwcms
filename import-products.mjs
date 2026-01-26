/**
 * Bulk Import Products to Firestore
 * 
 * This script imports multiple products from a JSON file
 * Run with: npm run import-products
 * 
 * Edit the products array below with your product data
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';

config({ path: '.env.local' });

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

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
});

const db = getFirestore();

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// ============================================
// EDIT THIS ARRAY WITH YOUR PRODUCTS
// ============================================
const products = [
  {
    name: "Men's Casual Shirt",
    productCode: "WV-001",
    shortDescription: "Classic casual shirt made from premium cotton",
    categorySlug: "woven-tops",
    image: "https://via.placeholder.com/400x500/4A90E2/FFFFFF?text=Mens+Shirt",
    order: 1,
  },
  {
    name: "Women's Blouse",
    productCode: "WV-002",
    shortDescription: "Elegant blouse with modern design",
    categorySlug: "woven-tops",
    image: "https://via.placeholder.com/400x500/E94B3C/FFFFFF?text=Womens+Blouse",
    order: 2,
  },
  {
    name: "Formal Trousers",
    productCode: "WB-001",
    shortDescription: "Professional trousers for business wear",
    categorySlug: "woven-bottoms",
    image: "https://via.placeholder.com/400x500/6C757D/FFFFFF?text=Trousers",
    order: 1,
  },
  {
    name: "Winter Jacket",
    productCode: "JK-001",
    shortDescription: "Warm and stylish winter jacket",
    categorySlug: "coats-jackets",
    image: "https://via.placeholder.com/400x500/28A745/FFFFFF?text=Winter+Jacket",
    order: 1,
  },
  {
    name: "Denim Jeans",
    productCode: "DN-001",
    shortDescription: "Classic blue denim jeans",
    categorySlug: "denim",
    image: "https://via.placeholder.com/400x500/17A2B8/FFFFFF?text=Denim+Jeans",
    order: 1,
  },
  {
    name: "Cotton T-Shirt",
    productCode: "KW-001",
    shortDescription: "Comfortable cotton t-shirt for everyday wear",
    categorySlug: "knitwear",
    image: "https://via.placeholder.com/400x500/FFC107/FFFFFF?text=T-Shirt",
    order: 1,
  },
  {
    name: "Wool Sweater",
    productCode: "SW-001",
    shortDescription: "Cozy wool sweater for cold weather",
    categorySlug: "sweater",
    image: "https://via.placeholder.com/400x500/DC3545/FFFFFF?text=Wool+Sweater",
    order: 1,
  },
  {
    name: "Running Shorts",
    productCode: "SP-001",
    shortDescription: "Lightweight running shorts with moisture-wicking",
    categorySlug: "sportswear",
    image: "https://via.placeholder.com/400x500/007BFF/FFFFFF?text=Running+Shorts",
    order: 1,
  },
  {
    name: "Bed Linen Set",
    productCode: "HW-001",
    shortDescription: "Premium quality bed linen set",
    categorySlug: "homeware",
    image: "https://via.placeholder.com/400x500/6F42C1/FFFFFF?text=Bed+Linen",
    order: 1,
  },
  {
    name: "Handwoven Basket",
    productCode: "HC-001",
    shortDescription: "Traditional handwoven basket",
    categorySlug: "handicrafts",
    image: "https://via.placeholder.com/400x500/E83E8C/FFFFFF?text=Basket",
    order: 1,
  },
  {
    name: "Safety Vest",
    productCode: "WK-001",
    shortDescription: "High-visibility safety vest",
    categorySlug: "workwear",
    image: "https://via.placeholder.com/400x500/FD7E14/FFFFFF?text=Safety+Vest",
    order: 1,
  },
];

// ============================================
// IMPORT LOGIC - DO NOT EDIT BELOW
// ============================================

async function importProducts() {
  console.log('🚀 Starting bulk product import...\n');
  
  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const product of products) {
    try {
      // Validate required fields
      if (!product.name || !product.shortDescription || !product.categorySlug || !product.image) {
        console.log(`⚠️  Skipped: Missing required fields for ${product.name || 'Unknown'}`);
        skipped++;
        continue;
      }

      const slug = slugify(product.productCode || product.name);

      // Check if product already exists with same slug
      const existing = await db.collection('products')
        .where('slug', '==', slug)
        .limit(1)
        .get();

      if (!existing.empty) {
        console.log(`⚠️  Skipped: ${product.name} (slug: ${slug}) already exists`);
        skipped++;
        continue;
      }

      // Create the product
      await db.collection('products').add({
        name: product.name,
        shortDescription: product.shortDescription,
        description: product.shortDescription,
        productCode: product.productCode || '',
        image: product.image,
        categorySlug: product.categorySlug,
        slug: slug,
        isActive: true,
        order: product.order || 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log(`✅ Created: ${product.name} (${product.categorySlug})`);
      created++;

    } catch (error) {
      console.error(`❌ Error with ${product.name}:`, error.message);
      errors++;
    }
  }

  console.log('\n📊 Import Summary:');
  console.log(`   ✅ Created: ${created}`);
  console.log(`   ⚠️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log(`   📝 Total: ${products.length}`);
}

importProducts()
  .then(() => {
    console.log('\n🎉 Import complete!');
    console.log('\n💡 Next steps:');
    console.log('   1. Visit http://localhost:3000/all-products to see all products');
    console.log('   2. Visit http://localhost:3000/products to browse by category');
    console.log('   3. The placeholder images are from via.placeholder.com');
    console.log('   4. Upload real images from the admin panel or update the image URLs');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  });
