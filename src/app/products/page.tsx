import type { Metadata } from "next";
import Link from "next/link";
import GetQuoteSection from "@/components/GetQuoteSection";
import { getCategories } from "@/lib/firestore";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore SingBD's comprehensive product catalogue including woven tops, coats & jackets, sportswear, knitwear, homeware, handicrafts, and accessories.",
  keywords: [
    "product catalogue",
    "woven tops",
    "coats jackets",
    "sportswear",
    "knitwear",
    "homeware",
    "handicrafts",
    "accessories",
    "apparel products",
    "garment catalogue",
    "textile products",
    "sourcing catalogue",
  ],
  alternates: {
    canonical: "/products",
  },
};

export default async function ProductsPage() {
  let categories: import("@/lib/firestore").Category[] = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    categories = [];
  }

  return (
    <main className="main">
      <section className="categories" id="categories">
        <div className="categories__container">
          <h2 className="section__title">Product Categories</h2>
          <p className="section__subtitle">
            Select a category to explore our complete product collection
          </p>

          <div className="categories__grid">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="category__card"
              >
                <div className="category__card-image">
                  <img
                    src={category.heroImage ?? ""}
                    alt={category.name}
                    className="category__card-img"
                  />
                </div>
                <div className="category__card-overlay">
                  <h3 className="category__card-title">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GetQuoteSection />
    </main>
  );
}
