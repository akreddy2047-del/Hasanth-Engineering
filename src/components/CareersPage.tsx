import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, Briefcase, MapPin, Clock, ArrowRight, 
  Award
} from 'lucide-react';
import SEO from './SEO';
import { InteractiveCard } from './InteractiveCard';
import { ScrollEntrance, StaggerContainer, StaggerItem } from './ScrollEntrance';
import { useToast } from '../hooks/useToast';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CareersPage() {
  const [copied, setCopied] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const querySnapshot = await getDocs(collection(db, 'jobs'));
      setJobs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchJobs();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hasanthengg@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const careersSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Careers at Hasanth Engineering",
    "id": "https://www.hasanthengineering.co.in/#careers-about",
    "description": "Explore full-time positions and internships at Hasanth Engineering R&D Hub in Balanagar, Hyderabad.",
    "publisher": {
      "@type": "Organization",
      "name": "Hasanth Engineering (OPC) Private Limited",
      "logo": "https://www.hasanthengineering.co.in/logo.png"
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 pb-24 font-sans">
      <SEO 
        title="Careers & Engineering Opportunities"
        description="Explore open professional roles and internships in mechanical CAD, embedded systems, and flight software at our Hyderabad R&D facility."
        keywords="Hasanth Careers, firmware developer jobs Hyderabad, mechanical engineering jobs Balanagar, UAV internship"
        schema={careersSchema}
      />

      {/* Main Jobs Listings Core */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Positions List */}
        <div className="lg:col-span-8 space-y-8">
          <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-widest block mb-4 border-b border-slate-100 pb-2">
            Available Positions
          </span>

          <StaggerContainer className="space-y-8 animate-fade-in">
            {jobs.map((job, idx) => (
              <StaggerItem key={idx}>
                <InteractiveCard
                  backgroundImageUrl={job.bgUrl}
                  className="p-8"
                >
                  <div className="space-y-4">
                    
                    {/* Meta details */}
                    <div className="flex flex-wrap gap-2.5 text-[9px] font-sans font-bold uppercase tracking-widest text-slate-400">
                      <div className="flex items-center gap-1 bg-slate-100 text-[#002b5c] px-2 py-0.5 rounded-lg border border-slate-200 font-bold">
                        <Briefcase size={10} />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-100 text-[#002b5c] px-2 py-0.5 rounded-lg border border-slate-200 font-bold">
                        <MapPin size={10} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-blue-50 text-[#002b5c] px-2 py-0.5 rounded-lg border border-blue-200 font-bold">
                        <Clock size={10} />
                        <span>{job.exp}</span>
                      </div>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-xl sm:text-2xl font-sans font-black uppercase text-[#002b5c] tracking-tight leading-none group-hover:text-blue-900 transition-colors">
                      {job.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                      {job.desc}
                    </p>

                    {/* Tags */}
                    <div className="pt-4 border-t border-slate-100 space-y-4">
                      <div>
                        <p className="text-[9px] font-sans text-slate-400 font-bold uppercase tracking-wider mb-2">SKILLS AND QUALIFICATIONS REQUIREMENT:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {job.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="text-[10px] font-sans font-bold text-[#002b5c] bg-blue-50/55 px-2.5 py-1 rounded-md border border-blue-100">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </StaggerContainer>


        </div>

        {/* Right side: Application guidelines frame */}
        <div className="lg:col-span-4 space-y-6">
          <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-widest block mb-4 border-b border-slate-100 pb-2">
            How to apply
          </span>
          
          <ScrollEntrance delay={0.25}>
            <div className="p-6 sm:p-8 bg-[#002b5c] border-2 border-[#002b5c] text-white rounded-[28px] shadow-2xl relative overflow-hidden">
              {/* Faint blueprint backdrop */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:12px_12px] animate-grid" />
              
              <div className="space-y-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20">
                  <Mail size={18} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-sans font-black uppercase tracking-tight text-white leading-tight">
                    Direct Application Intake
                  </h3>
                  <p className="text-xs text-slate-350 leading-relaxed font-semibold">
                    We maintain a rapid evaluation pipeline. Transmit your resume, portfolio of CAD blueprints, and summary of hardware/embedded codes directly to our review desk.
                  </p>
                </div>

                {/* Email Copier widget */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 shadow-inner">
                  <p className="text-[9px] font-sans text-slate-400 uppercase tracking-widest block mb-2 font-bold">SEND EMAIL TO:</p>
                  <div className="flex items-center justify-between gap-2.5">
                    <span className="text-xs font-sans font-semibold text-white truncate text-ellipsis">hasanthengg@gmail.com</span>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1 px-3 bg-white hover:bg-sky-400 hover:text-[#002b5c] text-[#002b5c] font-sans text-[9px] uppercase font-black rounded cursor-pointer transition-colors"
                    >
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 text-[10px] text-slate-400 font-sans">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span>Response delay time: ~48 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span>Internships open continuously</span>
                  </div>
                </div>

              </div>
            </div>
          </ScrollEntrance>
        </div>

      </section>

    </div>
  );
}
