import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "SingBD Privacy Policy - Learn how we collect, use, and protect your personal information. We are committed to transparency and data protection in accordance with international standards.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal information",
    "SingBD privacy",
    "GDPR compliance",
    "data security",
    "information collection",
  ],
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const content = `
    <section class="legal-hero">
        <div class="legal-hero__container">
            <div class="legal-hero__content" data-aos="fade-up">
                <div class="legal-hero__icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <circle cx="12" cy="16" r="1"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                </div>
                <h1 class="legal-hero__title">Privacy Policy</h1>
                <p class="legal-hero__subtitle">How we protect and handle your personal information</p>
                <div class="legal-hero__meta">
                    <span class="legal-hero__date">Last updated: ${lastUpdated}</span>
                </div>
            </div>
        </div>
    </section>

    <section class="legal-overview">
        <div class="legal-overview__container">
            <div class="legal-overview__content" data-aos="fade-up" data-aos-delay="200">
                <h2 class="legal-overview__title">Our Privacy Commitments</h2>
                <div class="legal-overview__grid">
                    <div class="legal-overview__card" data-aos="zoom-in" data-aos-delay="300">
                        <div class="legal-overview__card-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <circle cx="12" cy="16" r="1"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        <h3 class="legal-overview__card-title">Data Protection</h3>
                        <p class="legal-overview__card-text">We implement strong security measures to protect your data</p>
                    </div>

                    <div class="legal-overview__card" data-aos="zoom-in" data-aos-delay="400">
                        <div class="legal-overview__card-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </div>
                        <h3 class="legal-overview__card-title">Limited Collection</h3>
                        <p class="legal-overview__card-text">We only collect data necessary for our services</p>
                    </div>

                    <div class="legal-overview__card" data-aos="zoom-in" data-aos-delay="500">
                        <div class="legal-overview__card-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </div>
                        <h3 class="legal-overview__card-title">Transparency</h3>
                        <p class="legal-overview__card-text">Clear information about how we use your data</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="legal-content">
        <div class="legal-content__container">
            <div class="legal-content__grid">
                <div class="legal-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 6v6l4 2"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">1. Introduction</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>SingBD ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="200">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">2. Information We Collect</h2>
                    </div>
                    <div class="legal-card__content">
                        <h3 style="margin-bottom: 1rem; color: var(--heading-color);">Personal Information</h3>
                        <p>We may collect personal information that you voluntarily provide when you:</p>
                        <div class="legal-list">
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                                        <polyline points="14,2 14,8 20,8"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">Fill out contact forms or request information about our services</div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">Subscribe to our newsletter or communications</div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                        <line x1="8" y1="21" x2="16" y2="21"/>
                                        <line x1="12" y1="17" x2="12" y2="21"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">Engage with our website or apply for employment</div>
                            </div>
                        </div>

                        <h3 style="margin: 2rem 0 1rem; color: var(--heading-color);">Automatically Collected Information</h3>
                        <p>When you visit our website, we automatically collect certain information about your device and usage:</p>
                        <div class="legal-list">
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="2" y1="12" x2="6" y2="12"/>
                                        <line x1="18" y1="12" x2="22" y2="12"/>
                                        <line x1="12" y1="2" x2="12" y2="6"/>
                                        <line x1="12" y1="18" x2="12" y2="22"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">IP address, browser type, operating system, and device information</div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 3v18h18"/>
                                        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">Pages visited, time spent, and referring website information</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="300">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">3. How We Use Your Information</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>We use the information we collect to:</p>
                        <div class="legal-list">
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Service Provision:</strong> Provide and maintain our services and respond to your inquiries
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Communications:</strong> Send you marketing communications (with your consent)
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 3v18h18"/>
                                        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Improvement:</strong> Improve our website and services based on usage patterns
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Security:</strong> Ensure security and prevent fraud and comply with legal obligations
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="400">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">4. Information Sharing and Disclosure</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
                        <div class="legal-list">
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and providing services
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                                        <polyline points="14,2 14,8 20,8"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 3v18h18"/>
                                        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9 12l2 2 4-4"/>
                                        <circle cx="12" cy="12" r="9"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Consent:</strong> We may share information with your explicit consent for specific purposes
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="500">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                <circle cx="12" cy="11" r="3"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">5. Data Security</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.</p>

                        <h3 style="margin: 2rem 0 1rem; color: var(--heading-color);">Security Measures</h3>
                        <div class="legal-list">
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9 12l2 2 4-4"/>
                                        <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Encryption:</strong> All sensitive data is encrypted during transmission using SSL/TLS protocols
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                        <circle cx="12" cy="16" r="1"/>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Access Controls:</strong> Secure servers with restricted access controls and authentication
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Monitoring:</strong> Regular security audits, monitoring, and vulnerability assessments
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Staff Training:</strong> Regular security training and awareness programs for our staff
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="600">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">6. Cookies and Tracking Technologies</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>We use cookies and similar tracking technologies to enhance your experience on our website. These technologies help us remember your preferences, analyze website traffic, improve functionality, and provide personalized content.</p>

                        <h3 style="margin: 2rem 0 1rem; color: var(--heading-color);">How We Use Cookies</h3>
                        <div class="legal-list">
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Remember Preferences:</strong> Store your language, region, and interface customization choices
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 3v18h18"/>
                                        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Analyze Traffic:</strong> Understand how visitors use our website to improve performance
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                                        <path d="M7 15h0M2 4h20v16H2z"/>
                                        <circle cx="17" cy="10" r="1"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Improve Functionality:</strong> Enhance website features and user experience
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Personalize Content:</strong> Provide relevant and customized content based on your interests
                                </div>
                            </div>
                        </div>
                        <p style="margin-top: 1.5rem;">You can control cookie settings through your browser preferences. For more information, please see our Cookie Policy.</p>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="700">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">7. Your Rights and Choices</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>Depending on your location, you may have the following rights regarding your personal information:</p>

                        <h3 style="margin: 2rem 0 1rem; color: var(--heading-color);">Data Subject Rights</h3>
                        <div class="legal-list">
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Access:</strong> Request access to your personal information and understand how we process it
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                        <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Correction:</strong> Request correction of inaccurate or incomplete information
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 6h18"/>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Deletion:</strong> Request deletion of your personal information in certain circumstances
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                        <polyline points="14,2 14,8 20,8"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Portability:</strong> Request a copy of your data in a structured, portable format
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M4.93 4.93l14.14 14.14"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Objection:</strong> Object to processing of your personal information for marketing purposes
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="9" y1="9" x2="15" y2="15"/>
                                        <line x1="15" y1="9" x2="9" y2="15"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Withdrawal:</strong> Withdraw consent for marketing communications at any time
                                </div>
                            </div>
                        </div>
                        <p style="margin-top: 1.5rem;">To exercise any of these rights, please contact us at privacy@singbd.com. We will respond to your request within one month.</p>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="800">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="2" y1="12" x2="22" y2="12"/>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">8. International Data Transfers</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.</p>

                        <h3 style="margin: 2rem 0 1rem; color: var(--heading-color);">Transfer Safeguards</h3>
                        <div class="legal-list">
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9 12l2 2 4-4"/>
                                        <circle cx="12" cy="12" r="9"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Adequacy Decisions:</strong> Transfers to countries with adequate protection as determined by relevant authorities
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                                        <polyline points="14,2 14,8 20,8"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Standard Clauses:</strong> Use of standard contractual clauses approved by data protection authorities
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                        <circle cx="12" cy="16" r="1"/>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Technical Safeguards:</strong> Implementation of appropriate technical and organizational measures
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="900">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                <circle cx="12" cy="11" r="3"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">9. Children's Privacy</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>Our website is not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you believe we have collected information from a child under 16, please contact us immediately and we will take steps to delete such information.</p>

                        <div class="legal-list">
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M4.93 4.93l14.14 14.14"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>No Targeting:</strong> We do not direct our services to children or knowingly collect their data
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 6h18"/>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Immediate Deletion:</strong> Any inadvertently collected children's data will be promptly deleted
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="1000">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">10. Changes to This Privacy Policy</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>

                        <h3 style="margin: 2rem 0 1rem; color: var(--heading-color);">How We Notify Changes</h3>
                        <div class="legal-list">
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">Update the "Last updated" date and post changes on this page</div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">Send email notifications for material changes that affect your rights</div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                                        <path d="M7 15h0M2 4h20v16H2z"/>
                                        <circle cx="17" cy="10" r="1"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">Display prominent website banners for significant policy changes</div>
                            </div>
                        </div>
                        <p style="margin-top: 1.5rem;">Your continued use of our website after any changes indicates acceptance of the updated Privacy Policy.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `;

  return <main className="main" dangerouslySetInnerHTML={{ __html: content }} />;
}
