import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, Cpu, HelpCircle, Laptop, Database, PenTool, CheckCircle2, Loader2 } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import SEO from './SEO';
import { InteractiveCard } from './InteractiveCard';
import { ScrollEntrance, StaggerContainer, StaggerItem } from './ScrollEntrance';

import { usePageContent } from '../lib/usePageContent';
import { DynamicContent } from './DynamicContent';

export default function ProjectsPage() {
  const { data: pageData } = usePageContent('projects');
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Aerospace Systems',
    'Defense Tech',
    'Mechanical CAD',
    'Embedded PCBs',
    'Automation PLCs'
  ];

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Hasanth Engineering Projects Portfolio",
    "description": "Selected blueprints and corporate project archives calibrated in our R&D wing at Balanagar, Hyderabad.",
    "itemListElement": projects.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": p.title,
        "description": p.description,
        "image": p.imageUrl,
        "category": p.category,
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 pb-24 font-sans">
      <SEO 
        title="Corporate Project Blueprint Archives"
        description="Verify advanced multi-disciplinary mechanical, aerospace, and defense blueprints calibrated at our Hyderabad design core."
        keywords="Hasanth Projects, Mechanical CAD, Aerospace Brackets, Embedded PCBs, SCADA Automation"
        schema={projectsSchema}
      />
      
      {/* Dynamic Content from CMS */}
      <DynamicContent sections={pageData?.sections} content={pageData?.content} />

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        

        {/* Divider and Category Filter controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-100">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest block">
            Filter parametric archives
          </span>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-sans tracking-wide uppercase font-black transition-all cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-[#002b5c] text-white shadow-md' 
                    : 'bg-white border-2 border-slate-100 text-[#002b5c] hover:bg-slate-50'
                }`}
                id={`projects-filter-btn-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="animate-spin text-[#002b5c]" size={48} />
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest font-black">Syncing Blueprint Archives...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-slate-100 rounded-3xl">
             <p className="text-sm font-bold text-slate-400">No project nodes found in this sector.</p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p, idx) => (
              <StaggerItem key={p.id || p.title}>
                <InteractiveCard
                  backgroundImageUrl={p.imageUrl}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Image */}
                    <div className="h-48 w-full overflow-hidden border-b border-slate-100 relative bg-slate-50 rounded-t-2xl">
                      <img 
                        src={p.imageUrl} 
                        alt={p.title} 
                        loading="lazy"
                        className="w-full h-full object-cover filter saturate-50 brightness-95 group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      
                      <div className="absolute top-4 right-4 text-[9px] font-sans font-bold text-white bg-[#002b5c] px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {p.category}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-base sm:text-lg font-sans font-black text-[#002b5c] uppercase tracking-tight leading-tight group-hover:text-blue-900 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  {/* Specifications Footer */}
                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-1.5">
                      {p.specs?.map((spec: string, specId: number) => (
                        <div 
                          key={specId} 
                          className="text-[9px] font-sans font-black text-[#002b5c] bg-blue-50/50 border border-blue-100 rounded-lg p-1.5 text-center truncate"
                          title={spec}
                        >
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>

                </InteractiveCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

      </section>

    </div>
  );
}

