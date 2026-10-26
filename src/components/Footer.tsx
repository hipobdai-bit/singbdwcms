type FooterProps = {
  contact?: {
    email: string;
    phone: string;
    addressLines: string[];
  };
};

export default function Footer({ contact }: FooterProps) {
  const addressLines = contact?.addressLines ?? [
    "100 Jalan Sultan, #09-04 Sultan Plaza",
    "Singapore - 199001",
  ];
  const email = contact?.email ?? "info@singbd.com";
  const phone = contact?.phone ?? "+8801711594673";
  return (
    <footer className="footer">
      <div className="footer__floating-elements">
        <div className="footer__floating-element footer__floating-element--1"></div>
        <div className="footer__floating-element footer__floating-element--2"></div>
        <div className="footer__floating-element footer__floating-element--3"></div>
      </div>
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <img
              src="/images/Logo/SingBD-logo-Final.temp.webp"
              alt="SingBD Logo"
              className="footer__logo-img"
            />
            <h3 className="footer__title">SingBD</h3>
            <p className="footer__description">
              Leading manufacturer of high-quality garments and textiles, committed to
              sustainable practices and innovation.
            </p>
          </div>

          <div className="footer__section">
            <h4 className="footer__subtitle">Quick Links</h4>
            <ul className="footer__links">
              <li>
                <a href="/" className="footer__link">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="footer__link">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="footer__link">
                  About
                </a>
              </li>
              <li>
                <a href="/sustainability" className="footer__link">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="/contact" className="footer__link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__subtitle">Legal</h4>
            <ul className="footer__links">
              <li>
                <a href="/privacy-policy" className="footer__link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="footer__link">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__subtitle">Contact Info</h4>
            <div className="footer__contact">
                      <p className="footer__contact-item">
                        <strong>Email:</strong> {email}
                      </p>
                      <p className="footer__contact-item">
                        <strong>Phone:</strong> {phone}
                      </p>
                      <p className="footer__contact-item">
                        <strong>Address:</strong>{" "}
                        {addressLines.map((line, index) => (
                          <span key={`${line}-${index}`}>
                            {line}
                            {index < addressLines.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} SingBD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
