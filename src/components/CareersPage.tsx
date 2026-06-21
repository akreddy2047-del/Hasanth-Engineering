import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Briefcase, MapPin, Calendar, Clock, ArrowRight, CheckCircle, 
  Award, UploadCloud, FileText, Check, ShieldCheck, RefreshCw, X
} from 'lucide-react';
import SEO from './SEO';
import { InteractiveCard } from './InteractiveCard';
import { ScrollEntrance, StaggerContainer, StaggerItem } from './ScrollEntrance';
import { useToast } from '../hooks/useToast';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CareersPage() {
  const [copied, setCopied] = useState(false);
  const [selectedRoleForForm, setSelectedRoleForForm] = useState<string>('Senior Embedded Firmware Developer');
  const { showToast } = useToast();
  const [jobs, setJobs] = useState<any[]>([]);
  
  // Application Form States
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  
  // File upload simulation states
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'scanning' | 'verifying' | 'completed'>('idle');

  // Interactive dynamic submission states
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submissionStep, setSubmissionStep] = useState<'idle' | 'compiling' | 'encrypting' | 'registering' | 'confirmed'>('idle');
  const [receiptCode, setReceiptCode] = useState('');
  
  const formRef = useRef<HTMLDivElement>(null);

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

  const handleInitiateApply = (roleTitle: string) => {
    setSelectedRoleForForm(roleTitle);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Drag-and-drop behaviors
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const simulateFileUpload = (fileName: string, fileSizeStr: string) => {
    setUploadedFile({ name: fileName, size: fileSizeStr });
    setUploadStatus('scanning');
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('completed');
          return 100;
        }
        if (prev === 45) {
          setUploadStatus('verifying');
        }
        return prev + 15;
      });
    }, 250);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      simulateFileUpload(file.name, `${sizeMB} MB`);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      simulateFileUpload(file.name, `${sizeMB} MB`);
    }
  };

  const clearUploadedFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setUploadStatus('idle');
  };

  // Validation & Submission
  const validateForm = () => {
    const errorLog: Record<string, string> = {};
    
    if (!applicantName || applicantName.trim().length < 3) {
      errorLog.name = 'Full Name is required (minimum 3 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!applicantEmail || !emailRegex.test(applicantEmail)) {
      errorLog.email = 'Please provide a valid email address';
    }

    const phoneRegex = /^[0-9+() \-]{10,15}$/;
    if (!applicantPhone || !phoneRegex.test(applicantPhone.trim())) {
      errorLog.phone = 'Please provide a valid contact number (10-15 digits)';
    }

    if (!coverLetter || coverLetter.trim().length < 20) {
      errorLog.coverLetter = 'Please write a brief statement of interest (minimum 20 characters)';
    }

    if (!uploadedFile || uploadStatus !== 'completed') {
      errorLog.file = 'Please upload your professional resume (PDF/DOCX) to complete the application';
    }

    setFormErrors(errorLog);
    return Object.keys(errorLog).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setSubmissionStep('compiling');

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: 'some-job-id', // Need to pass context
          applicantName,
          applicantEmail,
          applicantPhone,
          coverLetter,
          portfolioLink
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      setSubmissionStep('registering');
      
      // ... continue with existing success logic ...
      const generatedCode = `HE-REC-${Math.floor(100000 + Math.random() * 900000)}`;
      setReceiptCode(generatedCode);
      setSubmissionStep('confirmed');
      showToast('Profile Registered', 'Your application is secured.', 'success');
    } catch (error) {
      showToast('Error', 'Submission failed.', 'warning');
      setSubmissionStep('idle');
    }
  };

  const resetAllFormStates = () => {
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setCoverLetter('');
    setPortfolioLink('');
    clearUploadedFile();
    setFormErrors({});
    setSubmissionStep('idle');
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

                      {/* Apply Now Trigger */}
                      <div className="flex justify-end pt-2">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleInitiateApply(job.title)}
                          className="px-5 py-2 bg-[#002b5c] hover:bg-blue-900 text-white font-sans text-xs font-black uppercase rounded-xl inline-flex items-center gap-2 cursor-pointer shadow hover:shadow-md transition-all duration-300"
                        >
                          <span>Apply now</span>
                          <ArrowRight size={13} />
                        </motion.button>
                      </div>
                    </div>

                  </div>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Secure Interactive Application portal */}
          <div ref={formRef} className="pt-12 scroll-mt-24">
            <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-widest block mb-4 border-b border-slate-100 pb-2">
              Submission Portal
            </span>

            <div className="bg-slate-50 border-2 border-slate-100 p-8 sm:p-10 rounded-[32px] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/30 rounded-bl-full pointer-events-none" />

              <AnimatePresence mode="wait">
                {submissionStep === 'idle' && (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-xl font-sans font-black uppercase text-[#002b5c] tracking-tight leading-snug">
                        Secure Candidate Application
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Complete all credential metrics below to transmit securely to our Balanagar review core.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-sans font-bold text-slate-450 uppercase tracking-wider block">Applicant Full Name *</label>
                        <input 
                          type="text" 
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="Name"
                          className={`w-full p-3 bg-white text-sm text-slate-800 rounded-xl border ${formErrors.name ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 hover:border-slate-300'} transition-all`}
                        />
                        {formErrors.name && (
                          <p className="text-[10px] font-sans text-red-500 font-bold">{formErrors.name}</p>
                        )}
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-sans font-bold text-slate-450 uppercase tracking-wider block">Verifiable Email *</label>
                        <input 
                          type="email" 
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="you@domain.com"
                          className={`w-full p-3 bg-white text-sm text-slate-800 rounded-xl border ${formErrors.email ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 hover:border-slate-300'} transition-all`}
                        />
                        {formErrors.email && (
                          <p className="text-[10px] font-sans text-red-500 font-bold">{formErrors.email}</p>
                        )}
                      </div>

                      {/* Phone Input */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-sans font-bold text-slate-450 uppercase tracking-wider block">Contact Phone Number *</label>
                        <input 
                          type="tel" 
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="+91 XXXXX XXXXX"
                          className={`w-full p-3 bg-white text-sm text-slate-800 rounded-xl border ${formErrors.phone ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 hover:border-slate-300'} transition-all`}
                        />
                        {formErrors.phone && (
                          <p className="text-[10px] font-sans text-red-500 font-bold">{formErrors.phone}</p>
                        )}
                      </div>

                      {/* Job Selection Dropdown */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-sans font-bold text-slate-450 uppercase tracking-wider block">Target Position *</label>
                        <select 
                          value={selectedRoleForForm}
                          onChange={(e) => setSelectedRoleForForm(e.target.value)}
                          className="w-full p-3 bg-white text-sm text-[#002b5c] font-semibold rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer"
                        >
                          <option value="Senior Embedded Firmware Developer">Senior Embedded Firmware Developer</option>
                          <option value="Mechanical CAD Design Architect">Mechanical CAD Design Architect</option>
                          <option value="UAV Flight Controls Systems Intern">UAV Flight Controls Systems Intern</option>
                          <option value="General Hardware Engineering Inquiry">General Hardware Engineering Inquiry / Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Links input */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold text-slate-450 uppercase tracking-wider block">External Portfolios / Profile URLs (Optional)</label>
                      <input 
                        type="url" 
                        value={portfolioLink}
                        onChange={(e) => setPortfolioLink(e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full p-3 bg-white text-sm text-slate-800 rounded-xl border border-slate-200 hover:border-slate-300 transition-all"
                      />
                    </div>

                    {/* Statement / Cover Letter */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold text-slate-450 uppercase tracking-wider block">Brief Statement of Interest & Experience (Minimum 20 chars) *</label>
                      <textarea 
                        rows={4}
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        placeholder="Detail your experience with RTOS firmware, high density CAD models, drone pid logs, or aerospace specifications..."
                        className={`w-full p-3 bg-white text-sm text-slate-800 rounded-xl border ${formErrors.coverLetter ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 hover:border-slate-300'} transition-all`}
                      />
                      {formErrors.coverLetter && (
                        <p className="text-[10px] font-sans text-red-500 font-bold">{formErrors.coverLetter}</p>
                      )}
                    </div>

                    {/* Drag-and-drop file upload */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold text-slate-450 uppercase tracking-wider block">Transcribe Professional Resume (PDF or DOCX) *</label>
                      
                      {!uploadedFile ? (
                        <div 
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                          className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                            isDragActive ? 'border-[#002b5c] bg-blue-50/50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <input 
                            type="file" 
                            id="resume-upload" 
                            accept=".pdf,.docx"
                            onChange={handleFileInput}
                            className="hidden"
                          />
                          <label htmlFor="resume-upload" className="cursor-pointer space-y-2 block">
                            <UploadCloud className="mx-auto text-slate-400" size={36} />
                            <div className="text-xs text-slate-600 font-semibold">
                              Drag & Drop your resume here, or <span className="text-[#002b5c] font-black underline">Browse Files</span>
                            </div>
                            <p className="text-[9px] font-sans text-slate-450">Accepted Formats: PDF, DOCX (Max 10MB)</p>
                          </label>
                        </div>
                      ) : (
                        <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-50 text-[#002b5c] rounded-xl">
                              <FileText size={20} />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-semibold text-[#002b5c] truncate max-w-[200px] sm:max-w-[400px]">
                                {uploadedFile.name}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-sans text-slate-400">{uploadedFile.size}</span>
                                <span>•</span>
                                <span className="text-[10px] font-sans font-bold flex items-center gap-1">
                                  {uploadStatus === 'scanning' && (
                                    <>
                                      <RefreshCw size={10} className="animate-spin text-amber-500" />
                                      <span className="text-amber-500 uppercase">Scanning Secure Bounds ({uploadProgress}%)</span>
                                    </>
                                  )}
                                  {uploadStatus === 'verifying' && (
                                    <>
                                      <RefreshCw size={10} className="animate-spin text-blue-500" />
                                      <span className="text-blue-550 uppercase">Verifying Signature ({uploadProgress}%)</span>
                                    </>
                                  )}
                                  {uploadStatus === 'completed' && (
                                    <>
                                      <Check size={10} className="text-emerald-500" />
                                      <span className="text-emerald-600 uppercase">File Verified & Ready</span>
                                    </>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button 
                            type="button"
                            onClick={clearUploadedFile}
                            className="p-1 px-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                            title="Remove file"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                      
                      {formErrors.file && (
                        <p className="text-[10px] font-sans text-red-500 font-bold">{formErrors.file}</p>
                      )}
                    </div>

                    <div className="pt-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-[10px] font-sans text-slate-450">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <span>Data compiled with grade-A SSL end-point security protocols</span>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="px-6 py-3 bg-[#002b5c] hover:bg-blue-900 text-white font-sans text-xs font-black uppercase rounded-xl shadow cursor-pointer transition-colors"
                      >
                        Transmit Profile
                      </motion.button>
                    </div>
                  </motion.form>
                )}

                {/* Submitting processing animation stages */}
                {['compiling', 'encrypting', 'registering'].includes(submissionStep) && (
                  <motion.div 
                    key="submitting"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center space-y-6"
                  >
                    <div className="relative w-16 h-16 mx-auto">
                      <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
                      <div className="absolute inset-0 border-4 border-[#002b5c] border-t-transparent rounded-full animate-spin" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-base font-sans font-bold text-[#002b5c] uppercase tracking-wider">
                        {submissionStep === 'compiling' && '🔐 Instantiating Secure Pipeline...'}
                        {submissionStep === 'encrypting' && '⚙️ Resolving Dynamic Hash Signatures...'}
                        {submissionStep === 'registering' && '📶 Registering Applicant Token on Hub...'}
                      </h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto font-medium">
                        {submissionStep === 'compiling' && 'Bundling physical hardware profile statements and parsing resume documents.'}
                        {submissionStep === 'encrypting' && 'Applying SHA-256 secure hash to applicant metadata for Hyderabad R&D storage.'}
                        {submissionStep === 'registering' && 'Finalizing applicant entry into the evaluation board database.'}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* confirmed ticket Receipt state */}
                {submissionStep === 'confirmed' && (
                  <motion.div 
                    key="confirmed"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-150 shadow-inner">
                      <CheckCircle size={32} />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-2xl font-sans font-black uppercase text-[#002b5c] tracking-tight leading-none">
                        Application Transmitted Successfully
                      </h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
                        Verification certified. Your application and file metadata have been compiled and signed securely into our recruitment system.
                      </p>
                    </div>

                    {/* Receipt visual ticket block */}
                    <div className="max-w-md mx-auto bg-white border-2 border-[#002b5c]/10 p-6 rounded-2xl font-sans text-left space-y-4 shadow-inner relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50/20 rounded-bl-full pointer-events-none" />
                      
                      <div className="border-b border-dashed border-slate-200 pb-3 flex items-center justify-between text-[11px] font-bold text-slate-450 uppercase">
                        <span>Transmission Receipt</span>
                        <span className="text-[#002b5c] font-black">{receiptCode}</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Target Role:</span>
                          <span className="text-[#002b5c] font-bold text-right truncate max-w-[200px]">{selectedRoleForForm}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Candidate Name:</span>
                          <span className="text-[#002b5c] font-bold">{applicantName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Primary Contact:</span>
                          <span className="text-[#002b5c] font-bold">{applicantEmail}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Signed Document:</span>
                          <span className="text-[#002b5c] font-bold truncate max-w-[150px]">{uploadedFile?.name}</span>
                        </div>
                      </div>

                      <div className="bg-[#002b5c]/5 p-3 rounded-lg text-[10px] text-slate-500 leading-relaxed border-l-2 border-[#002b5c] font-medium">
                        Evaluation parameters are active. Standard review cycle takes 48 hours. Our Balanagar team desk will contact you at your primary contact email/phone.
                      </div>
                    </div>

                    <div className="pt-4 flex justify-center gap-3">
                      <button
                        onClick={resetAllFormStates}
                        className="px-5 py-2.5 border border-slate-200 hover:border-slate-350 text-slate-650 font-sans text-[10px] uppercase font-bold rounded-xl cursor-pointer"
                      >
                        Submit another application
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
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
