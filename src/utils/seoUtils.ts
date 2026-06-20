/**
 * SEO utility functions to generate JSON-LD schema definitions 
 * for search indexing and rich snippets.
 */

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  "name": string;
  "url": string;
  "logo": string;
  "description": string;
  "contactPoint": {
    "@type": "ContactPoint";
    "telephone": string;
    "contactType": string;
    "areaServed": string;
    "availableLanguage": string[];
  };
  "sameAs"?: string[];
}

export interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  "itemListElement": Array<{
    "@type": "ListItem";
    "position": number;
    "name": string;
    "item": string;
  }>;
}

/**
 * Generates the organization/business identity rich snippet metadata.
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Hasanth Engineering (OPC) Private Limited",
    "url": "https://www.hasanthengineering.co.in",
    "logo": "https://www.hasanthengineering.co.in/logo.png",
    "description": "Innovative multi-disciplinary design and engineering hub executing aerospace autopilot controllers, SolidWorks mechanics CAD, multilayer PCB trace layouts, and AromaCode scent transmitters in Hyderabad.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8328903031",
      "contactType": "technical support and sales division",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi", "Telugu"]
    },
    "sameAs": [
      "https://www.tofler.com.to/hasanth-engineering-opc-private-limited",
      "https://www.indiamart.com/hasanth-engineering"
    ]
  };
}

/**
 * Builds a dynamic breadcrumb hierarchy path based on the user's active sub-page view state.
 */
export function generateBreadcrumbSchema(activePage: string): BreadcrumbSchema {
  const baseElement = {
    "@type": "ListItem" as const,
    "position": 1,
    "name": "Home Core",
    "item": "https://www.hasanthengineering.co.in/#home"
  };

  const breadcrumbsList: BreadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [baseElement]
  };

  if (!activePage || activePage === 'home') {
    return breadcrumbsList;
  }

  // Map view IDs to public human-facing page descriptors for Google Search Bots
  const pageLabelMap: Record<string, string> = {
    about: "Our Corporate Identity & Engineering Lab",
    services: "Precision Systems Divisions & Solutions",
    research: "R&D Advanced Science UAV Olfactory Lab",
    projects: "Deployed Aerospace and Automation Projects",
    industries: "Sectors and Military-grade Service Industries",
    careers: "Open Tech Careers & Intern Recruitment Platform",
    blog: "Hasanth Technical Insights Journal Papers",
    contact: "Interact and Coordinate With Hyderabad Desk"
  };

  const pagePath = `https://www.hasanthengineering.co.in/#${activePage}`;
  const pageName = pageLabelMap[activePage] || (activePage.charAt(0).toUpperCase() + activePage.slice(1));

  breadcrumbsList.itemListElement.push({
    "@type": "ListItem" as const,
    "position": 2,
    "name": pageName,
    "item": pagePath
  });

  return breadcrumbsList;
}

export interface SiteNavigationSchema {
  "@context": "https://schema.org";
  "@type": "ItemList";
  "itemListElement": Array<{
    "@type": "SiteNavigationElement";
    "position": number;
    "name": string;
    "url": string;
  }>;
}

/**
 * Compiles Google Sitelinks SiteNavigationElement list definitions
 */
export function generateSiteNavigationSchema(): SiteNavigationSchema {
  const navItems = [
    { name: "Home", page: "home" },
    { name: "About Us", page: "about" },
    { name: "Services", page: "services" },
    { name: "R&D Research Labs", page: "research" },
    { name: "Systems Projects", page: "projects" },
    { name: "Industries Served", page: "industries" },
    { name: "Careers Recruitment", page: "careers" },
    { name: "Engineering Journal", page: "blog" },
    { name: "Contact Coordinates", page: "contact" }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": navItems.map((item, idx) => ({
      "@type": "SiteNavigationElement" as const,
      "position": idx + 1,
      "name": item.name,
      "url": `https://www.hasanthengineering.co.in/#${item.page}`
    }))
  };
}

/**
 * Dynamically computes the custom canonical URL for all sub-pages 
 * based on the current app sub-page routing paths to prevent duplicate content indexing.
 */
export function getCanonicalUrl(currentPage: string): string {
  const baseUrl = 'https://www.hasanthengineering.co.in';
  if (!currentPage || currentPage === 'home') {
    return `${baseUrl}/`;
  }
  const cleanPage = currentPage.trim().toLowerCase().replace(/^#+/, '');
  return `${baseUrl}/#${cleanPage}`;
}
