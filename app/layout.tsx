import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const siteUrl = "https://bluedawg.app";
const siteTitle = "BlueDawg | Your Autonomous AI Workforce";
const siteDescription =
  "Deploy an autonomous AI workforce that operates your business 24/7. Customer support, content, sales, and operations, all handled by AI agents that never sleep.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: "BlueDawg",
  keywords: [
    "AI workforce",
    "autonomous AI agents",
    "business automation",
    "AI operations",
    "AI customer support",
    "BlueDawg",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "BlueDawg",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BlueDawg autonomous AI workforce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
    creator: "@bluedawgapp",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "BlueDawg",
      url: siteUrl,
      email: "hello@bluedawg.app",
      description: siteDescription,
      slogan: "Every business deserves a best friend. Yours just learned to code.",
      areaServed: "US",
      foundingLocation: "Detroit, MI",
      sameAs: ["https://bluedawg.app"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "BlueDawg",
      description: siteDescription,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      serviceType: "Autonomous AI Workforce Deployment",
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: "US",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Businesses and creators",
      },
      description:
        "BlueDawg audits business operations, designs a multi-agent architecture, and deploys autonomous AI workers for sales, support, content, and operations.",
      offers: [
        {
          "@type": "Offer",
          name: "BlueDawg Box",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: 2000,
            maxPrice: 3000,
            priceCurrency: "USD",
            billingDuration: "P1M",
          },
        },
        {
          "@type": "Offer",
          name: "BlueDawg Cloud",
          priceCurrency: "USD",
          description: "Custom enterprise pricing",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What if AI makes mistakes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BlueDawg's parent AI monitors every agent interaction. Errors are caught, corrected, and learned from in real-time. For high-stakes decisions, you set the guardrails. Agents escalate to humans when you want them to.",
          },
        },
        {
          "@type": "Question",
          name: "We already use ChatGPT / other AI tools.",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Those are tools. Someone on your team still has to prompt them, review the output, and do something with it. BlueDawg is a workforce that prompts itself, reviews itself, and acts on its own.",
          },
        },
        {
          "@type": "Question",
          name: "Is our data safe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your data never trains public models. Enterprise-grade encryption, SOC 2 compliant infrastructure, and role-based access are used to protect your systems and information.",
          },
        },
        {
          "@type": "Question",
          name: "How long until we see results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most clients see their first autonomous workflows running within 2 weeks of deployment. Measurable ROI typically appears within 60-90 days.",
          },
        },
        {
          "@type": "Question",
          name: "What if we outgrow it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BlueDawg scales with you by deploying more agents for new departments, locations, and workflows as your business grows.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className} ${spaceGrotesk.className}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
