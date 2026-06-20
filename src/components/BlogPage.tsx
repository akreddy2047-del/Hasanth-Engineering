import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, ArrowLeft } from 'lucide-react';
import SEO from './SEO';
import { InteractiveCard } from './InteractiveCard';
import { ScrollEntrance, StaggerContainer, StaggerItem } from './ScrollEntrance';

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const posts = [
    {
      title: 'Optimal Thermal Vias Placement for High-Density Multilayer PCBs',
      date: 'June 12, 2026',
      author: 'Systems Architect Desk',
      excerpt: 'How to correctly position copper thermal relief barrels under heavy power FETs to prevent thermal throttling without compromising high-speed SPI signaling path.',
      category: 'Electronics Engineering',
      bgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      content: `In dense multilayer PCB layouts, modern surface-mount power transistors and FETs generate extensive localised heat. Standard conduction cooling is insufficient. 
To preserve standard performance without throttling, engineers rely on Thermal Vias placement directly underneath the thermal pad of the power ic. 
Here is our recommended, certified design workflow:
1. Grid Sizing: Use 0.3mm drill holes with a pitch spacing of 1.0mm.
2. Copper Barrel Plating: Ensure at least 25μm (1 mil) copper plating in the barrel walls to optimize vertical heat transfer.
3. Solder Mask: Cover vias with solder mask or plug them to prevent solder from wicking away from the thermal pad into the inner layers.
4. Plane Connectors: Link to massive solid copper reference planes on the inner layers (specifically Ground planes).

By applying this structured flow, thermal resistance drop (Θja) can decrease by up to 45%, protecting embedded hardware layers from intense heat.`
    },
    {
      title: 'PID Parameters Calibration Loops for High-Stability UAV Systems',
      date: 'May 28, 2026',
      author: 'UAV Autopilot Team',
      excerpt: 'A practical, bench-calibrated guide to tuning Proportional, Integral, and Derivative loops on drone custom airframes for heavy payloads.',
      category: 'UAV & Aerospace',
      bgUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
      content: `Tuning heavy drone platforms carrying high-spec surveillance camera gimbals requires cautious calibration of primary flight logs. Standard auto-tuning algorithms often overshoot when managing dynamic, off-axis loads.
We recommend a systematic three-stage manual tuning procedure:
- Rate Proportional (P): Increase the P gain incrementally until high-frequency oscillations appear along the roll axis. Then, reduce the value by 15-20% to establish a baseline.
- Rate Derivative (D): Increase the D gain to counter rotational inertia and filter out the remaining roll oscillations. Keep D minimal to avoid heating up ESC motors.
- Rate Integral (I): Increase I until the UAV perfectly maintains altitude coordinates under heavy diagonal winds.

This manual feedback cascade ensures the autopilot behaves predictably in high-vibration defense scenarios.`
    },
    {
      title: 'MEMS Micro-Valves and Gating for Digital AromaCode Scent Technology',
      date: 'May 05, 2026',
      author: 'Research & Innovation Desk',
      excerpt: 'An inside look at how our AromaCode scent technology translates binary logic into fine, real-time physical scent diffusion.',
      category: 'Research & Innovation',
      bgUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
      content: `AromaCode bridges digital processing with delicate organic molecular release. Standard electronic vaporizers trigger slow, uncontrolled heat resulting in molecular decay and slow startup delays.
To bypass this limitation, Hasanth R&D engineered custom silicon Micro-Electro-Mechanical System (MEMS) microvalves.
When microvolts pulse across our structured piezoceramic gates, the valve plates fold by sub-micron distances within 150 milliseconds. 
This ultra-fast feedback permits accurate dispensation of micro-dose aroma liquids, delivering rich layered scent profiles without heat degradation.`
    },
    {
      title: 'Structural CAD Optimization for AS9100 Aerospace Brackets',
      date: 'April 14, 2026',
      author: 'Mechanical Division',
      excerpt: 'Utilizing finite-element shear analysis to reduce aerospace brackets weight while guaranteeing safety margins.',
      category: 'Mechanical Engineering',
      bgUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      content: `Aircraft structures dictate strict lightweight targets. Yet, safety remains non-negotiable. 
By compiling linear FEA stress models into parametric CAD assemblies, we pinpoint low-shear density regions.
These low-shear zones are subsequently hollowed to reduce overall weight. 
By optimizing the model using multi-axis pocket milling instead of generic brackets, weight reduces by up to 32% while keeping safety stress margins above 2.5.`
    }
  ];

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Hasanth Engineering Insights",
    "description": "Technical papers, thermal reports, UAV firmware calibration logs, and innovative aerospace CAD design parameters.",
    "publisher": {
      "@type": "Organization",
      "name": "Hasanth Engineering (OPC) Private Limited",
      "logo": "https://www.hasanthengineering.co.in/logo.png"
    },
    "blogPost": posts.map(p => ({
      "@type": "BlogPosting",
      "headline": p.title,
      "datePublished": p.date,
      "author": {
        "@type": "Person",
        "name": p.author
      },
      "description": p.excerpt
    }))
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 pb-24 font-sans">
      <SEO 
        title={selectedPost !== null ? `${posts[selectedPost].title}` : "Engineering Journal & Tech Papers"}
        description="Verify our R&D updates, high density thermal vias layouts, drone autopilot PID tunings, and microfluidics scent mechanisms."
        keywords="Hasanth Blog, Thermal Vias PCB, Drone Autopilot PID, MEMS scent valves, Aerospace bracket design Hyderabad"
        schema={blogSchema}
      />
      


      {/* Blog Contents Block */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {selectedPost === null ? (
          /* Post Lists View */
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, idx) => (
              <StaggerItem key={idx}>
                <InteractiveCard
                  backgroundImageUrl={post.bgUrl}
                  className="h-full flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-[#002b5c] bg-blue-50 px-2.5 py-1 rounded">
                        {post.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">{post.date}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-sans font-black uppercase tracking-tight text-[#002b5c] group-hover:text-blue-900 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed font-semibold line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-[#002b5c] uppercase tracking-wider">
                    <span>Read technical paper</span>
                    <button 
                      onClick={() => setSelectedPost(idx)}
                      className="flex items-center gap-1.5 cursor-pointer text-[#002b5c] hover:text-blue-800"
                    >
                      <span>More</span>
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          /* Single Detailed Post View */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-50 border-2 border-slate-100 p-8 sm:p-12 rounded-[32px] space-y-8"
          >
            <button 
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#002b5c] uppercase tracking-wider hover:underline cursor-pointer animate-fade-in"
            >
              <ArrowLeft size={13} />
              <span>Back to Journal index</span>
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="text-[#002b5c] font-bold bg-blue-50 px-2.5 py-1 rounded">
                  {posts[selectedPost].category}
                </span>
                <span>•</span>
                <span>{posts[selectedPost].date}</span>
                <span>•</span>
                <span>By {posts[selectedPost].author}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-sans font-black uppercase text-[#002b5c] tracking-tight leading-tight">
                {posts[selectedPost].title}
              </h3>
            </div>

            <div className="border-t border-slate-200 pt-8 text-neutral-700 text-sm sm:text-base leading-relaxed space-y-6 font-sans whitespace-pre-line">
              {posts[selectedPost].content}
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl p-4 text-[11px] font-mono text-slate-400 leading-relaxed">
              Disclaimer: The engineering briefs published represent standard lab tests compiled inside the Hasanth Hyderabad laboratory. For project-specific hardware inquiries, kindly request a system consultation.
            </div>
          </motion.div>
        )}
      </section>

    </div>
  );
}

