import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import { getClientLogos, type ClientLogo } from "@/lib/firestore";
import WhatsAppButton from "@/components/WhatsAppButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home",
  description:
    "SingBD - Your trusted partner in apparel sourcing. Connect with global brands and premium manufacturers worldwide for high-quality garments, textiles, and sustainable fashion solutions.",
  keywords: [
    "apparel sourcing",
    "garment manufacturing",
    "textile manufacturing",
    "sustainable fashion",
    "global brands",
    "premium manufacturers",
    "knitwear",
    "woven garments",
    "outerwear",
    "functional apparel",
    "homeware",
    "accessories",
    "handicrafts",
    "Bangladesh manufacturing",
    "Singapore sourcing",
  ],
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const fallbackClients = [
    { name: "Camel Active", logoUrl: "/images/Icon/Client List Logo/Camel-Actice.webp", slug: "camel-active" },
    { name: "Denim & Flower", logoUrl: "/images/Icon/Client List Logo/Denim-&-Flower.webp", slug: "denim-flower" },
    { name: "Switch", logoUrl: "/images/Icon/Client List Logo/switch-logo.webp", slug: "switch" },
    { name: "ETOSSA", logoUrl: "/images/Icon/Client List Logo/ETOSSA.webp", slug: "etossa" },
  ];
  let clients: ClientLogo[] = [];
  try {
    clients = await getClientLogos();
  } catch (error) {
    console.error("Failed to fetch client logos:", error);
    clients = []; 
  }
  
  const clientList =
    clients.length > 0
      ? clients.map((client) => ({
          name: client.name,
          logoUrl: client.logoUrl,
          slug: client.name.toLowerCase().replace(/\s+/g, "-"),
        }))
      : fallbackClients;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does SingBD offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "SingBD offers comprehensive apparel sourcing services including knitwear, woven garments, outerwear, functional outdoor apparel, homeware, accessories, and handicrafts. We connect global brands with premium manufacturers worldwide.",
        },
      },
      {
        "@type": "Question",
        name: "Where is SingBD located?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "SingBD is based in Singapore at 100 Jln Sultan, Singapore 199001. We serve clients worldwide from our strategic location.",
        },
      },
      {
        "@type": "Question",
        name: "How long has SingBD been in business?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "SingBD has over 10 years of experience in apparel sourcing and manufacturing. We are a sister concern of Fakir Apparels Ltd, one of Bangladesh's leading manufacturing groups.",
        },
      },
      {
        "@type": "Question",
        name: "What quality standards does SingBD maintain?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "SingBD maintains rigorous quality standards including pre-production QC, in-line QC, final QC, and multiple quality checks before shipment. We work with certified manufacturers and maintain compliance with international standards.",
        },
      },
    ],
  };

  return (
    <main className="main">
      <section className="video-overview" id="video-overview">
        <div className="video-overview__container">
          <div className="video-overview__content">
            <div className="video-overview__video-container" style={{ position: "relative", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
              <div style={{ position: "relative", paddingTop: "56.25%", width: "100%" }}>
                <iframe
                  src="https://iframe.mediadelivery.net/embed/489779/0d58b550-33c4-478a-a7ba-9e81efd6b534?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
                  loading="lazy"
                  style={{ border: 0, position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen
                  title="SingBD video overview"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero" id="home">
        <div className="hero__background">
          <div className="hero__overlay"></div>
          <div className="hero__floating-elements">
            <div className="hero__floating-element hero__floating-element--1"></div>
            <div className="hero__floating-element hero__floating-element--2"></div>
            <div className="hero__floating-element hero__floating-element--3"></div>
          </div>
        </div>
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__text">
              <h1 className="hero__title">
                Connecting <span className="hero__title-highlight">Global Brands</span> &amp;
                Manufacturers
              </h1>
              <p className="hero__description">
                From Singapore, we connect global fashion brands with premium manufacturers
                — your trusted apparel sourcing partner.
              </p>
              <div className="hero__buttons">
                <a href="#services" className="hero__btn hero__btn--primary">
                  Explore Services
                  <svg
                    className="btn__icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#contact" className="hero__btn hero__btn--secondary">
                  <svg
                    className="btn__icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Contact Us
                </a>
              </div>
            </div>
            <div className="hero__visual">
              <div className="hero__animation">
                <Image
                  src="/images/LandingPage_HeroSectionPhoto.jpg"
                  alt="SingBD Global Operations Animation"
                  className="hero__animation-gif"
                  width={950}
                  height={544}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="what-we-do" id="services">
        <div className="what-we-do__container">
          <div className="what-we-do__header">
            <h2 className="section__title">What We Do</h2>
            <p className="section__subtitle">
              Comprehensive solutions across sourcing, quality control, and cross-border
              business
            </p>
          </div>

          <div className="what-we-do__tabs">
            <button className="what-we-do__tab what-we-do__tab--active" data-tab="sourcing">
              <span>Sourcing</span>
            </button>
            <button className="what-we-do__tab" data-tab="qa-qc">
              <span>QA, QC &amp; Audit</span>
            </button>
            <button className="what-we-do__tab" data-tab="cross-border">
              <span>Cross Border</span>
            </button>
          </div>

          <div className="what-we-do__content">
            <div className="what-we-do__panel what-we-do__panel--active" id="sourcing">
              <div className="what-we-do__grid">
                <div className="what-we-do__card" data-aos="fade-up" data-aos-delay="100">
                  <div className="what-we-do__card-icon">
                    <img
                      src="/images/factory-intro.webp"
                      alt="Factory Introduction"
                    />
                  </div>
                  <h3 className="what-we-do__card-title">Factory Introduction</h3>
                  <p className="what-we-do__card-description">
                    With 20+ years of experience, SingBD connects you with top factories that
                    meet your specific needs, ensuring quality and reliability for all your
                    manufacturing requirements.
                  </p>
                </div>
                <div className="what-we-do__card" data-aos="fade-up" data-aos-delay="200">
                  <div className="what-we-do__card-icon">
                    <img
                      src="/images/prod-dev.webp"
                      alt="Product Development"
                    />
                  </div>
                  <h3 className="what-we-do__card-title">Product Development</h3>
                  <p className="what-we-do__card-description">
                    We transform your concepts into reality with expert guidance. From design
                    to production, we refine ideas, source materials, and manage
                    manufacturing, ensuring seamless execution.
                  </p>
                </div>
                <div className="what-we-do__card" data-aos="fade-up" data-aos-delay="300">
                  <div className="what-we-do__card-icon">
                    <img src="/images/costing.webp" alt="Costing" />
                  </div>
                  <h3 className="what-we-do__card-title">Costing</h3>
                  <p className="what-we-do__card-description">
                    We collaborate with factories to provide accurate pricing based on your
                    specifications. We work with your target price to achieve optimal
                    cost-efficiency and value.
                  </p>
                </div>
                <div className="what-we-do__card" data-aos="fade-up" data-aos-delay="400">
                  <div className="what-we-do__card-icon">
                    <img
                      src="/images/merchandising.webp"
                      alt="Merchandising"
                    />
                  </div>
                  <h3 className="what-we-do__card-title">Merchandising</h3>
                  <p className="what-we-do__card-description">
                    We manage sampling, approvals, production planning, and shipping
                    documentation to deliver comprehensive final landed pricing and approval
                    samples.
                  </p>
                </div>
              </div>
            </div>

            <div className="what-we-do__panel" id="qa-qc">
              <div className="what-we-do__grid what-we-do__grid--three">
                <div className="what-we-do__card" data-aos="fade-up" data-aos-delay="100">
                  <div className="what-we-do__card-icon">
                    <img src="/images/Icon/Icons/Services/QC.webp" alt="Quality Control" />
                  </div>
                  <h3 className="what-we-do__card-title">Quality Control</h3>
                  <p className="what-we-do__card-description">
                    We have a team of experienced QA and QC professionals. We provide
                    in-line and final inspection services to ensure your expectations are
                    consistently exceeded.
                  </p>
                </div>
                <div className="what-we-do__card" data-aos="fade-up" data-aos-delay="200">
                  <div className="what-we-do__card-icon">
                    <img
                      src="/images/Icon/Icons/Services/Factory-Assesment.webp"
                      alt="Factory Assessments"
                    />
                  </div>
                  <h3 className="what-we-do__card-title">Factory Assessments</h3>
                  <p className="what-we-do__card-description">
                    We perform comprehensive audit visits to factories to evaluate social and
                    environmental compliance levels. We produce detailed reports and
                    Corrective Action Plans (CAP).
                  </p>
                </div>
                <div className="what-we-do__card" data-aos="fade-up" data-aos-delay="300">
                  <div className="what-we-do__card-icon">
                    <img src="/images/Icon/Icons/Services/Audit.webp" alt="Compliance Audit" />
                  </div>
                  <h3 className="what-we-do__card-title">Compliance Audit</h3>
                  <p className="what-we-do__card-description">
                    We conduct thorough compliance audits ensuring adherence to international
                    standards, labor regulations, and ethical manufacturing practices,
                    providing comprehensive compliance certification.
                  </p>
                </div>
              </div>
            </div>

            <div className="what-we-do__panel" id="cross-border">
              <div className="what-we-do__grid what-we-do__grid--three">
                <div className="what-we-do__card" data-aos="fade-up" data-aos-delay="100">
                  <div className="what-we-do__card-icon">
                    <img
                      src="/images/Icon/Icons/Services/Cross-Country-Supply-Chain.webp"
                      alt="Cross Country Supply Chain"
                    />
                  </div>
                  <h3 className="what-we-do__card-title">Cross Country Supply Chain</h3>
                  <p className="what-we-do__card-description">
                    We manage end-to-end supply chains across multiple countries, ensuring
                    smooth coordination between sourcing, production, and delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="categories" id="categories">
        <div className="categories__container">
          <h2 className="section__title">Product Categories</h2>

          <div className="categories__content">
            <div className="categories__sidebar">
              <div className="categories__list">
                <div className="category__item category__item--active" data-category="woven-tops">
                  <div className="category__icon">
                    <img
                      src="/images/Category Icons/Woven Tops.webp"
                      alt="Woven Tops"
                      className="category__icon-img"
                    />
                  </div>
                  <h3 className="category__title">Woven Tops</h3>
                </div>
                <div className="category__item" data-category="woven-bottoms">
                  <div className="category__icon">
                    <img
                      src="/images/Category Icons/Woven Bottoms.webp"
                      alt="Woven Bottoms"
                      className="category__icon-img"
                    />
                  </div>
                  <h3 className="category__title">Woven Bottoms</h3>
                </div>
                <div className="category__item" data-category="coats-jackets">
                  <div className="category__icon">
                    <img
                      src="/images/Category Icons/Coats & Jackets.webp"
                      alt="Coats & Jackets"
                      className="category__icon-img"
                    />
                  </div>
                  <h3 className="category__title">Coats &amp; Jackets</h3>
                </div>
                <div className="category__item" data-category="denim">
                  <div className="category__icon">
                    <img
                      src="/images/Category Icons/Denim.webp"
                      alt="Denim"
                      className="category__icon-img"
                    />
                  </div>
                  <h3 className="category__title">Denim</h3>
                </div>
                <div className="category__item" data-category="knitwear">
                  <div className="category__icon">
                    <img
                      src="/images/Category Icons/Knit Wear.webp"
                      alt="Knitwear"
                      className="category__icon-img"
                    />
                  </div>
                  <h3 className="category__title">Knitwear</h3>
                </div>
                <div className="category__item" data-category="sweater">
                  <div className="category__icon">
                    <img
                      src="/images/Category Icons/Knit Wear.webp"
                      alt="Sweater"
                      className="category__icon-img"
                    />
                  </div>
                  <h3 className="category__title">Sweater</h3>
                </div>
                <div className="category__item" data-category="sportswear">
                  <div className="category__icon">
                    <img
                      src="/images/Category Icons/Sports Wear.webp"
                      alt="Sportswear"
                      className="category__icon-img"
                    />
                  </div>
                  <h3 className="category__title">Sportswear</h3>
                </div>
                <div className="category__item" data-category="homeware">
                  <div className="category__icon">
                    <img
                      src="/images/Category Icons/Home Wear.webp"
                      alt="Homeware"
                      className="category__icon-img"
                    />
                  </div>
                  <h3 className="category__title">Homeware</h3>
                </div>
                <div className="category__item" data-category="handicrafts">
                  <div className="category__icon">
                    <img
                      src="/images/Category Icons/Handicraft.webp"
                      alt="Handicrafts"
                      className="category__icon-img"
                    />
                  </div>
                  <h3 className="category__title">Handicrafts</h3>
                </div>
                <div className="category__item" data-category="workwear">
                  <div className="category__icon">
                    <img
                      src="/images/Category Icons/Work Wear.webp"
                      alt="Workwear"
                      className="category__icon-img"
                    />
                  </div>
                  <h3 className="category__title">Workwear</h3>
                </div>
              </div>
            </div>

            <div className="categories__display">
              <div className="categories__product-info">
                <h3 className="categories__product-title">Woven Tops</h3>
                <p className="categories__product-description">
                  High-quality woven tops including shirts, blouses, and tunics. Made from
                  premium fabrics with attention to detail and comfort.
                </p>
              </div>

              <div className="categories__gallery">
                <div className="categories__gallery-slider">
                  <div className="categories__gallery-slide" data-category="woven-tops">
                    <img
                      src="/images/Category Icons/woven-tops-landscape.webp"
                      alt="Woven Tops Manufacturing"
                      className="categories__gallery-image"
                    />
                  </div>

                  <div className="categories__gallery-slide" data-category="woven-bottoms">
                    <img
                      src="/images/Category Icons/woven-bottom-landscape.webp"
                      alt="Woven Bottoms Manufacturing"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="woven-bottoms">
                    <img
                      src="/images/Category Icons/woven-bottom-land-2.webp"
                      alt="Woven Bottoms Process"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="woven-bottoms">
                    <img
                      src="/images/Category Icons/woven-bottom-land-3.webp"
                      alt="Woven Bottoms Quality"
                      className="categories__gallery-image"
                    />
                  </div>

                  <div className="categories__gallery-slide" data-category="coats-jackets">
                    <img
                      src="/images/Category Icons/coats-land-1.webp"
                      alt="Coats & Jackets Manufacturing"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="coats-jackets">
                    <img
                      src="/images/Category Icons/coats-land-2.webp"
                      alt="Coats & Jackets Process"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="coats-jackets">
                    <img
                      src="/images/Category Icons/coats-land-3.webp"
                      alt="Coats & Jackets Quality"
                      className="categories__gallery-image"
                    />
                  </div>

                  <div className="categories__gallery-slide" data-category="denim">
                    <img
                      src="/images/Category Icons/denim-land.webp"
                      alt="Denim Manufacturing"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="denim">
                    <img
                      src="/images/Category Icons/denim-land-2.webp"
                      alt="Denim Process"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="denim">
                    <img
                      src="/images/Category Icons/denim-land-4.webp"
                      alt="Denim Quality"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="denim">
                    <img
                      src="/images/Category Icons/denim-land-5.webp"
                      alt="Denim Collection"
                      className="categories__gallery-image"
                    />
                  </div>

                  <div className="categories__gallery-slide" data-category="knitwear">
                    <img
                      src="/images/Category Icons/knitware-land-1.webp"
                      alt="Knitwear Manufacturing"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="knitwear">
                    <img
                      src="/images/Category Icons/knitware-land-2.webp"
                      alt="Knitwear Process"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="knitwear">
                    <img
                      src="/images/Category Icons/knitware-land-4.webp"
                      alt="Knitwear Quality"
                      className="categories__gallery-image"
                    />
                  </div>

                  <div className="categories__gallery-slide" data-category="sweater">
                    <img
                      src="/images/Category Icons/sweater-land-1.jpg"
                      alt="Sweater Manufacturing"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="sweater">
                    <img
                      src="/images/Category Icons/sweater-land-2.jpg"
                      alt="Sweater Process"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="sweater">
                    <img
                      src="/images/Category Icons/sweater-land-3.jpg"
                      alt="Sweater Quality"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="sweater">
                    <img
                      src="/images/Category Icons/sweater-land-4.webp"
                      alt="Sweater Collection"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="sweater">
                    <img
                      src="/images/Category Icons/sweater-land-5.jpg"
                      alt="Sweater Style"
                      className="categories__gallery-image"
                    />
                  </div>

                  <div className="categories__gallery-slide" data-category="sportswear">
                    <img
                      src="/images/Category Icons/sportsware-land-1.webp"
                      alt="Sportswear Manufacturing"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="sportswear">
                    <img
                      src="/images/Category Icons/sportsware-land-2.webp"
                      alt="Sportswear Process"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="sportswear">
                    <img
                      src="/images/Category Icons/sportsware-land-3.webp"
                      alt="Sportswear Quality"
                      className="categories__gallery-image"
                    />
                  </div>

                  <div className="categories__gallery-slide" data-category="homeware">
                    <img
                      src="/images/Category Icons/homeware-land-1.webp"
                      alt="Homeware Manufacturing"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="homeware">
                    <img
                      src="/images/Category Icons/homeware-land-2.webp"
                      alt="Homeware Process"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="homeware">
                    <img
                      src="/images/Category Icons/homeware-land-3.webp"
                      alt="Homeware Quality"
                      className="categories__gallery-image"
                    />
                  </div>

                  <div className="categories__gallery-slide" data-category="handicrafts">
                    <img
                      src="/images/Category Icons/handi-crafts-land-1.webp"
                      alt="Handicrafts Manufacturing"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="handicrafts">
                    <img
                      src="/images/Category Icons/handicrafts-land-2.webp"
                      alt="Handicrafts Process"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="handicrafts">
                    <img
                      src="/images/Category Icons/handicrafts-land-3.webp"
                      alt="Handicrafts Quality"
                      className="categories__gallery-image"
                    />
                  </div>

                  <div className="categories__gallery-slide" data-category="workwear">
                    <img
                      src="/images/Category Icons/workwear-land-1.webp"
                      alt="Workwear Manufacturing"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="workwear">
                    <img
                      src="/images/Category Icons/workwear-land-2.webp"
                      alt="Workwear Process"
                      className="categories__gallery-image"
                    />
                  </div>
                  <div className="categories__gallery-slide" data-category="workwear">
                    <img
                      src="/images/Category Icons/workwear-land-3.webp"
                      alt="Workwear Quality"
                      className="categories__gallery-image"
                    />
                  </div>
                </div>

                <button className="categories__gallery-nav categories__gallery-nav--prev">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button className="categories__gallery-nav categories__gallery-nav--next">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>

                <div className="categories__gallery-controls"></div>
              </div>
            </div>
          </div>

          <div className="categories__cta">
            <a href="/products" className="categories__cta-button">
              View All Products
              <svg
                className="categories__cta-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="partners" id="partners">
        <div className="partners__container">
          <div className="partners__header">
            <h2 className="section__title">Our Trusted Partners</h2>
            <p className="section__subtitle">
              We partner with leading international brands and retailers to deliver
              exceptional <a href="/products" className="section__link">apparel sourcing solutions</a>
              worldwide.
            </p>
          </div>
          <div className="partners__slider">
            <div className="partners__track">
              {Array.from({ length: 15 }).map((_, setIndex) => (
                <Fragment key={`partner-set-${setIndex}`}>
                  {clientList.map((client, clientIndex) => (
                    <a
                      key={`${client.slug}-${setIndex}-${clientIndex}`}
                      href="#"
                      className="partner__logo"
                      data-partner={client.slug}
                    >
                      <img
                        src={client.logoUrl}
                        alt={client.name}
                        className="partner__image"
                      />
                    </a>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      <section className="contact" id="contact">
        <div className="contact__container">
          <h2 className="section__title">Contact Us</h2>

          <div className="contact__content">
            <div className="contact__form-wrapper">
              <form className="contact__form" action="/api/contact" method="POST">
                <div className="contact__form-row">
                  <div className="contact__form-group">
                    <label htmlFor="firstName" className="contact__form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="contact__form-input"
                      placeholder="Your first name"
                      required
                    />
                  </div>
                  <div className="contact__form-group">
                    <label htmlFor="lastName" className="contact__form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="contact__form-input"
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>
                <div className="contact__form-group">
                  <label htmlFor="email" className="contact__form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="contact__form-input"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="contact__form-row">
                  <div className="contact__form-group">
                    <label htmlFor="company" className="contact__form-label">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="contact__form-input"
                      placeholder="Your company name"
                    />
                  </div>
                  <div className="contact__form-group">
                    <label htmlFor="subject" className="contact__form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="contact__form-input"
                      placeholder="Message subject"
                    />
                  </div>
                </div>
                <div className="contact__form-group">
                  <label htmlFor="message" className="contact__form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="contact__form-textarea"
                    placeholder="Tell us about your sourcing needs..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="contact__form-submit">
                  Send Message
                </button>
              </form>
            </div>

            <div className="contact__info">
              <div className="contact__info-card">
                <h3 className="contact__info-title">Office Location</h3>
                <div className="contact__info-items">
                  <div className="contact__info-item">
                    <svg
                      className="contact__info-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>
                      9th Floor, ANZ Huq Eleven Square
                      <br />
                      Plot #01, Road #11, Block #H
                      <br />
                      Banani, Dhaka-1213, Bangladesh
                    </span>
                  </div>
                  <div className="contact__info-item">
                    <svg
                      className="contact__info-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>+8801711594673</span>
                  </div>
                  <div className="contact__info-item">
                    <svg
                      className="contact__info-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>info@singbd.com</span>
                  </div>
                </div>
              </div>

              <div className="contact__map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.123456789!2d90.4000!3d23.8000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a8b8b8b8b8%3A0x1234567890abcdef!2sANZ%20Huq%20Eleven%20Square%2C%20Plot%20%2301%2C%20Road%20%2311%2C%20Block%20%23H%2C%20Banani%2C%20Dhaka%201213%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1234567890"
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SingBD office location map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <WhatsAppButton />
    </main>
  );
}
