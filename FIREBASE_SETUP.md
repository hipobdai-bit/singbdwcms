# Firebase Setup Guide

This guide will help you set up Firebase Firestore and Storage for your SingBD CMS.

## 1. Firestore Security Rules

### Deploy Firestore Rules

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Firestore Database** → **Rules**
4. Copy the contents of `firestore.rules` and paste it
5. Click **Publish**

**What these rules do:**
- Allow public read access to all collections (categories, products, clients, certifications, settings)
- Prevent direct writes from client-side code (only server with Admin SDK can write)
- This is secure because your admin panel uses server-side API routes

### Alternative: Use Firebase CLI

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

## 2. Firebase Storage Security Rules

### Deploy Storage Rules

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Storage** → **Rules**
4. Copy the contents of `storage.rules` and paste it
5. Click **Publish**

**What these rules do:**
- Allow public read access to uploaded images
- Prevent direct uploads from client-side (only server can upload)
- Secure because uploads go through your admin panel API routes

### Alternative: Use Firebase CLI

```bash
# Deploy storage rules
firebase deploy --only storage
```

## 3. Storage Bucket Permissions

### Make Bucket Public (Required for Images to Display)

**Option 1: Using Google Cloud Console**

1. Go to [Cloud Storage Browser](https://console.cloud.google.com/storage/browser)
2. Select your bucket (e.g., `singbdtemporary.firebasestorage.app`)
3. Click **Permissions** tab
4. Click **Grant Access**
5. New principals: `allUsers`
6. Role: **Storage Object Viewer**
7. Click **Save**

**Option 2: Using gcloud CLI**

```bash
# Make bucket publicly readable
gsutil iam ch allUsers:objectViewer gs://your-bucket-name.appspot.com
```

**Option 3: Using our script**

```bash
# This automatically makes all uploaded images public
npm run fix-images
```

## 4. CORS Configuration (If Images Still Don't Load)

### Apply CORS Configuration

**Using gcloud CLI:**

```bash
gcloud storage buckets update gs://your-bucket-name.appspot.com --cors-file=cors.json
```

**Using gsutil (older method):**

```bash
gsutil cors set cors.json gs://your-bucket-name.appspot.com
```

## 5. Initialize Data

### Create Categories

Run this command to create all product categories in Firestore:

```bash
npm run init-categories
```

This creates 10 categories:
- Woven Tops
- Woven Bottoms
- Coats & Jackets
- Denim
- Knitwear
- Sweaters
- Sportswear
- Homeware
- Handicrafts
- Workwear

### Fix Existing Images

If you already uploaded products but images aren't showing:

```bash
npm run fix-images
```

This makes all existing uploaded images publicly accessible.

## 6. Verify Setup

### Test Storage Configuration

```bash
npm run test-storage
```

This script will:
- Check Firebase connection
- List uploaded files
- Verify public access
- Provide troubleshooting information

## 7. Common Issues

### Issue: Products not showing on category pages

**Solution:** Run `npm run init-categories` to create the categories in Firestore.

### Issue: Images not loading (404 or CORS errors)

**Solutions:**
1. Run `npm run fix-images` to make images public
2. Apply CORS configuration (see section 4)
3. Check Storage bucket permissions (see section 3)

### Issue: "Permission denied" errors in Firestore

**Solution:** Deploy the Firestore security rules (see section 1)

### Issue: Cannot upload images from admin panel

**Solution:** Check that your Firebase Admin credentials are correct in `.env.local`

## 8. Firebase Collections Structure

After running `init-categories`, your Firestore will have:

```
/categories/{categorySlug}
  - name: string
  - slug: string
  - description: string
  - shortDescription: string
  - order: number
  - heroImage: string
  - iconImage: string
  - overviewImages: array
  - seoTitle: string
  - seoDescription: string
  - seoKeywords: array
  - isActive: boolean

/products/{productId}
  - name: string
  - slug: string
  - description: string
  - shortDescription: string
  - productCode: string
  - categorySlug: string
  - image: string
  - order: number
  - isActive: boolean
  - createdAt: timestamp
  - updatedAt: timestamp

/clients/{clientId}
  - name: string
  - logoUrl: string
  - order: number
  - isActive: boolean

/certifications/{certificationId}
  - name: string
  - status: string
  - description: string
  - image: string
  - order: number
  - isActive: boolean

/settings/contact
  - email: string
  - phone: string
  - addressLines: array
```

## 9. Testing Your Setup

1. **Test Categories:**
   - Go to http://localhost:3000/products
   - You should see all 10 categories

2. **Test Product Upload:**
   - Go to http://localhost:3000/admin
   - Login with password (check `src/app/admin/page.tsx`)
   - Upload a product in "Woven Tops" category
   - Visit http://localhost:3000/products/woven-tops
   - Your product should appear

3. **Test Images:**
   - Products should display their images
   - Check browser console for any errors
   - If images don't load, run `npm run fix-images`

## 10. Production Deployment

Before deploying to production:

1. ✅ Deploy Firestore rules
2. ✅ Deploy Storage rules  
3. ✅ Set bucket permissions
4. ✅ Configure CORS
5. ✅ Initialize categories
6. ✅ Test all functionality
7. ✅ Change admin password in production

## Need Help?

Run these diagnostic commands:

```bash
# Check storage configuration
npm run test-storage

# Fix image permissions
npm run fix-images

# Reinitialize categories
npm run init-categories
```
