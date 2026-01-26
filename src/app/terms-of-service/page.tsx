import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "SingBD Terms of Service - Read our terms and conditions for using our apparel sourcing services. Understand your rights and obligations when working with SingBD.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "SingBD terms",
    "service agreement",
    "user agreement",
    "legal terms",
  ],
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfServicePage() {
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
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14,2 14,8 20,8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10,9 9,9 8,9"/>
                    </svg>
                </div>
                <h1 class="legal-hero__title">Terms of Service</h1>
                <p class="legal-hero__subtitle">The terms and conditions for using our website and services</p>
                <div class="legal-hero__meta">
                    <span class="legal-hero__date">Last updated: ${lastUpdated}</span>
                </div>
            </div>
        </div>
    </section>

    <section class="legal-overview">
        <div class="legal-overview__container">
            <div class="legal-overview__content" data-aos="fade-up" data-aos-delay="200">
                <h2 class="legal-overview__title">Key Terms</h2>
                <div class="legal-overview__grid">
                    <div class="legal-overview__card" data-aos="zoom-in" data-aos-delay="300">
                        <div class="legal-overview__card-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 12l2 2 4-4"/>
                                <circle cx="12" cy="12" r="9"/>
                            </svg>
                        </div>
                        <h3 class="legal-overview__card-title">Acceptance Required</h3>
                        <p class="legal-overview__card-text">By using our website, you agree to these terms</p>
                    </div>

                    <div class="legal-overview__card" data-aos="zoom-in" data-aos-delay="400">
                        <div class="legal-overview__card-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </div>
                        <h3 class="legal-overview__card-title">Fair Use Policy</h3>
                        <p class="legal-overview__card-text">Respectful and lawful use of our services</p>
                    </div>

                    <div class="legal-overview__card" data-aos="zoom-in" data-aos-delay="500">
                        <div class="legal-overview__card-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                        </div>
                        <h3 class="legal-overview__card-title">Intellectual Property</h3>
                        <p class="legal-overview__card-text">Protection of our content and materials</p>
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
                                <path d="M9 12l2 2 4-4"/>
                                <circle cx="12" cy="12" r="9"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">1. Acceptance of Terms</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>By accessing and using the SingBD website (hereinafter "the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="200">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <circle cx="12" cy="16" r="1"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">2. Use License</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>Permission is granted to temporarily download one copy of the materials on SingBD's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>

                        <h3 style="margin: 2rem 0 1rem; color: var(--heading-color);">Under this license you may not:</h3>
                        <div class="legal-list">
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M4.93 4.93l14.14 14.14"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">Modify or copy the materials for commercial purposes</div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M4.93 4.93l14.14 14.14"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">Attempt to decompile or reverse engineer any software</div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M4.93 4.93l14.14 14.14"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">Remove any copyright or proprietary notations</div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M4.93 4.93l14.14 14.14"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">Transfer materials to another person or mirror on any other server</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="300">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                                <line x1="12" y1="9" x2="12" y2="13"/>
                                <line x1="12" y1="17" x2="12.01" y2="17"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">3. Disclaimer</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>The materials on SingBD's website are provided on an 'as is' basis. SingBD makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="400">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                <path d="M9 12l2 2 4-4"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">4. Limitations</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>In no event shall SingBD or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SingBD's website, even if SingBD or a SingBD authorized representative has been notified orally or in writing of the possibility of such damage.</p>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="500">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="4" width="20" height="16" rx="2"/>
                                <path d="M7 15h0M2 4h20v16H2z"/>
                                <circle cx="17" cy="10" r="1"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">5. Accuracy of Materials</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>The materials appearing on SingBD's website could include technical, typographical, or photographic errors. SingBD does not warrant that any of the materials on its website are accurate, complete or current. SingBD may make changes to the materials contained on its website at any time without notice.</p>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="600">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">6. Links</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>SingBD has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by SingBD of the site. Use of any such linked website is at the user's own risk.</p>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="700">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">7. Modifications</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>SingBD may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.</p>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="800">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">8. User Conduct</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>When using our website, you agree to conduct yourself in a lawful and respectful manner. You may not engage in any activities that could harm our website, other users, or our business operations.</p>

                        <h3 style="margin: 2rem 0 1rem; color: var(--heading-color);">Prohibited Activities</h3>
                        <div class="legal-list">
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M4.93 4.93l14.14 14.14"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Illegal Activities:</strong> Using our website for any unlawful purposes or illegal activities
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
                                    <strong>System Interference:</strong> Attempting to disrupt, damage, or gain unauthorized access to our systems
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
                                    <strong>Spam or Abuse:</strong> Sending unsolicited communications or engaging in abusive behavior
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
                                    <strong>Malicious Content:</strong> Uploading viruses, malware, or other harmful software
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="900">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 3v18h18"/>
                                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">9. Governing Law and Jurisdiction</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>These terms and conditions are governed by and construed in accordance with the laws of Bangladesh. Any disputes arising from these terms or your use of our website will be subject to the exclusive jurisdiction of the courts in Bangladesh.</p>

                        <h3 style="margin: 2rem 0 1rem; color: var(--heading-color);">Legal Framework</h3>
                        <div class="legal-list">
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                                        <polyline points="14,2 14,8 20,8"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Applicable Law:</strong> Laws of Bangladesh govern these terms and your use of our services
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
                                    <strong>Exclusive Jurisdiction:</strong> Courts in Bangladesh have exclusive jurisdiction over disputes
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Dispute Resolution:</strong> We encourage informal resolution before formal legal proceedings
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="legal-card" data-aos="fade-up" data-aos-delay="1000">
                    <div class="legal-card__header">
                        <div class="legal-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                            </svg>
                        </div>
                        <h2 class="legal-card__title">10. Severability and Entire Agreement</h2>
                    </div>
                    <div class="legal-card__content">
                        <p>These Terms of Service constitute the entire agreement between you and SingBD regarding your use of our website and supersede all prior agreements and understandings.</p>

                        <h3 style="margin: 2rem 0 1rem; color: var(--heading-color);">Legal Provisions</h3>
                        <div class="legal-list">
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                                        <polyline points="14,2 14,8 20,8"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Entire Agreement:</strong> These terms represent the complete agreement between parties
                                </div>
                            </div>
                            <div class="legal-list__item">
                                <div class="legal-list__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                                    </svg>
                                </div>
                                <div class="legal-list__content">
                                    <strong>Severability:</strong> If any provision is invalid, the remainder of these terms remain in effect
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
                                    <strong>No Waiver:</strong> Our failure to enforce any right does not constitute a waiver of that right
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
                                    <strong>Assignment:</strong> We may assign these terms; you may not assign them without our consent
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `;

  return <main className="main" dangerouslySetInnerHTML={{ __html: content }} />;
}
