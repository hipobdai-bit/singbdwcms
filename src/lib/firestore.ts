import { getAdminDb } from "@/lib/firebaseAdmin";

export type Category = {
  slug: string;
  name: string;
  description?: string;
  shortDescription?: string;
  order?: number;
  heroImage?: string;
  iconImage?: string;
  overviewImages?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  isActive?: boolean;
};

export type Product = {
  name: string;
  shortDescription?: string;
  productCode?: string;
  slug: string;
  description: string;
  categorySlug: string;
  image: string;
  gallery?: string[];
  order?: number;
  isActive?: boolean;
};

export type ClientLogo = {
  name: string;
  logoUrl: string;
  order?: number;
  isActive?: boolean;
};

export type Certification = {
  name: string;
  status: string;
  description: string;
  image: string;
  order?: number;
  isActive?: boolean;
};

export type SiteSettings = {
  email: string;
  phone: string;
  addressLines: string[];
};

export async function getCategories(): Promise<Category[]> {
  const db = getAdminDb();
  const snapshot = await db.collection("categories").get();
  const categories = snapshot.docs.map((doc) => ({ slug: doc.id, ...doc.data() })) as Category[];

  return categories
    .filter((category) => category.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const db = getAdminDb();
  const doc = await db.collection("categories").doc(slug).get();
  if (!doc.exists) {
    return null;
  }
  return { slug: doc.id, ...doc.data() } as Category;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const db = getAdminDb();
  const snapshot = await db
    .collection("products")
    .where("categorySlug", "==", categorySlug)
    .get();

  const products = snapshot.docs.map((doc) => ({ slug: doc.id, ...doc.data() })) as Product[];

  console.log(`[Firestore] getProductsByCategory(${categorySlug}): Found ${products.length} products`);

  return products
    .filter((product) => product.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getAllProducts(): Promise<Product[]> {
  const db = getAdminDb();
  const snapshot = await db.collection("products").get();
  const products = snapshot.docs.map((doc) => ({ slug: doc.id, ...doc.data() })) as Product[];

  return products.filter((product) => product.isActive !== false);
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  const db = getAdminDb();
  const snapshot = await db.collection("clients").get();
  const clients = snapshot.docs.map((doc) => ({ ...doc.data() })) as ClientLogo[];

  return clients
    .filter((client) => client.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getCertifications(): Promise<Certification[]> {
  const db = getAdminDb();
  const snapshot = await db.collection("certifications").get();
  const certifications = snapshot.docs.map((doc) => ({ ...doc.data() })) as Certification[];

  return certifications
    .filter((certification) => certification.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const db = getAdminDb();
  const doc = await db.collection("settings").doc("contact").get();
  if (!doc.exists) {
    return {
      email: "info@singbd.com",
      phone: "+8801711594673",
      addressLines: [
        "9th Floor, ANZ Huq Eleven Square",
        "Plot #01, Road #11, Block #H",
        "Banani, Dhaka-1213, Bangladesh",
      ],
    };
  }

  return doc.data() as SiteSettings;
}
