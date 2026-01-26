import Link from "next/link";

export default function GetQuoteSection() {
  return (
    <section className="products-quote">
      <div className="products-quote__container">
        <div className="products-quote__content">
          <h2 className="products-quote__title">Ready to Get Started?</h2>
          <p className="products-quote__subtitle">
            Contact us for custom manufacturing solutions and competitive quotes
          </p>
          <Link href="/contact" className="btn btn--primary btn--large">
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
