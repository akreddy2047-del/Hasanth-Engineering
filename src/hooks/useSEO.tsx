import React from 'react';
import { Helmet } from 'react-helmet-async';

export const seoDataMap: Record<string, { title: string; description: string; keywords: string }> = {
  home: {
    title: "Hasanth Engineering (OPC) Private Limited | Mechanical, Electronics & Aerospace Innovation",
    description: "Multidisciplinary systems engineering providing advanced designs in 3D CAD, high-density multilayer PCBs, drone autopilots, and SCADA automation.",
    keywords: "Hasanth Engineering, Hasanth Engineering (OPC) Private Limited, Mechanical Engineering, Electronics PCB Design, Aerospace, UAV Autopilots, Industrial Automation, Hyderabad Balanagar, India"
  },
  about: {
    title: "About Our Engineering Core | Hasanth Engineering",
    description: "Discover Hasanth Engineering's journey, multidisciplinary design labs, sub-micron tolerances, and our expert R&D team in Hyderabad.",
    keywords: "Hasanth Engineering corporate history, founders desk, Hyderabad engineering, mechanical workshops, precision labs"
  },
  services: {
    title: "Multidisciplinary Engineering Divisions | Hasanth Engineering",
    description: "Investigate our core competencies: SolidWorks CAD mechanics, 16-layer SMT assemblies, PLC ladder controls, and elite UAV drone configurations.",
    keywords: "SolidWorks CAD, SMT assembly, Solder stencil, PX4 firmware, AS9100 aerospace CAD, CNC milling precision"
  },
  research: {
    title: "UAV and AromaCode R&D Labs | Hasanth Engineering",
    description: "Review our deep innovations including olfactory AromaCode vaporizers, MEMS microvalves, carbon fiber layouts, and telemetry systems.",
    keywords: "AromaCode scent transmitter, MEMS microvalves, AS9100 aviation brackets, carbon drone frame, autonomous aerial drone"
  },
  projects: {
    title: "Industrial Systems & Aviation Projects | Hasanth Engineering",
    description: "Explore our verified deployments from high-reliability railway intercoms to continuous heavy-cycle CNC factory automation line loops.",
    keywords: "Railway intercom terminals, Modbus telemetry panels, flight calibration, AS9100 brackets, heavy automation systems"
  },
  industries: {
    title: "Sectors & Industries We Serve | Hasanth Engineering",
    description: "Hasanth Engineering designs specialized, military-rugged components for defense systems, aerospace aviation, railways, and industrial factories.",
    keywords: "Defense compliance MIL-STD, aerospace AS9100 standards, railway telecommunication, automated factory SCADA, agriculture spray drone"
  },
  careers: {
    title: "Explore Engineering Careers | Hasanth Engineering",
    description: "Build the future of hardware. Discover modern openings for SolidWorks draftsmen, embedded system firmware engineers, and CNC operators.",
    keywords: "Balanagar engineering jobs, careers Hyderabad, SolidWorks job recruitment, firmware developer job, SMD soldering vacancies"
  },
  blog: {
    title: "Engineering Journal & Insights | Hasanth Engineering",
    description: "Quarterly updates, physical-stress reports, high-speed SPI trace routing, and UAV PID flight loop tuning manual calibration guides.",
    keywords: "engineering blog, thermal via FET layout, uav rate tuning guide, micro-valves mems, FEA linear shear analysis"
  },
  contact: {
    title: "Contact Hyderabad Design Core | Hasanth Engineering",
    description: "Connect with our design office in Vivekanandanagar Colony, Kukatpally. Coordinate factory fabrication cycles or log tech support tickets.",
    keywords: "Kukatpally office contact, Balanagar design intake, email enquiry, phone coordinate, Hyderabad telangana"
  }
};

export function useSEO(currentPage: string) {
  const currentSEO = seoDataMap[currentPage] || seoDataMap.home;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
  };
}

// Structured JSON-LD Data Component for Rich Snippets Schema
export function JSONLD({ currentPage = 'home' }: { currentPage?: string }) {
  const businessBase = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Hasanth Engineering (OPC) Private Limited",
    "alternateName": "Hasanth Engineering",
    "image": "https://www.hasanthengineering.co.in/logo.png",
    "@id": "https://www.hasanthengineering.co.in/#organization",
    "url": "https://www.hasanthengineering.co.in",
    "logo": "https://www.hasanthengineering.co.in/logo.png",
    "telephone": "+91-8328903031",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "H NO 3-3-8/4, KUKATPALLY, Vivekanandanagar Colony, Balanagar",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500072",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.4644,
      "longitude": 78.4542
    },
    "description": "Multi-disciplinary engineering company in India providing advanced solutions in Mechanical Design, Electronics development, Aerospace systems, UAVs, and SCADA Automation.",
    "sameAs": [
      "https://www.tofler.com.to/hasanth-engineering-opc-private-limited",
      "https://www.indiamart.com/hasanth-engineering"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "34",
      "bestRating": "5",
      "worstRating": "1"
    },
    "knowsAbout": [
      "Mechanical CAD Design",
      "Multilayer Printed Circuit Boards",
      "UAV Drone Autonomous Telemetry",
      "AS9100 Aerospace Aviation Design",
      "CNC Machining Tolerances",
      "AromaCode MEMS Scent Technology"
    ]
  };

  const breadcrumbsList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.hasanthengineering.co.in/"
      }
    ]
  };

  let pageSchema: any = businessBase;

  if (currentPage === 'about') {
    breadcrumbsList.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "About Us",
      "item": "https://www.hasanthengineering.co.in/#about"
    });
    pageSchema = [
      businessBase,
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Hasanth Engineering",
        "description": "Information about our corporate journey, founders, multi-disciplinary design labs, and team of senior system architects in Hyderabad, India.",
        "publisher": {
          "@type": "Organization",
          "name": "Hasanth Engineering (OPC) Private Limited",
          "logo": "https://www.hasanthengineering.co.in/logo.png"
        }
      },
      breadcrumbsList
    ];
  } else if (currentPage === 'services') {
    breadcrumbsList.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Engineering Services",
      "item": "https://www.hasanthengineering.co.in/#services"
    });
    pageSchema = [
      businessBase,
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Mechanical Engineering & 3D CAD Design",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Hasanth Engineering (OPC) Private Limited"
        },
        "serviceType": "Engineering Design",
        "description": "Advanced 3D CAD stress, structural, and sheet bending design layouts compliant with global CNC/milling tolerances.",
        "offers": {
          "@type": "Offer",
          "price": "Contact for pricing",
          "priceCurrency": "INR"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Electronics & Embedded Hardware Prototyping",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Hasanth Engineering (OPC) Private Limited"
        },
        "serviceType": "Electronics Design",
        "description": "Dense multi-layer printed circuit boards (PCBs), signal integrity, embedded C code optimization, and SMD prototyping.",
        "offers": {
          "@type": "Offer",
          "price": "Contact for pricing",
          "priceCurrency": "INR"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Aerospace & Drone Auto-pilots",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Hasanth Engineering (OPC) Private Limited"
        },
        "serviceType": "Aerospace Design",
        "description": "UAV custom UAV frames, flight control calibration, AS9100 aviation brackets, and sensor fusion setups.",
        "offers": {
          "@type": "Offer",
          "price": "Contact for pricing",
          "priceCurrency": "INR"
        }
      },
      breadcrumbsList
    ];
  } else if (currentPage === 'research') {
    breadcrumbsList.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Research & Development",
      "item": "https://www.hasanthengineering.co.in/#research"
    });
    pageSchema = [
      businessBase,
      {
        "@context": "https://schema.org",
        "@type": "ResearchProject",
        "name": "AromaCode Olfactory Scent Synthesis & MEMS",
        "description": "Groundbreaking research on scent transmitters, Micro Electro-Mechanical Systems (MEMS), microvalves, and programmable aroma vaporizers.",
        "sponsor": {
          "@type": "Organization",
          "name": "Hasanth Engineering (OPC) Private Limited"
        }
      },
      breadcrumbsList
    ];
  } else if (currentPage === 'projects') {
    breadcrumbsList.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Projects Showcase",
      "item": "https://www.hasanthengineering.co.in/#projects"
    });
    pageSchema = [
      businessBase,
      breadcrumbsList
    ];
  } else {
    pageSchema = [
      businessBase,
      breadcrumbsList
    ];
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(pageSchema)}
      </script>
    </Helmet>
  );
}
