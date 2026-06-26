import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  schema?: any; // JSON-LD schema
  ogImage?: string;
  ogType?: string;
}

export default function SEO({ title, description, keywords, canonical, schema, ogImage, ogType = 'website' }: SEOProps) {
  const fullTitle = title.includes('Hasanth Engineering') ? title : `${title} | Hasanth Engineering`;
  const imageToUse = ogImage || 'https://www.hasanthengineering.co.in/logo.png';
  const siteUrl = 'https://www.hasanthengineering.co.in';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const fullCanonical = canonical || `${siteUrl}${currentPath}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonical} />

      {/* OpenGraph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={imageToUse} />
      <meta property="og:site_name" content="Hasanth Engineering" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageToUse} />

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

