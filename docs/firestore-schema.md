# Firestore Schema Proposal

This schema keeps homepage categories static and moves product catalog data to Firestore.

## collections/categories/{slug}

- slug: string
- name: string
- description: string
- shortDescription: string
- order: number
- heroImage: string (URL or `/images/...`)
- iconImage: string (URL or `/images/...`)
- overviewImages: string[] (URLs or `/images/...`)
- seoTitle: string
- seoDescription: string
- seoKeywords: string[]
- isActive: boolean

Example:
{
  "slug": "woven-tops",
  "name": "Woven Tops",
  "description": "Premium woven tops including shirts, blouses, and tunics.",
  "shortDescription": "High-quality woven tops with premium fabrics.",
  "order": 1,
  "heroImage": "/images/Website Visuals/Product Category Overview/Woven Top/_Z5A0814.webp",
  "iconImage": "/images/Icon/Icons/Categories/Woven Tops.webp",
  "overviewImages": [
    "/images/Website Visuals/Product Category Overview/Woven Top/_Z5A0200.webp",
    "/images/Website Visuals/Product Category Overview/Woven Top/_Z5A0814.webp"
  ],
  "seoTitle": "Woven Tops - SingBD Products",
  "seoDescription": "Explore SingBD's premium woven tops collection including shirts, blouses, and tunics.",
  "seoKeywords": ["woven tops", "shirts", "blouses", "tunics"],
  "isActive": true
}

## collections/products/{productId}

- name: string
- slug: string
- description: string
- categorySlug: string (matches categories/{slug})
- image: string (URL or `/images/...`)
- gallery: string[] (optional)
- order: number
- isActive: boolean
- createdAt: timestamp
- updatedAt: timestamp

Example:
{
  "name": "Mens Shirt",
  "slug": "mens-shirt",
  "description": "Classic men's woven shirt.",
  "categorySlug": "woven-tops",
  "image": "/images/Products/Woven Tops/Mens Shirt.webp",
  "gallery": [],
  "order": 1,
  "isActive": true,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
