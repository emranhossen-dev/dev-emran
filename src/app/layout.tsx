import type { Metadata } from "next";
import { Outfit, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emran Hossen | Full Stack Web Developer | React, Next.js, Node.js Expert",
  description: "Portfolio of Emran Hossen — a professional Full Stack Web Developer from Bangladesh specializing in React, Next.js, Node.js, Supabase, PostgreSQL, MongoDB. Building high-performance LMS platforms, e-commerce solutions, and developer tools.",
  keywords: [
    "Emran Hossen", "Emran", "Emran dev", "Emran work", "Emran Hossen Bangladesh",
    "Emran Bangladesh", "developer Emran", "Emran Hossen developer",
    "Full Stack Developer", "Web Developer", "React Developer",
    "Next.js Developer", "Node.js Developer", "MERN Stack Developer",
    "Bangladesh Developer", "Freelance Developer Bangladesh",
    "emran.work", "Luminous Centre", "IronLocker",
    "Portfolio", "Hire Developer", "Frontend Developer",
    "Backend Developer", "Supabase Developer", "PostgreSQL Developer"
  ],
  authors: [{ name: "Emran Hossen", url: "https://emran.work" }],
  creator: "Emran Hossen",
  publisher: "Emran Hossen",
  metadataBase: new URL("https://emran.work"),
  alternates: {
    canonical: "https://emran.work",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://emran.work",
    siteName: "Emran Hossen — Developer Portfolio",
    title: "Emran Hossen | Full Stack Web Developer",
    description: "Professional Full Stack Web Developer from Bangladesh. Expert in React, Next.js, Node.js, Supabase. Building LMS platforms, e-commerce, and developer tools.",
    images: [
      {
        url: "/emran_photo.jpg",
        width: 1200,
        height: 630,
        alt: "Emran Hossen - Full Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emran Hossen | Full Stack Web Developer",
    description: "Professional Full Stack Developer from Bangladesh specializing in React, Next.js, Node.js. Check out my projects and hire me.",
    images: ["/emran_photo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Emran Hossen",
  url: "https://emran.work",
  image: "https://emran.work/emran_photo.jpg",
  jobTitle: "Full Stack Web Developer",
  description: "Professional Full Stack Web Developer from Bangladesh specializing in React, Next.js, Node.js, Supabase, PostgreSQL, and MongoDB.",
  email: "emranhossen.dev@gmail.com",
  telephone: "+8801739642983",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BD",
  },
  sameAs: [
    "https://github.com/emranhossen-dev",
  ],
  knowsAbout: [
    "React", "Next.js", "Node.js", "TypeScript", "JavaScript",
    "Tailwind CSS", "PostgreSQL", "MongoDB", "Supabase",
    "Express.js", "REST APIs", "Full Stack Development"
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "University of South Asia"
  },
  worksFor: {
    "@type": "Organization",
    name: "Luminous Skill Development Training Center",
    url: "https://luminouscentre.org"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="canonical" href="https://emran.work" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
