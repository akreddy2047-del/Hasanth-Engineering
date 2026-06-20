import React from 'react';
import { Helmet } from 'react-helmet-async';

export const seoDataMap: Record<string, { title: string; description: string; keywords: string }> = {
  home: {
    title: "Hasanth Engineering | Mechanical, Electronics & Aerospace Innovation",
    description: "Multidisciplinary systems engineering providing advanced designs in 3D CAD, high-density multilayer PCBs, drone autopilots, and SCADA automation.",
    keywords: "Mechanical Engineering, Electronics PCB Design, Aerospace, UAV Autopilots, Industrial Automation, Hyderabad Balanagar, India"
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
export function JSONLD() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "provider": {
      "@type": "Corporation",
      "name": "Hasanth Engineering (OPC) Private Limited",
      "alternateName": "Hasanth Engineering",
      "description": "Multi-disciplinary engineering providing advanced solutions in Mechanical Design, Electronics development, Aerospace systems, UAVs, and intelligent smart Automation.",
      "url": "https://www.hasanthengineering.co.in",
      "logo": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "H NO 3-3-8/4, KUKATPALLY, Vivekanandanagar Colony, Balanagar",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500072",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-8328903031",
        "contactType": "technical support",
        "areaServed": "IN",
        "availableLanguage": ["en", "telugu", "hindi"]
      },
      "knowsAbout": [
        "Mechanical CAD Design",
        "Multilayer Printed Circuit Boards",
        "UAV Drone Autonomous Telemetry",
        "AS9100 Aerospace Aviation Design",
        "CNC Machining Tolerances",
        "AromaCode MEMS Scent Technology"
      ]
    },
    "serviceType": "Advanced Multi-disciplinary Design and Prototyping Systems",
    "areaServed": {
       "@type": "Country",
       "name": "India"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
