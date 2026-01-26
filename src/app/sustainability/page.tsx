import type { Metadata } from "next";
import Link from "next/link";
import { getCertifications } from "@/lib/firestore";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "Learn about SingBD's commitment to environmental responsibility, sustainable manufacturing practices, and our 2030 sustainability goals.",
  keywords: [
    "sustainability",
    "sustainable manufacturing",
    "environmental responsibility",
    "GOTS certified",
    "OEKO-TEX",
    "Better Cotton Initiative",
    "Cradle to Cradle",
    "green manufacturing",
    "eco-friendly",
  ],
  alternates: {
    canonical: "/sustainability",
  },
};

export default async function SustainabilityPage() {
  const fallbackCertifications = [
    {
      name: "GOTS Certified",
      status: "Certified",
      description: "Global Organic Textile Standard for organic fibers",
      image: "/images/GOTS.png",
    },
    {
      name: "Wrap — Member",
      status: "Member",
      description: "Responsible Production",
      image: "/images/Wrap Logo.svg",
    },
    {
      name: "Accord — Member",
      status: "Member",
      description: "Ensuring Safety",
      image: "/images/Accord Logo.png",
    },
    {
      name: "SEDEX",
      status: "Certified",
      description: "Supplier Ethical Data Exchange",
      image: "/images/sedex-logo-png_seeklogo-460003.png",
    },
    {
      name: "Better Work",
      status: "Certified",
      description: "Improving working conditions in global supply chains",
      image: "/images/betterwork.png",
    },
    {
      name: "BSCI",
      status: "Certified",
      description: "Business Social Compliance Initiative",
      image: "/images/Business-social-compliance-initiative.jpg",
    },
    {
      name: "OEKO-TEX Standard 100",
      status: "Certified",
      description: "Confidence in Textiles - Harmful Substance Testing",
      image: "/images/confidence-in-textiles-oeko-tex-standard-100-seeklogo.png",
    },
    {
      name: "Fairware",
      status: "Certified",
      description: "Ethical and sustainable promotional products",
      image: "/images/Fairware.png",
    },
    {
      name: "RDS",
      status: "Certified",
      description: "Responsible Down Standard",
      image: "/images/RDS_COLOR.png",
    },
  ];
  const certifications = await getCertifications();
  const certificationList = certifications.length > 0 ? certifications : fallbackCertifications;
  return (
    <main className="main">
      <section className="sustainability-hero">
        <div className="sustainability-hero__container">
          <div className="sustainability-hero__content">
            <h1 className="sustainability-hero__title">Sustainability</h1>
            <p className="sustainability-hero__subtitle">
              Our commitment to environmental responsibility
            </p>
            <h2 className="sustainability-hero__heading">Sustainable Manufacturing</h2>
            <p className="sustainability-hero__heading-subtitle">for a Better Tomorrow</p>
            <p className="sustainability-hero__description">
              We're committed to creating high-quality garments while minimizing our
              environmental impact through innovative sustainable practices and responsible
              manufacturing.
            </p>
          </div>
        </div>
      </section>

      <section className="certifications" id="certifications">
        <div className="certifications__container">
          <h2 className="section__title">Our Certifications</h2>
          <p className="section__subtitle">
            Recognized by leading industry organizations for our commitment to sustainability
          </p>

          <div className="certifications__grid">
            {certificationList.map((certification, index) => (
              <div
                key={`${certification.name}-${index}`}
                className="certification__card"
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 100}
              >
                <div className="certification__icon">
                  <img
                    src={certification.image}
                    alt={certification.name}
                    className="certification__img"
                  />
                </div>
                <h3 className="certification__title">{certification.name}</h3>
                <div className="certification__status">{certification.status}</div>
                <p className="certification__description">{certification.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="initiatives" style={{ minHeight: '400px', display: 'block', padding: '4rem 0', background: '#ffffff' }}>
        <div className="initiatives__container">
          <h2 className="section__title" style={{ color: '#0891b2', marginBottom: '1rem' }}>Our Initiatives</h2>
          <p className="section__subtitle" style={{ color: '#64748b', marginBottom: '3rem' }}>
            Concrete actions we're taking to reduce our environmental footprint
          </p>

          <div className="initiatives__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="initiative__card" data-aos="fade-up" data-aos-delay="100" style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
              <div className="initiative__icon">
                <svg
                  className="initiative__svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="initiative__title" style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#051821', textAlign: 'center' }}>Water Conservation</h3>
              <div className="initiative__metric" style={{ color: '#0891b2', fontWeight: '600', marginBottom: '0.5rem', textAlign: 'center' }}>40% reduction in water usage</div>
              <p className="initiative__description" style={{ color: '#051821', lineHeight: '1.6', textAlign: 'center' }}>
                Advanced water recycling systems reduce consumption by 40%
              </p>
            </div>

            <div className="initiative__card" data-aos="fade-up" data-aos-delay="200" style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
              <div className="initiative__icon">
                <svg
                  className="initiative__svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3 className="initiative__title" style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#051821', textAlign: 'center' }}>Renewable Energy</h3>
              <div className="initiative__metric" style={{ color: '#0891b2', fontWeight: '600', marginBottom: '0.5rem', textAlign: 'center' }}>70% renewable energy</div>
              <p className="initiative__description" style={{ color: '#051821', lineHeight: '1.6', textAlign: 'center' }}>
                Solar panels power 70% of our manufacturing facilities
              </p>
            </div>

            <div className="initiative__card" data-aos="fade-up" data-aos-delay="300" style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
              <div className="initiative__icon">
                <svg
                  className="initiative__svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 6h18l-2 13H5L3 6z" />
                  <path d="M3 6l2-4h14l2 4" />
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="20" cy="20" r="1" />
                </svg>
              </div>
              <h3 className="initiative__title" style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#051821', textAlign: 'center' }}>Zero Waste Program</h3>
              <div className="initiative__metric" style={{ color: '#0891b2', fontWeight: '600', marginBottom: '0.5rem', textAlign: 'center' }}>95% waste diverted from landfills</div>
              <p className="initiative__description" style={{ color: '#051821', lineHeight: '1.6', textAlign: 'center' }}>
                Fabric scraps recycled into new products and materials
              </p>
            </div>

            <div className="initiative__card" data-aos="fade-up" data-aos-delay="400" style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
              <div className="initiative__icon">
                <svg
                  className="initiative__svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="initiative__title" style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#051821', textAlign: 'center' }}>Fair Labor Practices</h3>
              <div className="initiative__metric" style={{ color: '#0891b2', fontWeight: '600', marginBottom: '0.5rem', textAlign: 'center' }}>100% audited suppliers</div>
              <p className="initiative__description" style={{ color: '#051821', lineHeight: '1.6', textAlign: 'center' }}>
                Ensuring ethical working conditions throughout our supply chain
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="goals-2030" style={{ minHeight: '400px', display: 'block', padding: '4rem 0', background: '#f8fafc' }}>
        <div className="goals-2030__container">
          <h2 className="section__title" style={{ color: '#0891b2', marginBottom: '1rem' }}>2030 Sustainability Goals</h2>
          <p className="section__subtitle" style={{ color: '#64748b', marginBottom: '3rem' }}>
            Our ambitious targets for creating a more sustainable future
          </p>

          <div className="goals-2030__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="goal__card" data-aos="fade-up" data-aos-delay="100" style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
              <h3 className="goal__title" style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#051821', textAlign: 'center' }}>Carbon Neutral by 2030</h3>
              <p className="goal__description" style={{ color: '#051821', lineHeight: '1.6', textAlign: 'center' }}>
                Reducing greenhouse gas emissions across operations
              </p>
            </div>

            <div className="goal__card" data-aos="fade-up" data-aos-delay="200" style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
              <h3 className="goal__title" style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#051821', textAlign: 'center' }}>100% Sustainable Materials</h3>
              <p className="goal__description" style={{ color: '#051821', lineHeight: '1.6', textAlign: 'center' }}>Transitioning to eco-friendly raw materials</p>
            </div>

            <div className="goal__card" data-aos="fade-up" data-aos-delay="300" style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
              <h3 className="goal__title" style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#051821', textAlign: 'center' }}>Zero Liquid Discharge</h3>
              <p className="goal__description" style={{ color: '#051821', lineHeight: '1.6', textAlign: 'center' }}>Eliminating wastewater discharge from facilities</p>
            </div>

            <div className="goal__card" data-aos="fade-up" data-aos-delay="400" style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
              <h3 className="goal__title" style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#051821', textAlign: 'center' }}>Circular Supply Chain</h3>
              <p className="goal__description" style={{ color: '#051821', lineHeight: '1.6', textAlign: 'center' }}>Creating closed-loop manufacturing processes</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sustainability-cta">
        <div className="sustainability-cta__container">
          <h2 className="sustainability-cta__title">
            Partner with Us for Sustainable Manufacturing
          </h2>
          <p className="sustainability-cta__description">
            Join us in creating a more sustainable future while maintaining the highest
            quality standards for your garment manufacturing needs.
          </p>
          <div className="sustainability-cta__buttons">
            <Link href="/contact" className="btn btn--primary">
              Request Sustainability Report
            </Link>
            <a href="#certifications" className="btn btn--secondary">
              Learn More About Our Practices
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
