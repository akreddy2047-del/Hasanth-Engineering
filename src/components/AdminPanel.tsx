import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { 
  Lock, CheckCircle, Trash2, Plus, Briefcase, FileText, Mail, 
  MapPin, Clock, Calendar, Shield, LogOut, ChevronRight, RefreshCw, AlertCircle, Download
} from 'lucide-react';
import { useToast } from '../hooks/useToast';

// Predefined high-quality templates for immediate loading
const JOB_TEMPLATES = [
  {
    name: 'Firmware Developer (Job)',
    title: 'Senior Embedded Firmware Developer',
    type: 'Full-Time Position',
    location: 'Balanagar Hub, Hyderabad',
    exp: '3 - 5 Years Experience',
    desc: 'Formulate real-time operating systems firmware (RTOS) on ARM Cortex microcontrollers, designing low latency sensory feedback loops and SPI drivers.',
    skills: 'C/C++, STM32 / ARM, FreeRTOS, SPI / I2C / UART'
  },
  {
    name: 'Mechanical Designer (Job)',
    title: 'Mechanical CAD Design Architect',
    type: 'Full-Time Position',
    location: 'Balanagar Hub, Hyderabad',
    exp: '2 - 4 Years Experience',
    desc: 'Draft complex parametric blueprint parts in SolidWorks, organizing multi-component sheet-metal folds, bending limits, and fixture assemblies.',
    skills: 'SolidWorks, FEA Structural Stress, CATIA V5, Geometric Tolerances'
  },
  {
    name: 'UAV Autopilot Intern (Internship)',
    title: 'UAV Flight Controls Systems Intern',
    type: 'Internship (6 Months)',
    location: 'Balanagar Hub, Hyderabad',
    exp: 'Enthusiastic Student / Graduate',
    desc: 'Assist in tuning PID parameters, verifying PX4 flight autopilot nodes, and integrating smart multi-sensor camera gimbal payloads.',
    skills: 'Autopilots PX4, Telemetry Nodes, Gimbal Controls, C++ / Git'
  },
  {
    name: 'Embedded Systems Intern (Internship)',
    title: 'Embedded Systems Intern',
    type: 'Internship (6 Months)',
    location: 'Balanagar Hub, Hyderabad',
    exp: 'Undergraduate / Enthusiastic Student',
    desc: 'Work alongside lead engineers to program STM32 microprocessors, configure diagnostic USART ports, and solder telemetry modules to custom aerospace boards.',
    skills: 'C Programming, Basic Electronics, Multimeter, UART'
  }
];

export default function AdminPanel() {
  const { showToast } = useToast();
  
  // Authorization States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('hasanth_admin_auth') === 'true';
  });
  const [loginError, setLoginError] = useState('');

  // Core Data States
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'enquiries'>('jobs');
  
  // Loading & Action States
  const [isLoading, setIsLoading] = useState(false);
  const [newJob, setNewJob] = useState({ 
    title: '', 
    type: '', 
    location: '', 
    exp: '', 
    desc: '', 
    skills: '' 
  });

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      const unsubEnquiries = onSnapshot(query(collection(db, 'enquiries'), orderBy('timestamp', 'desc')), (snapshot) => {
        setEnquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setIsLoading(false);
      });
      const unsubJobs = onSnapshot(collection(db, 'jobs'), (snapshot) => {
        const fetchedJobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const uniqueJobs: any[] = [];
        const seen = new Set();
        fetchedJobs.forEach((jb: any) => {
          const key = `${jb.title}-${jb.location}-${jb.type}`;
          if (!seen.has(key)) {
            seen.add(key);
            uniqueJobs.push(jb);
          } else {
            // Optional: If you want active cleanup of duplicates, you could delete it here
            // deleteDoc(doc(db, 'jobs', jb.id));
          }
        });
        setJobs(uniqueJobs);
        setIsLoading(false);
      });
      const unsubApps = onSnapshot(query(collection(db, 'applications'), orderBy('timestamp', 'desc')), (snapshot) => {
        setApplications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setIsLoading(false);
      });
      return () => {
        unsubEnquiries();
        unsubJobs();
        unsubApps();
      };
    }
  }, [isAuthenticated]);


  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctEmail = 'admin@hasanthenginnering.co.in';
    const correctPassword = 'Admin@123';

    if (email.trim().toLowerCase() === correctEmail.toLowerCase() && password === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('hasanth_admin_auth', 'true');
      setLoginError('');
      showToast('Login Successful', 'Welcome to the Hasanth review core.', 'success');
    } else {
      setLoginError('Invalid Administrator credentials. Signature rejected.');
      showToast('Authentication Failed', 'Signature match aborted.', 'warning');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('hasanth_admin_auth');
    showToast('Logged Out', 'Secure session terminated successfully.', 'info');
  };

  // Add job
  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.type || !newJob.location || !newJob.desc) {
      showToast('Form Incomplete', 'Please fill in all core position parameters.', 'warning');
      return;
    }

    try {
      await addDoc(collection(db, 'jobs'), {
        title: newJob.title,
        type: newJob.type,
        location: newJob.location,
        exp: newJob.exp,
        desc: newJob.desc,
        skills: newJob.skills ? newJob.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
        timestamp: serverTimestamp()
      });
      showToast('Position Loaded', `"${newJob.title}" added to active vacancy nodes.`, 'success');
      setNewJob({ title: '', type: '', location: '', exp: '', desc: '', skills: '' });
    } catch (error) {
      console.error(error);
      showToast('Failed to add job', 'Firestore write rejected', 'warning');
    }
  };

  // Delete vacancy (Jobs CRUD)
  const handleDeleteJob = async (jobId: string, title: string) => {
    if (!window.confirm(`Permanently remove the listing for "${title}"?`)) return;
    try {
      await deleteDoc(doc(db, 'jobs', jobId));
      showToast('Vacancy Purged', 'Position removed from recruitment pipeline.', 'success');
    } catch (e) {
      showToast('Error purging job', 'Firestore deletion failed.', 'warning');
    }
  };

  // Delete Candidate Application (Applications CRUD)
  const handleDeleteApplication = async (appId: string, name: string) => {
    if (!window.confirm(`Delete application file for "${name}" from the database?`)) return;
    try {
      await deleteDoc(doc(db, 'applications', appId));
      showToast('Application Purged', 'Candidate data file deleted securely.', 'success');
    } catch (e) {
      showToast('Deletion failed', 'Could not delete entry document.', 'warning');
    }
  };

  // Delete Enquiry (Enquiries CRUD)
  const handleDeleteEnquiry = async (enqId: string, fromName: string) => {
    if (!window.confirm(`Are you sure you want to purge the inquiry from "${fromName}"? This action cannot be undone.`)) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, 'enquiries', enqId));
      showToast('Inquiry Cleared', 'Inquiry log removed from active queue.', 'success');
    } catch (e) {
      showToast('Deletion failed', 'Failed to clear system log.', 'warning');
    }
  };

  // Preset Template loader
  const handleLoadTemplate = (template: typeof JOB_TEMPLATES[0]) => {
    setNewJob({
      title: template.title,
      type: template.type,
      location: template.location,
      exp: template.exp,
      desc: template.desc,
      skills: template.skills
    });
    showToast('Template Populated', `${template.name} variables loaded active.`, 'success');
  };

  // Unauthenticated Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative z-50 py-16">
        <div className="w-full max-w-md bg-white border border-slate-100 p-8 sm:p-10 rounded-3xl shadow-sm relative overflow-hidden text-slate-800 font-sans">
          
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-50 text-[#002b5c] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock size={20} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight leading-none text-[#002b5c]">
                Admin Access
              </h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Hasanth Engineering
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Email</label>
                <input 
                  type="email"
                  required
                  value={email}
                  placeholder="admin@hasanthenginnering.co.in"
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-800 font-medium transition-colors"
                />
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Password</label>
                <input 
                  type="password"
                  required
                  value={password}
                  placeholder="••••••••"
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-800 font-medium transition-colors"
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-[11px] text-red-600 font-medium mt-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-3.5 bg-[#002b5c] hover:bg-blue-900 text-white transition-all duration-300 text-[11px] font-black uppercase tracking-widest rounded-xl hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Sign In</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-20 px-6 font-sans text-slate-900 relative z-40">
      <div className="max-w-5xl mx-auto">
        
        {/* Simplified Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={18} className="text-slate-400" />
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">Management Portal</h1>
            </div>
            <p className="text-xs text-slate-500 font-medium">Hasanth Engineering (OPC) Private Limited Control Center</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold transition-all border border-slate-200 w-fit"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </header>

        {/* Clean Navigation Tabs */}
        <nav className="flex gap-8 mb-8 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${
              activeTab === 'jobs' 
              ? 'text-[#002b5c] border-b-2 border-[#002b5c]' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Vacancies ({jobs.length})
          </button>
          <button 
            onClick={() => setActiveTab('applications')}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${
              activeTab === 'applications' 
              ? 'text-[#002b5c] border-b-2 border-[#002b5c]' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Resumes ({applications.length})
          </button>
          <button 
            onClick={() => setActiveTab('enquiries')}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${
              activeTab === 'enquiries' 
              ? 'text-[#002b5c] border-b-2 border-[#002b5c]' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Inquiries ({enquiries.length})
          </button>
        </nav>

        {/* Structured Content Area */}
        <main className="space-y-12">
          
          {/* TAB 1: VACANCIES */}
          {activeTab === 'jobs' && (
            <div className="space-y-10 animate-in fade-in duration-500">
              
              {/* Position Creator Document */}
              <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#002b5c]">Deploy New Vacancy</h2>
                  <span className="text-[10px] text-slate-400 font-mono">Form Serial: H-ENG-{new Date().getFullYear()}</span>
                </div>

                <div className="p-6 space-y-6">
                  {/* Template Quick Select */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Blueprint Templates</p>
                    <div className="flex flex-wrap gap-2">
                      {JOB_TEMPLATES.map((tmpl) => (
                        <button
                          key={tmpl.name}
                          type="button"
                          onClick={() => handleLoadTemplate(tmpl)}
                          className="px-3 py-1.5 border border-slate-200 hover:border-[#002b5c]/30 rounded-lg transition-all text-[11px] font-bold text-slate-600 bg-slate-50/50 hover:bg-white"
                        >
                          {tmpl.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" />

                  <form onSubmit={handleAddJob} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Position Title</label>
                        <input type="text" required value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})}
                          placeholder="e.g. Senior Aerospace Engineer"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-lg px-4 py-2.5 text-sm text-slate-800 font-medium transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Job Type</label>
                        <input type="text" required value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}
                          placeholder="e.g. Full-Time / Internship"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-lg px-4 py-2.5 text-sm text-slate-800 font-medium transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Office Location</label>
                        <input type="text" required value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})}
                          placeholder="Balanagar, Hyderabad"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-lg px-4 py-2.5 text-sm text-slate-800 font-medium transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Experience Requirement</label>
                        <input type="text" value={newJob.exp} onChange={e => setNewJob({...newJob, exp: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-lg px-4 py-2.5 text-sm text-slate-800 font-medium transition-all" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Role Description</label>
                      <textarea rows={4} required value={newJob.desc} onChange={e => setNewJob({...newJob, desc: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-lg px-4 py-3 text-sm text-slate-800 font-medium transition-all resize-none" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 items-end">
                      <div className="flex-1 w-full space-y-2">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Technical Competencies (Comma Separated)</label>
                        <input type="text" value={newJob.skills} onChange={e => setNewJob({...newJob, skills: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-lg px-4 py-2.5 text-sm text-slate-800 font-medium transition-all"
                          placeholder="CAD, RTOS, MATLAB..." />
                      </div>
                      <button 
                        type="submit"
                        className="px-10 bg-[#002b5c] hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition-all shadow-lg active:scale-[0.98]"
                      >
                        Publish Vacancy
                      </button>
                    </div>
                  </form>
                </div>
              </section>

              {/* Active Pipeline List */}
              <section className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Active Pipeline Documents</h3>
                <div className="grid grid-cols-1 gap-3">
                  {jobs.length === 0 ? (
                    <div className="p-12 border border-dashed border-slate-200 rounded-xl text-center">
                      <p className="text-xs text-slate-400 font-medium italic">The recruitment pipeline is currently empty.</p>
                    </div>
                  ) : (
                    jobs.map((job) => (
                      <div key={job.id} className="bg-white p-5 border border-slate-200 rounded-xl flex items-center justify-between gap-6 hover:border-[#002b5c]/20 transition-all shadow-sm">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-sm font-bold text-slate-900 truncate">{job.title}</h4>
                            <span className="px-2 py-0.5 bg-[#002b5c]/5 text-[#002b5c] text-[9px] font-bold uppercase rounded leading-normal">
                              {job.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                            <div className="flex items-center gap-1">
                              <MapPin size={12} /> {job.location}
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1 font-mono uppercase text-[10px]">
                              REQ-ID: {job.id.slice(0, 6).toUpperCase()}
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteJob(job.id, job.title)}
                          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#002b5c]">Candidate Ledger</h2>
                <div className="text-[10px] text-slate-400 font-medium">Verified Entries: {applications.length}</div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {applications.length === 0 ? (
                  <div className="p-20 border border-dashed border-slate-200 rounded-2xl text-center">
                    <p className="text-sm text-slate-400 font-medium italic">No candidate credentials currently logged.</p>
                  </div>
                ) : (
                  applications.map((app) => (
                    <div key={app.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm overflow-hidden flex items-start gap-6">
                      <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-xl text-slate-400 shrink-0 border border-slate-100">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                          <div>
                            <h3 className="text-base font-bold text-slate-900 leading-none mb-1">{app.applicantName}</h3>
                            <p className="text-xs text-slate-500 font-medium">{app.applicantEmail} • {app.applicantPhone || 'No contact phone provided'}</p>
                          </div>
                          <div className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase border border-blue-100">
                            Ref: {app.jobId || 'Embedded/Other'}
                          </div>
                        </div>
                        
                        {app.coverLetter && (
                          <div className="mb-4 text-xs text-slate-600 leading-relaxed font-medium p-4 bg-slate-50 rounded-lg border-l-2 border-slate-200 italic">
                            "{app.coverLetter}"
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100">
                          {app.resumeData && (
                            <a href={app.resumeData} download={app.resumeName || 'resume'} className="flex items-center gap-2 text-xs font-bold text-[#002b5c] hover:underline">
                              <Download size={14} /> Download CV ({app.resumeName || 'Document'})
                            </a>
                          )}
                          {app.portfolioLink && (
                            <a href={app.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-slate-500 hover:text-slate-800 underline">
                              Portfolio Portfolio
                            </a>
                          )}
                        </div>
                      </div>
                      <button onClick={() => handleDeleteApplication(app.id, app.applicantName)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: INQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#002b5c]">Inquiry Records</h2>
                <div className="text-[10px] text-slate-400 font-medium">Logged Correspondence: {enquiries.length}</div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {enquiries.length === 0 ? (
                  <div className="p-20 border border-dashed border-slate-200 rounded-2xl text-center">
                    <p className="text-sm text-slate-400 font-medium italic">No active system inquiries in the queue.</p>
                  </div>
                ) : (
                  enquiries.map((enq) => (
                    <div key={enq.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-start gap-6 transition-all hover:border-[#002b5c]/20 hover:shadow-md group">
                      <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-xl text-slate-400 shrink-0 border border-slate-100 group-hover:bg-[#002b5c]/5 group-hover:text-[#002b5c] transition-colors">
                        <Mail size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-2 border-b border-slate-50 pb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-slate-900">{enq.applicantName || 'Anonymous External'}</h3>
                            {enq.type === 'consultation' && (
                              <span className="px-1.5 py-0.5 bg-blue-50 text-[#002b5c] text-[8px] font-bold uppercase rounded border border-blue-100">Consultation</span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono italic">
                            {enq.timestamp?.toDate ? enq.timestamp.toDate().toLocaleString() : 'Recent Correspondence'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mb-3">
                          <p className="text-[11px] text-slate-500 font-medium">Email: <span className="text-slate-700">{enq.applicantEmail}</span></p>
                          {enq.phone && <p className="text-[11px] text-slate-500 font-medium">Phone: <span className="text-slate-700">{enq.phone}</span></p>}
                          {enq.company && <p className="text-[11px] text-slate-500 font-medium">Co: <span className="text-slate-700">{enq.company}</span></p>}
                          {enq.industry && <p className="text-[11px] text-slate-500 font-medium">Ind: <span className="text-slate-700">{enq.industry}</span></p>}
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-[#002b5c] group-hover:bg-white transition-colors duration-300">
                          <p className="text-[10px] text-[#002b5c] font-mono uppercase mb-2 font-black tracking-tighter opacity-70 flex items-center gap-2">
                            <Zap size={10} />
                            {enq.subject || 'Message Payload'}
                          </p>
                          <p className="text-[13px] text-slate-800 leading-relaxed font-semibold">"{enq.message}"</p>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteEnquiry(enq.id, enq.applicantName || 'Anonymous')} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </main>
        
      </div>
    </div>
  );
}

