/**
 * Initialize Categories in Firestore
 * 
 * This script creates the initial category documents in Firestore
 * Run with: npm run init-categories
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

const categories = [
  {
    slug: 'woven-tops',
    name: 'Woven Tops',
    description: 'Premium woven tops including shirts, blouses, and tunics made with high-quality fabrics.',
    shortDescription: 'High-quality woven tops with premium fabrics',
    order: 1,
    heroImage: '/images/Category-Overview/Woven-Top.webp',
    iconImage: '/images/Icon/Icons/Categories/Woven Tops.webp',
    overviewImages: [],
    seoTitle: 'Woven Tops - SingBD Products',
    seoDescription: 'Explore SingBD\'s premium woven tops collection including shirts, blouses, and tunics.',
    seoKeywords: ['woven tops', 'shirts', 'blouses', 'tunics', 'premium woven'],
    isActive: true,
  },
  {
    slug: 'woven-bottoms',
    name: 'Woven Bottoms',
    description: 'Quality woven bottoms including pants, trousers, and skirts crafted with precision.',
    shortDescription: 'Durable woven bottoms for all occasions',
    order: 2,
    heroImage: '/images/Category-Overview/Woven-Bottom.webp',
    iconImage: '/images/Icon/Icons/Categories/Woven Bottoms.webp',
    overviewImages: [],
    seoTitle: 'Woven Bottoms - SingBD Products',
    seoDescription: 'Browse our collection of quality woven bottoms including pants, trousers, and skirts.',
    seoKeywords: ['woven bottoms', 'pants', 'trousers', 'skirts'],
    isActive: true,
  },
  {
    slug: 'coats-jackets',
    name: 'Coats & Jackets',
    description: 'Stylish and functional coats and jackets for all seasons and weather conditions.',
    shortDescription: 'Premium outerwear for every season',
    order: 3,
    heroImage: '/images/Category-Overview/Coats-Jackets.webp',
    iconImage: '/images/Icon/Icons/Categories/Coats & Jackets.webp',
    overviewImages: [],
    seoTitle: 'Coats & Jackets - SingBD Products',
    seoDescription: 'Discover our range of stylish and functional coats and jackets for all seasons.',
    seoKeywords: ['coats', 'jackets', 'outerwear', 'winter coats'],
    isActive: true,
  },
  {
    slug: 'denim',
    name: 'Denim',
    description: 'Classic and contemporary denim products including jeans, jackets, and more.',
    shortDescription: 'Premium denim for timeless style',
    order: 4,
    heroImage: '/images/Category-Overview/Denim.webp',
    iconImage: '/images/Icon/Icons/Categories/Denim.webp',
    overviewImages: [],
    seoTitle: 'Denim - SingBD Products',
    seoDescription: 'Shop our collection of classic and contemporary denim products.',
    seoKeywords: ['denim', 'jeans', 'denim jackets', 'premium denim'],
    isActive: true,
  },
  {
    slug: 'knitwear',
    name: 'Knitwear',
    description: 'Comfortable and stylish knitwear including t-shirts, polos, and casual wear.',
    shortDescription: 'Soft and comfortable knitwear essentials',
    order: 5,
    heroImage: '/images/Category-Overview/Knitwear.webp',
    iconImage: '/images/Icon/Icons/Categories/Knitwear.webp',
    overviewImages: [],
    seoTitle: 'Knitwear - SingBD Products',
    seoDescription: 'Browse our comfortable and stylish knitwear collection.',
    seoKeywords: ['knitwear', 't-shirts', 'polos', 'casual wear'],
    isActive: true,
  },
  {
    slug: 'sweater',
    name: 'Sweaters',
    description: 'Warm and cozy sweaters perfect for cooler weather and layering.',
    shortDescription: 'Cozy sweaters for comfort and style',
    order: 6,
    heroImage: '/images/Category-Overview/Sweater.jpg',
    iconImage: '/images/Icon/Icons/Categories/Sweater.webp',
    overviewImages: [],
    seoTitle: 'Sweaters - SingBD Products',
    seoDescription: 'Find the perfect sweater from our warm and cozy collection.',
    seoKeywords: ['sweaters', 'pullovers', 'cardigans', 'knitwear'],
    isActive: true,
  },
  {
    slug: 'sportswear',
    name: 'Sportswear',
    description: 'Performance sportswear designed for active lifestyles and athletic pursuits.',
    shortDescription: 'Performance gear for active living',
    order: 7,
    heroImage: '/images/Category-Overview/Sportswear.webp',
    iconImage: '/images/Icon/Icons/Categories/Sportswear.webp',
    overviewImages: [],
    seoTitle: 'Sportswear - SingBD Products',
    seoDescription: 'Explore our performance sportswear collection for active lifestyles.',
    seoKeywords: ['sportswear', 'athletic wear', 'performance gear', 'activewear'],
    isActive: true,
  },
  {
    slug: 'homeware',
    name: 'Homeware',
    description: 'Quality homeware products including linens, textiles, and home accessories.',
    shortDescription: 'Quality textiles for your home',
    order: 8,
    heroImage: '/images/Category-Overview/Homeware.webp',
    iconImage: '/images/Icon/Icons/Categories/Homeware.webp',
    overviewImages: [],
    seoTitle: 'Homeware - SingBD Products',
    seoDescription: 'Browse our quality homeware products including linens and textiles.',
    seoKeywords: ['homeware', 'home textiles', 'linens', 'home accessories'],
    isActive: true,
  },
  {
    slug: 'handicrafts',
    name: 'Handicrafts',
    description: 'Unique handcrafted items showcasing traditional craftsmanship and artistry.',
    shortDescription: 'Unique handcrafted pieces',
    order: 9,
    heroImage: '/images/Category-Overview/Handicrafts.webp',
    iconImage: '/images/Icon/Icons/Categories/Handicrafts.webp',
    overviewImages: [],
    seoTitle: 'Handicrafts - SingBD Products',
    seoDescription: 'Discover unique handcrafted items showcasing traditional craftsmanship.',
    seoKeywords: ['handicrafts', 'handmade', 'artisan', 'crafts'],
    isActive: true,
  },
  {
    slug: 'workwear',
    name: 'Workwear',
    description: 'Durable and professional workwear designed for various industries and professions.',
    shortDescription: 'Professional and durable workwear',
    order: 10,
    heroImage: '/images/Category-Overview/Workwear.webp',
    iconImage: '/images/Icon/Icons/Categories/Workwear.webp',
    overviewImages: [],
    seoTitle: 'Workwear - SingBD Products',
    seoDescription: 'Find durable and professional workwear for various industries.',
    seoKeywords: ['workwear', 'professional wear', 'industrial clothing', 'uniforms'],
    isActive: true,
  },
];

async function initializeCategories() {
  console.log('🚀 Initializing categories in Firestore...\n');

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const category of categories) {
    try {
      const docRef = db.collection('categories').doc(category.slug);
      const doc = await docRef.get();

      if (doc.exists) {
        await docRef.update({
          ...category,
          updatedAt: new Date(),
        });
        console.log(`✅ Updated: ${category.name} (${category.slug})`);
        updated++;
      } else {
        await docRef.set({
          ...category,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(`🆕 Created: ${category.name} (${category.slug})`);
        created++;
      }
    } catch (error) {
      console.error(`❌ Error with ${category.slug}:`, error.message);
      errors++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Created: ${created}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total: ${categories.length}`);
}

initializeCategories()
  .then(() => {
    console.log('\n✅ Categories initialized successfully!');
    console.log('\n💡 Next steps:');
    console.log('   1. Your products should now appear at /products/woven-tops');
    console.log('   2. All category pages should work');
    console.log('   3. The /products page should show all categories');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Failed to initialize categories:', error);
    process.exit(1);
  });
