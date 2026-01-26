import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SingBD - a dynamic buying house in Singapore with 10+ years of experience in sourcing high-quality knitwear, woven garments, outerwear, and functional apparel. Sister concern of Fakir Apparels Ltd.",
  keywords: [
    "about SingBD",
    "buying house Singapore",
    "garment sourcing",
    "textile manufacturing",
    "Fakir Apparels",
    "knitwear sourcing",
    "woven garments",
    "outerwear",
    "functional apparel",
    "10 years experience",
    "global partners",
    "quality assurance",
  ],
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="main">
      <section className="about" id="about">
        <div className="about__container">
          <div className="about__content">
            <div className="about__images">
              <div className="about__image-slider">
                <div className="about__image-track">
                  <div className="about__image-slide">
                    <img
                      src="/images/about-us-1.webp"
                      alt="SingBD team collaboration"
                      className="about__image"
                    />
                  </div>
                  <div className="about__image-slide">
                    <img
                      src="/images/about-us-2.webp"
                      alt="Manufacturing process"
                      className="about__image"
                    />
                  </div>
                  <div className="about__image-slide">
                    <img
                      src="/images/about-us-3.webp"
                      alt="Quality control"
                      className="about__image"
                    />
                  </div>
                  <div className="about__image-slide">
                    <img
                      src="/images/about-us-4.webp"
                      alt="Global partners"
                      className="about__image"
                    />
                  </div>
                </div>
                <button
                  className="about__image-control about__image-control--prev"
                  aria-label="Previous image"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="15,18 9,12 15,6" />
                  </svg>
                </button>
                <button
                  className="about__image-control about__image-control--next"
                  aria-label="Next image"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </button>
                <div className="about__image-indicators">
                  <button className="about__indicator about__indicator--active" data-slide="0"></button>
                  <button className="about__indicator" data-slide="1"></button>
                  <button className="about__indicator" data-slide="2"></button>
                  <button className="about__indicator" data-slide="3"></button>
                </div>
              </div>
            </div>

            <div className="about__text">
              <div className="about__badge">
                <svg
                  className="about__badge-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>10 Years Experience</span>
              </div>
              <h2 className="section__title">About Us</h2>
              <p className="section__subtitle">
                Based in Singapore, we are a dynamic buying house sourcing and producing
                premium knitwear, woven garments, outerwear, functional apparel, and
                lifestyle accessories.
              </p>
              <p className="about__description about__description--centered">
                We are a sister concern of Fakir Apparels Ltd, in Bangladesh, one of the
                leading and largest privately owned multi-product knit, woven, and fabric
                manufacturing groups of companies.
              </p>

              <div className="about__stats">
                <div className="about__stat">
                  <div className="about__stat-number">10+</div>
                  <div className="about__stat-label">Years Experience</div>
                </div>
                <div className="about__stat">
                  <div className="about__stat-number">15+</div>
                  <div className="about__stat-label">Global Partners</div>
                </div>
                <div className="about__stat">
                  <div className="about__stat-number">100%</div>
                  <div className="about__stat-label">Quality Assured</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="what-sets-us-apart">
        <div className="about__container">
          <div className="about__features-section">
            <h3 className="about__features-title">What Sets Us Apart</h3>
            <div className="about__features-container">
              <div className="about__features-tabs">
                <button className="about__feature-tab about__feature-tab--active" data-tab="erp-driven">
                  <h3 className="about__feature-tab-title">ERP Driven</h3>
                  <p className="about__feature-tab-description">streamlined ERP for efficiency</p>
                </button>

                <button className="about__feature-tab" data-tab="ethical">
                  <h3 className="about__feature-tab-title">Ethical</h3>
                  <p className="about__feature-tab-description">Sustainable and responsible practices</p>
                </button>

                <button className="about__feature-tab" data-tab="quality">
                  <h3 className="about__feature-tab-title">Quality</h3>
                  <p className="about__feature-tab-description">Premium standards in every product</p>
                </button>
              </div>

              <div className="about__features-photos">
                <div className="about__feature-photo about__feature-photo--active" id="erp-driven-photo">
                  <img
                    src="/images/sets-us-1.webp"
                    alt="ERP Driven Efficiency"
                    className="about__feature-photo-image"
                  />
                </div>

                <div className="about__feature-photo" id="ethical-photo">
                  <img
                    src="/images/sets-us-2.webp"
                    alt="Ethical Practices"
                    className="about__feature-photo-image"
                  />
                </div>

                <div className="about__feature-photo" id="quality-photo">
                  <img
                    src="/images/sets-us-3.webp"
                    alt="Quality Standards"
                    className="about__feature-photo-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values" style={{ minHeight: '400px', display: 'block' }}>
        <div className="values__container">
          <h2 className="section__title" style={{ color: '#0891b2', marginBottom: '3rem' }}>Our Values</h2>
          <div className="values__grid">
            <div className="value__card" data-aos="fade-up" data-aos-delay="100" style={{ minHeight: '200px' }}>
              <h3 className="value__title" style={{ color: '#051821', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Quality Excellence</h3>
              <p className="value__description" style={{ color: '#051821', lineHeight: '1.6' }}>
                We maintain the highest standards in every aspect of our operations, from
                sourcing to delivery.
              </p>
            </div>

            <div className="value__card" data-aos="fade-up" data-aos-delay="200" style={{ minHeight: '200px' }}>
              <h3 className="value__title" style={{ color: '#051821', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Sustainable Practices</h3>
              <p className="value__description" style={{ color: '#051821', lineHeight: '1.6' }}>
                Environmental responsibility is at the core of everything we do, ensuring a
                better future for all.
              </p>
            </div>

            <div className="value__card" data-aos="fade-up" data-aos-delay="300" style={{ minHeight: '200px' }}>
              <h3 className="value__title" style={{ color: '#051821', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Global Partnership</h3>
              <p className="value__description" style={{ color: '#051821', lineHeight: '1.6' }}>
                Building strong, long-term relationships between brands and manufacturers
                across the globe.
              </p>
            </div>

            <div className="value__card" data-aos="fade-up" data-aos-delay="400" style={{ minHeight: '200px' }}>
              <h3 className="value__title" style={{ color: '#051821', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Innovation</h3>
              <p className="value__description" style={{ color: '#051821', lineHeight: '1.6' }}>
                Continuously evolving our processes and technologies to meet the changing
                needs of the industry.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
