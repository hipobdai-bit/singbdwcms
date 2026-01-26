import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getSiteSettings, type SiteSettings } from "@/lib/firestore";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://singbd.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SingBD - Quality Garments & Textiles",
    template: "%s - SingBD",
  },
  description:
    "SingBD - Leading manufacturer of high-quality garments and textiles. Connect with global brands and premium manufacturers worldwide for apparel sourcing solutions.",
  keywords: [
    "garments",
    "textiles",
    "manufacturing",
    "Bangladesh",
    "sustainable fashion",
    "apparel sourcing",
    "knitwear",
    "woven garments",
    "outerwear",
    "functional apparel",
    "homeware",
    "accessories",
    "handicrafts",
  ],
  openGraph: {
    title: "SingBD - Quality Garments & Textiles",
    description:
      "Leading manufacturer of high-quality garments and textiles. Connect with global brands and premium manufacturers worldwide.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: "/images/Logo/SingBD-logo-Final.temp.webp",
        width: 1200,
        height: 630,
        alt: "SingBD Logo",
      },
    ],
    siteName: "SingBD",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SingBD - Quality Garments & Textiles",
    description:
      "Leading manufacturer of high-quality garments and textiles. Connect with global brands and premium manufacturers worldwide.",
    images: ["/images/Logo/SingBD-logo-Final.temp.webp"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: [{ url: "/images/Logo/SingBD-logo-Final.webp", sizes: "180x180" }],
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings: SiteSettings;
  try {
    settings = await getSiteSettings();
  } catch (error) {
    // Log explicit error for Vercel debugging
    console.error("CRITICAL: Failed to fetch site settings in RootLayout.", error);
    if (error instanceof Error) {
        console.error("Error Message:", error.message);
        console.error("Stack:", error.stack);
    }
    settings = {
      email: "info@singbd.com",
      phone: "+8801711594673",
      addressLines: ["Dhaka, Bangladesh"],
    };
  }

  const addressLines = settings.addressLines ?? [];
  const addressText = addressLines.join(", ");
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SingBD",
    url: siteUrl,
    logo: `${siteUrl}/images/Logo/SingBD-logo-Final.temp.webp`,
    description:
      "Leading manufacturer of high-quality garments and textiles. Connect with global brands and premium manufacturers worldwide for apparel sourcing solutions.",
    foundingDate: "2014",
    address: {
      "@type": "PostalAddress",
      streetAddress: "100 Jln Sultan",
      addressLocality: "Singapore",
      postalCode: "199001",
      addressCountry: "SG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: settings.phone,
      contactType: "customer service",
      email: settings.email,
    },
    sameAs: [
      "https://www.linkedin.com/company/singbd",
      "https://www.facebook.com/singbd",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SingBD",
    image: `${siteUrl}/images/Logo/SingBD-logo-Final.temp.webp`,
    description:
      "Leading manufacturer of high-quality garments and textiles, committed to sustainable practices and innovation.",
    url: siteUrl,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: addressText || "9th Floor, ANZ Huq Eleven Square, Plot #01, Road #11, Block #H",
      addressLocality: "Banani",
      addressRegion: "Dhaka",
      postalCode: "1213",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.8,
      longitude: 90.4,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$",
    servesCuisine: "Apparel Manufacturing",
    areaServed: "Worldwide",
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer contact={settings} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        <Script src="https://d3js.org/d3.v7.min.js" strategy="afterInteractive" />
        <Script src="https://unpkg.com/topojson-client@3" strategy="afterInteractive" />
        <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" strategy="afterInteractive" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX', {
  page_title: document.title,
  page_location: window.location.href
});`}
        </Script>
        <Script src="/js/main.js" strategy="afterInteractive" />
        <Script src="/js/chat-widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
