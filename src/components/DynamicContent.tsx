import React from 'react';
import { motion } from 'motion/react';
import { ScrollEntrance } from './ScrollEntrance';

interface Section {
  heading: string;
  body: string;
  imageUrl?: string;
}

interface DynamicContentProps {
  sections?: Section[];
  content?: string;
}

export const DynamicContent: React.FC<DynamicContentProps> = ({ sections, content }) => {
  if ((!sections || sections.length === 0) && !content) return null;

  return (
    <div className="space-y-16">
      {content && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium text-center whitespace-pre-wrap italic">
            {content}
          </p>
        </div>
      )}

      {sections && sections.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-16">
          {sections.map((section, idx) => (
            <ScrollEntrance key={idx}>
              <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                <div className="lg:w-1/2 space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-sans font-black text-[#002b5c] uppercase tracking-tight leading-tight">
                    {section.heading}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold whitespace-pre-wrap">
                    {section.body}
                  </p>
                </div>
                {section.imageUrl && (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="lg:w-1/2 rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 relative aspect-[16/10]"
                  >
                    <img 
                      src={section.imageUrl} 
                      alt={section.heading} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </motion.div>
                )}
              </div>
            </ScrollEntrance>
          ))}
        </div>
      )}
    </div>
  );
};
