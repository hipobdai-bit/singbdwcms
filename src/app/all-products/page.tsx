import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts, getCategories } from "@/lib/firestore";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse our complete collection of premium apparel and textile products. From woven tops to sportswear, discover quality garments for every need.",
  keywords: [
    "all products",
    "complete collection",
    "apparel",
    "garments",
    "textiles",
    "woven tops",
    "sportswear",
    "knitwear",
    "homeware",
    "handicrafts",
    "workwear",
  ],
  alternates: {
    canonical: "/all-products",
  },
};

const PRODUCTS_PER_PAGE = 12;

type AllProductsPageProps = {
  searchParams: { page?: string };
};

export default async function AllProductsPage({ searchParams }: AllProductsPageProps) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  const categoryOrder = new Map(categories.map((category, index) => [category.slug, category.order ?? index]));
  const categoryNames = new Map(categories.map((category) => [category.slug, category.name]));

  const sortedProducts = products
    .slice()
    .sort((a, b) => {
      const categoryA = categoryOrder.get(a.categorySlug) ?? 0;
      const categoryB = categoryOrder.get(b.categorySlug) ?? 0;
      if (categoryA !== categoryB) {
        return categoryA - categoryB;
      }
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;
      return orderA - orderB;
    });

  const totalProducts = sortedProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / PRODUCTS_PER_PAGE));
  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, page + 2);
  const showingStart = totalProducts === 0 ? 0 : startIndex + 1;
  const showingEnd = Math.min(startIndex + PRODUCTS_PER_PAGE, totalProducts);

  return (
    <main className="main products">
      <section className="all-products-hero">
        <div className="all-products-hero__container">
          <h1 className="all-products-hero__title">All Products</h1>
          <p className="all-products-hero__subtitle">
            Explore our complete collection of premium apparel and textile products
          </p>
          <div className="all-products-hero__stats">
            <span className="all-products-hero__stat">
              <strong>{totalProducts}</strong> Products
            </span>
            <span className="all-products-hero__stat">
              <strong>{categories.length}</strong> Categories
            </span>
          </div>
        </div>
      </section>

      <section className="all-products-grid">
        <div className="all-products-grid__container">
          <div className="all-products-grid__grid">
            {paginatedProducts.map((product, index) => {
              const categoryName =
                categoryNames.get(product.categorySlug) ??
                product.categorySlug.replace(/-/g, " ");
              return (
                <div
                  key={product.slug}
                  className="all-products-grid__item product-item"
                  data-aos="fade-up"
                  data-aos-delay={(index + 1) * 100}
                  data-product-name={product.name}
                  data-product-description={product.shortDescription ?? product.description}
                  data-product-code={product.productCode ?? ""}
                  data-product-image={product.image}
                  data-product-category={categoryName}
                  style={{ cursor: "pointer" }}
                >
                  <div className="all-products-grid__image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="all-products-grid__image"
                    />
                    <div className="all-products-grid__category-badge">
                      {categoryName}
                    </div>
                  </div>
                  <div className="all-products-grid__info">
                    <h3 className="all-products-grid__title">{product.name}</h3>
                    <p className="all-products-grid__description">
                      {product.shortDescription ?? product.description}
                    </p>
                    <small className="all-products-grid__hint product-item__hint">
                      Click to view details
                    </small>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="all-products-pagination">
              <div className="all-products-pagination__container">
                {page > 1 && (
                  <Link
                    href={`/all-products?page=${page - 1}`}
                    className="all-products-pagination__btn all-products-pagination__btn--prev"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                    Previous
                  </Link>
                )}

                <div className="all-products-pagination__pages">
                  {startPage > 1 && (
                    <>
                      <Link
                        href="/all-products?page=1"
                        className="all-products-pagination__page"
                      >
                        1
                      </Link>
                      {startPage > 2 && (
                        <span className="all-products-pagination__ellipsis">...</span>
                      )}
                    </>
                  )}

                  {Array.from({ length: endPage - startPage + 1 }).map((_, idx) => {
                    const current = startPage + idx;
                    return (
                      <Link
                        key={`page-${current}`}
                        href={`/all-products?page=${current}`}
                        className={`all-products-pagination__page${
                          current === page ? " all-products-pagination__page--active" : ""
                        }`}
                      >
                        {current}
                      </Link>
                    );
                  })}

                  {endPage < totalPages && (
                    <>
                      {endPage < totalPages - 1 && (
                        <span className="all-products-pagination__ellipsis">...</span>
                      )}
                      <Link
                        href={`/all-products?page=${totalPages}`}
                        className="all-products-pagination__page"
                      >
                        {totalPages}
                      </Link>
                    </>
                  )}
                </div>

                {page < totalPages && (
                  <Link
                    href={`/all-products?page=${page + 1}`}
                    className="all-products-pagination__btn all-products-pagination__btn--next"
                  >
                    Next
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </Link>
                )}
              </div>

              <div className="all-products-pagination__info">
                Showing {showingStart}-{showingEnd} of {totalProducts} products
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
