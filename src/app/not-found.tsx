import Link from "next/link";

export default function NotFound() {
  return (
    <main className="main">
      <div className="error-page">
        <div className="error-page__container">
          <div className="error-page__content">
            <h1 className="error-page__title">404</h1>
            <h2 className="error-page__subtitle">Page Not Found</h2>
            <p className="error-page__description">
              The page you're looking for doesn't exist. It might have been moved,
              deleted, or you entered the wrong URL.
            </p>
            <div className="error-page__actions">
              <Link href="/" className="error-page__btn error-page__btn--primary">
                Go to Homepage
              </Link>
              <Link href="/contact" className="error-page__btn error-page__btn--secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
