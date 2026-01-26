import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/firestore";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact SingBD for apparel sourcing solutions. Get in touch with our team in Bangladesh for high-quality garment manufacturing, textile sourcing, and sustainable fashion partnerships.",
  keywords: [
    "contact SingBD",
    "apparel sourcing contact",
    "garment manufacturing contact",
    "textile sourcing",
    "Bangladesh office",
    "sourcing solutions",
    "get quote",
    "business inquiry",
  ],
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const addressLines = settings.addressLines ?? [
    "9th Floor, ANZ Huq Eleven Square",
    "Plot #01, Road #11, Block #H",
    "Banani, Dhaka-1213, Bangladesh",
  ];
  return (
    <main className="main">
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
                      {addressLines.map((line, index) => (
                        <span key={`${line}-${index}`}>
                          {line}
                          {index < addressLines.length - 1 && <br />}
                        </span>
                      ))}
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
                    <span>{settings.phone}</span>
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
                    <span>{settings.email}</span>
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
    </main>
  );
}
