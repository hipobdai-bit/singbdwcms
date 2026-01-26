# Bulk Product Import Guide

This guide explains how to automatically import multiple products at once.

## Quick Start

```bash
# Import sample products (11 placeholder products)
npm run import-products
```

## Customizing Products

### Method 1: Edit the Script Directly

Open `import-products.mjs` and modify the `products` array:

```javascript
const products = [
  {
    name: "Your Product Name",
    productCode: "PROD-001",
    shortDescription: "Product description here",
    categorySlug: "woven-tops", // Must match a category slug
    image: "https://your-image-url.com/image.jpg",
    order: 1,
  },
  // Add more products...
];
```

### Method 2: Create Your Own JSON File

1. **Copy the sample file:**
   ```bash
   cp sample-products.json my-products.json
   ```

2. **Edit `my-products.json`** with your products:
   ```json
   [
     {
       "name": "Your Product",
       "productCode": "PROD-001",
       "shortDescription": "Description",
       "categorySlug": "woven-tops",
       "image": "https://example.com/image.jpg",
       "order": 1
     }
   ]
   ```

3. **Create a custom import script** (optional):
   - Copy `import-products.mjs` to `import-my-products.mjs`
   - Load from your JSON file instead

## Product Fields

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `name` | string | Product name | "Men's Casual Shirt" |
| `shortDescription` | string | Brief description | "Premium cotton shirt" |
| `categorySlug` | string | Category slug (must exist) | "woven-tops" |
| `image` | string | Image URL | "https://..." |

### Optional Fields

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `productCode` | string | Product code/SKU | "" |
| `order` | number | Display order | 0 |

## Available Categories

Make sure your `categorySlug` matches one of these:

- `woven-tops` - Woven Tops
- `woven-bottoms` - Woven Bottoms
- `coats-jackets` - Coats & Jackets
- `denim` - Denim
- `knitwear` - Knitwear
- `sweater` - Sweaters
- `sportswear` - Sportswear
- `homeware` - Homeware
- `handicrafts` - Handicrafts
- `workwear` - Workwear

## Image Sources

### Option 1: Use Placeholder Images (for testing)

The sample uses `via.placeholder.com`:

```javascript
image: "https://via.placeholder.com/400x500/4A90E2/FFFFFF?text=Product+Name"
```

### Option 2: Use Your Own URLs

If you have images hosted elsewhere:

```javascript
image: "https://yourdomain.com/images/product1.jpg"
```

### Option 3: Upload to Firebase Storage First

1. Upload images manually through admin panel
2. Copy the Firebase Storage URLs
3. Use those URLs in your import

### Option 4: Use Local Images (requires modification)

You would need to modify the script to:
1. Read local image files
2. Upload them using `uploadImageToStorage()`
3. Use the returned URLs

## Import Behavior

### Duplicate Prevention

The script checks if a product with the same slug already exists:
- **Slug is created from:** `productCode` or `name` (lowercase, hyphenated)
- **If exists:** Product is skipped
- **If new:** Product is created

Example slugs:
- `"WV-001"` → `"wv-001"`
- `"Men's Shirt"` → `"mens-shirt"`

### Import Summary

After running, you'll see:
```
📊 Import Summary:
   ✅ Created: 8
   ⚠️  Skipped: 3
   ❌ Errors: 0
   📝 Total: 11
```

## Example: Import 100 Products

### Using Excel/Google Sheets

1. **Create spreadsheet** with columns:
   - Name
   - Product Code
   - Short Description
   - Category Slug
   - Image URL
   - Order

2. **Export as CSV**

3. **Convert CSV to JSON** using online tool or script:
   ```bash
   # Using node with csv-parse (install: npm install csv-parse)
   node convert-csv-to-json.js products.csv > products.json
   ```

4. **Modify import script** to load from JSON file:
   ```javascript
   import { readFileSync } from 'fs';
   const products = JSON.parse(readFileSync('./products.json', 'utf8'));
   ```

5. **Run import:**
   ```bash
   node import-products.mjs
   ```

## Troubleshooting

### "Skipped: already exists"

The product slug already exists in database. To re-import:
1. Delete the product from admin panel
2. Run import again

OR modify the slug by changing the product code

### "Missing required fields"

Check that all required fields are present:
- `name`
- `shortDescription`
- `categorySlug`
- `image`

### "Invalid category"

The `categorySlug` doesn't exist. Run:
```bash
npm run init-categories
```

### Images not displaying

After import, if using Firebase Storage images:
```bash
npm run fix-images
```

## Advanced: Import with Local Images

To upload local images during import, you'd modify the script:

```javascript
import { uploadImageToStorage } from './src/lib/storage.js';
import { readFileSync } from 'fs';

// For each product
const imageFile = new File(
  [readFileSync(`./images/${product.productCode}.jpg`)],
  `${product.productCode}.jpg`,
  { type: 'image/jpeg' }
);

const imageUrl = await uploadImageToStorage(
  imageFile,
  'products',
  product.productCode
);
```

## Best Practices

1. **Test with small batch first** (5-10 products)
2. **Use consistent product codes** (e.g., WV-001, WV-002)
3. **Verify categories exist** before import
4. **Backup data** before large imports
5. **Check imported products** in admin panel
6. **Run fix-images** if using Firebase Storage

## Quick Commands

```bash
# Check what's in database
npm run check-setup

# Import products
npm run import-products

# Fix image permissions
npm run fix-images

# View in browser
# Visit: http://localhost:3000/all-products
```

## Sample Import Results

After running `npm run import-products`, you'll have:

- ✅ 1 product per category (11 total)
- ✅ All with placeholder images
- ✅ Ready to browse at `/products` and `/all-products`
- ✅ Can be deleted/edited in admin panel

## Next Steps

1. Replace placeholder images with real ones
2. Update product descriptions
3. Add more products per category
4. Set proper display order
5. Upload real product photos through admin panel
