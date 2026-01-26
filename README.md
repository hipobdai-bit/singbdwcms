This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory with your Firebase credentials:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_STORAGE_BUCKET=your-bucket-name.appspot.com
```

### Firebase Configuration

**Important:** Before running the app, you need to set up Firebase. Follow the complete guide:

👉 **[See FIREBASE_SETUP.md for detailed setup instructions](FIREBASE_SETUP.md)**

**Quick Setup:**

1. **Initialize categories:**
   ```bash
   npm run init-categories
   ```

2. **Fix image permissions:**
   ```bash
   npm run fix-images
   ```

3. **Deploy Firestore rules:**
   - Copy `firestore.rules` to Firebase Console → Firestore Database → Rules

4. **Deploy Storage rules:**
   - Copy `storage.rules` to Firebase Console → Storage → Rules

### Firebase Storage CORS Configuration

If images uploaded through the admin panel are not displaying on the website, you need to:

#### Quick Fix - Make Existing Images Public

Run this command to make all uploaded images publicly accessible:

```bash
npm run fix-images
```

This will automatically make all images in the `products/`, `clients/`, and `certifications/` folders public.

#### Test Storage Configuration

To test your Firebase Storage configuration:

```bash
npm run test-storage
```

#### Manual CORS Configuration (Optional)

If you continue to experience issues, configure CORS for your Firebase Storage bucket:

**Option 1: Using gcloud CLI (if installed)**

```bash
# Make sure you have gcloud CLI installed and authenticated
# https://cloud.google.com/sdk/docs/install

# Run the setup script
./setup-cors.sh
```

**Option 2: Using Firebase Console**

1. Go to [Google Cloud Storage Console](https://console.cloud.google.com/storage/browser)
2. Select your bucket (e.g., `singbdtemporary.firebasestorage.app`)
3. Click the "Permissions" tab
4. Click "Grant Access"
5. Add principal: `allUsers`
6. Add role: "Storage Object Viewer"
7. Click "Save"

**Option 3: Manual gcloud command**

```bash
gcloud storage buckets update gs://your-bucket-name.appspot.com --cors-file=cors.json
```

#### Why This Happens

When images are uploaded to Firebase Storage, they need to be:
1. **Made public** - So anyone can view them without authentication
2. **Have CORS configured** - So browsers can load them from different domains

The upload code (`src/lib/storage.ts`) already calls `makePublic()` on new uploads, but existing images may need to be fixed manually using the `npm run fix-images` command.

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin Panel

Access the admin panel at `/admin` with the password configured in `src/app/admin/page.tsx`.

### Features

- **Add Products:** Upload products with images to any category
- **Delete Products:** Remove products from the database
- **Manage Clients:** Add client logos
- **Manage Certifications:** Add certification images
- **Update Contact Info:** Edit email, phone, and address

### Bulk Import Products

To quickly populate your database with multiple products:

```bash
npm run import-products
```

This imports 11 sample products (1 per category) with placeholder images.

👉 **[See BULK_IMPORT.md for detailed import instructions](BULK_IMPORT.md)**

To customize products, edit the `products` array in `import-products.mjs`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

