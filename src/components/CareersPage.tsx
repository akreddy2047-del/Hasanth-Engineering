import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, Briefcase, MapPin, Clock, ArrowRight, 
  Award, X, Send, Upload
} from 'lucide-react';
import SEO from './SEO';
import { InteractiveCard } from './InteractiveCard';
import { ScrollEntrance, StaggerContainer, StaggerItem } from './ScrollEntrance';
import { useToast } from '../hooks/useToast';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { db } from '../lib/firebase';
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';

export default function CareersPage({ onPageChange }: { onPageChange?: (pageId: string) => void }) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();
  const { config } = useSiteConfig();
  const [jobs, setJobs] = useState<any[]>([]);
  const [applyingJob, setApplyingJob] = useState<any | null>(null);

  // Application form state
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [resumeFile, setResumeFile] = useState<{name: string, data: string} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'jobs'),
      (snapshot) => {
        const fetchedJobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Deduplicate incoming jobs by title, location, type to avoid double appearance
        const uniqueJobs: any[] = [];
        const seen = new Set();
        fetchedJobs.forEach((jb: any) => {
          const key = `${jb.title}-${jb.location}-${jb.type}`;
          if (!seen.has(key)) {
            seen.add(key);
            uniqueJobs.push(jb);
          }
        });
        
        setJobs(uniqueJobs);
      },
      (error) => {
        console.error("Error fetching careers: ", error);
      }
    );
    return () => unsub();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 1024 * 1024) { // 1MB limit for Firestore
        showToast('File Too Large', 'Resume must be under 1MB', 'warning');
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeFile({
          name: file.name,
          data: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyParamsForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob || !applicantName || !applicantEmail) {
      showToast('Action Failed', 'Please provide missing vital applicant data.', 'warning');
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'applications'), {
        jobId: applyingJob.title,
        applicantName,
        applicantEmail,
        applicantPhone,
        coverLetter,
        portfolioLink,
        resumeName: resumeFile?.name || null,
        resumeData: resumeFile?.data || null,
        timestamp: serverTimestamp()
      });
      showToast('Application Submitted', 'Your transmission was received into the node. Check email for next steps.', 'success');
      setApplyingJob(null);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setCoverLetter('');
      setPortfolioLink('');
      setResumeFile(null);
    } catch (error) {
      console.error("Error submitting application:", error);
      showToast('Delivery Failure', 'Data block was rejected by servers.', 'warning');
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
            <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-widest block">
              Available Positions
            </span>
            {onPageChange && (
              <button
                onClick={() => {
                  localStorage.setItem('adminActiveTab', 'jobs');
                  onPageChange('admin');
                }}
                className="text-[10px] font-sans text-blue-600 hover:text-blue-800 font-bold uppercase tracking-widest flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Manage Postings</span>
                <ArrowRight size={10} className="stroke-[2.5]" />
              </button>
            )}
          </div>

          {jobs.length > 0 ? (
            <StaggerContainer key={jobs.length} className="space-y-8 animate-fade-in">
              {jobs.map((job, idx) => (
                <StaggerItem key={job.id || idx}>
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
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                          <p className="text-[9px] font-sans text-slate-400 font-bold uppercase tracking-wider mb-2">SKILLS AND QUALIFICATIONS REQUIREMENT:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {(job.skills || []).map((skill: string, sIdx: number) => (
                              <span key={sIdx} className="text-[10px] font-sans font-bold text-[#002b5c] bg-blue-50/55 px-2.5 py-1 rounded-md border border-blue-100">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => setApplyingJob(job)}
                          className="self-start sm:self-auto px-5 py-2.5 bg-[#002b5c] hover:bg-blue-600 text-white text-[10px] font-mono font-bold uppercase tracking-widest rounded-xl transition-colors shrink-0"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>

                  </div>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
          ) : (
            <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-3xl animate-fade-in">
               <p className="text-xs font-sans text-slate-400 font-bold uppercase tracking-widest">No open positions currently available</p>
            </div>
          )}

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
                    <span className="text-xs font-sans font-semibold text-white truncate text-ellipsis">{config.contactEmail}</span>
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

      {/* Apply Modal Context */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setApplyingJob(null)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-white rounded-[24px] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-xl font-sans font-black text-[#002b5c] uppercase leading-none mb-1">
                  Submit Candidate File
                </h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  Target Position: {applyingJob.title}
                </p>
              </div>
              <button 
                onClick={() => setApplyingJob(null)}
                className="p-2 hover:bg-slate-200 rounded-xl text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleApplyParamsForm} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Legal Name *</label>
                  <input type="text" required value={applicantName} onChange={e => setApplicantName(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold"
                    placeholder="Enter full name" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Email Address *</label>
                    <input type="email" required value={applicantEmail} onChange={e => setApplicantEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold"
                      placeholder="Transmission contact" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Mobile Number</label>
                    <input type="tel" value={applicantPhone} onChange={e => setApplicantPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold"
                      placeholder="Optional" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Resume Upload *</label>
                  <label className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-[#002b5c]/50 bg-slate-50 hover:bg-blue-50/50 rounded-xl px-4 py-4 text-xs font-semibold text-slate-600 cursor-pointer transition-colors relative overflow-hidden">
                    <Upload size={16} />
                    <span className="truncate">{resumeFile ? resumeFile.name : 'Select Resume File (Max 1MB)'}</span>
                    <input type="file" required onChange={handleFileChange} accept=".pdf,.doc,.docx" className="absolute inset-0 opacity-0 cursor-pointer" />
                  </label>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Portfolio Link (Optional)</label>
                  <input type="url" value={portfolioLink} onChange={e => setPortfolioLink(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold"
                    placeholder="https://github.com/..." />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Cover Letter Context</label>
                  <textarea rows={4} value={coverLetter} onChange={e => setCoverLetter(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold resize-none"
                    placeholder="Brief summary of specialized engineering skills..." />
                </div>
                
                <div className="pt-2">
                  <button 
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#002b5c] hover:bg-blue-600 text-white font-mono text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Transmitting Data...' : (
                      <>Push Candidate Telemetry <Send size={14} /></>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
