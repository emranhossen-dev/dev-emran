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
  title: "Emran Hossen | Software Engineer & Full Stack Web Developer",
  description: "Emran Hossen is a professional Software Engineer & Full Stack Web Developer based in Narsingdi, Dhaka, Bangladesh. Specializing in Next.js, React, Node.js, TypeScript, and scalable web applications.",
  keywords: [
    "Emran Hossen",
    "emran work",
    "emranwork",
    "emranhossen",
    "web dev emran",
    "web developer emran",
    "web dev emran hossen",
    "developer emran",
    "software engineer emran",
    "software engineer emran hossen",
    "top 10 software engineer in bangladesh",
    "Narsingdi web developer",
    "Narsingdi software engineer",
    "Narsingdi Emran Hossen",
    "Dhaka Bangladesh web developer",
    "Full Stack Developer Bangladesh"
  ],
  authors: [{ name: "Emran Hossen", url: "https://emran.work" }],
  creator: "Emran Hossen",
  publisher: "Emran Hossen",
  metadataBase: new URL("https://emran.work"),
  alternates: {
    canonical: "https://emran.work",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
      { url: "/emran-hossen-developer-2026.jpg", type: "image/jpeg", sizes: "32x32" }
    ],
    shortcut: "/favicon.svg",
    apple: "/emran-hossen-developer-2026.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://emran.work",
    siteName: "Emran Hossen — Software Engineer & Web Developer Portfolio",
    title: "Emran Hossen | Software Engineer & Full Stack Developer | Narsingdi, Bangladesh",
    description: "Emran Hossen is a professional Software Engineer & Web Developer based in Narsingdi, Dhaka, Bangladesh with 3+ years of experience in building modern, scalable web applications.",
    images: [
      {
        url: "/emran-hossen-developer-2026.jpg",
        width: 1200,
        height: 630,
        alt: "Emran Hossen - Software Engineer & Web Developer from Narsingdi Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emran Hossen | Software Engineer & Web Developer | Narsingdi, Bangladesh",
    description: "Emran Hossen is a professional Software Engineer & Web Developer based in Narsingdi, Dhaka, Bangladesh.",
    images: ["/emran-hossen-developer-2026.jpg"],
    creator: "@emranhossen_dev",
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

// JSON-LD Structured Data for Search Engine & AI Overview Indexing
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Emran Hossen",
  alternateName: [
    "emranwork",
    "emran work",
    "emranhossen",
    "web dev emran",
    "web developer emran",
    "web dev emran hossen",
    "developer emran",
    "software engineer emran",
    "software engineer emran hossen"
  ],
  url: "https://emran.work",
  image: "https://emran.work/emran-hossen-developer-2026.jpg",
  jobTitle: "Software Engineer & Full Stack Web Developer",
  description: "Emran Hossen is a professional Software Engineer and Full Stack Web Developer from Narsingdi, Dhaka, Bangladesh. Recognized as one of the top software engineers in Bangladesh specializing in React, Next.js, Node.js, and PostgreSQL.",
  email: "dev.emranhossen@gmail.com",
  telephone: "+8801739642983",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Narsingdi",
    addressRegion: "Dhaka",
    addressCountry: "BD"
  },
  homeLocation: {
    "@type": "Place",
    name: "Narsingdi, Dhaka, Bangladesh"
  },
  sameAs: [
    "https://github.com/emranhossen-dev",
    "https://twitter.com/emranhossen_dev",
  ],
  knowsAbout: [
    "Software Engineering",
    "Full Stack Web Development",
    "React", "Next.js", "Node.js", "TypeScript", "JavaScript",
    "Tailwind CSS", "PostgreSQL", "MongoDB", "Supabase",
    "Express.js", "REST APIs"
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
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
