import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GetQuoteSection from "@/components/GetQuoteSection";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/firestore";

export const dynamic = "force-dynamic";

type CategoryPageProps = {
  params: { category: string };
};

export async function generateMetadata(
  props: CategoryPageProps
): Promise<Metadata> {
  const { category } = props.params;
  const categoryDoc = await getCategoryBySlug(category);

  if (!categoryDoc) {
    return {};
  }

  return {
    title: categoryDoc.seoTitle ?? `${categoryDoc.name} - SingBD Products`,
    description: categoryDoc.seoDescription ?? categoryDoc.description,
    keywords: categoryDoc.seoKeywords,
    alternates: {
      canonical: `/products/${category}`,
    },
  };
}

export default async function CategoryPage(props: CategoryPageProps) {
  const { category } = props.params;
  const categoryDoc = await getCategoryBySlug(category);

  if (!categoryDoc) {
    notFound();
  }

  const products = await getProductsByCategory(category);
  const categoryTitle = `${categoryDoc.name} Collection`;
  const subtitle = categoryDoc.shortDescription
    ? categoryDoc.shortDescription
    : `Explore our complete collection of premium ${categoryDoc.name.toLowerCase()} products`;

  console.log(`[Category Page] ${category}: Found ${products.length} products`);

  return (
    <main className="main products">
      <section className="product-listings" id="product-listings">
        <div className="product-listings__container">
          <h2 className="section__title">{categoryTitle}</h2>
          <p className="section__subtitle">{subtitle}</p>

          {products.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              No products found in this category yet.
            </p>
          ) : (
            <div className="product-category product-category--active">
              <div className="product-category__grid">
                {products.map((product, index) => (
                  <div
                    key={product.slug}
                    className="product-item"
                    data-aos="fade-up"
                    data-aos-delay={(index + 1) * 100}
                    data-product-name={product.name}
                    data-product-description={product.shortDescription ?? product.description}
                    data-product-code={product.productCode ?? ""}
                    data-product-image={product.image}
                    data-product-category={categoryTitle}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-item__image"
                    />
                    <div className="product-item__info">
                      <h4 className="product-item__title">{product.name}</h4>
                      <p className="product-item__description">
                        {product.shortDescription ?? product.description}
                      </p>
                      <small className="product-item__hint">Click to view details</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {categoryDoc.overviewImages && categoryDoc.overviewImages.length > 0 && (
        <section className="category-overview-photos">
          <div className="category-overview-photos__container">
            <div className="category-overview-photos__grid">
              {categoryDoc.overviewImages.map((photo, index) => (
                <div
                  key={`${categoryDoc.slug}-overview-${index}`}
                  className="category-overview-photos__photo"
                  data-aos="fade-up"
                  data-aos-delay={(index + 1) * 200}
                >
                  <img
                    src={photo}
                    alt={`${categoryDoc.name} Overview Photo ${index + 1}`}
                    className="category-overview-photos__image"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <GetQuoteSection />
    </main>
  );
}
