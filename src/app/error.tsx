"use client";

import Link from "next/link";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="main">
      <div className="error-page">
        <div className="error-page__container">
          <div className="error-page__content">
            <h1 className="error-page__title">500</h1>
            <h2 className="error-page__subtitle">Server Error</h2>
            <p className="error-page__description">
              We're experiencing technical difficulties. Our team has been notified and
              is working to resolve the issue. Please try again later.
            </p>
            <div className="error-page__actions">
              <button
                type="button"
                onClick={() => reset()}
                className="error-page__btn error-page__btn--primary"
              >
                Try Again
              </button>
              <Link href="/contact" className="error-page__btn error-page__btn--secondary">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
      <pre style={{ display: "none" }}>{error.message}</pre>
    </main>
  );
}
