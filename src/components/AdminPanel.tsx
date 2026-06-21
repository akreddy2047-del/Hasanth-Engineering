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
    try {
      await deleteDoc(doc(db, 'jobs', jobId));
      showToast('Vacancy Purged', 'Position removed from recruitment pipeline.', 'success');
    } catch (e) {
      showToast('Error purging job', 'Firestore deletion failed.', 'warning');
    }
  };

  // Delete Candidate Application (Applications CRUD)
  const handleDeleteApplication = async (appId: string, name: string) => {
    try {
      await deleteDoc(doc(db, 'applications', appId));
      showToast('Application Purged', 'Candidate data file deleted securely.', 'success');
    } catch (e) {
      showToast('Deletion failed', 'Could not delete entry document.', 'warning');
    }
  };

  // Delete Enquiry (Enquiries CRUD)
  const handleDeleteEnquiry = async (enqId: string, fromName: string) => {
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
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 font-sans text-slate-900 relative z-40">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="max-w-5xl mx-auto mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 flex items-center justify-center rounded-xl border border-slate-100">
                <Shield size={18} className="text-[#002b5c]" />
              </div>
              <div>
                <h1 className="text-sm font-sans font-black uppercase text-[#002b5c] leading-none mb-0.5">Control</h1>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Hasanth Engineering Node • Active</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 text-slate-400 hover:text-red-600 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        {/* Dense Navigation */}
        <div className="max-w-5xl mx-auto mb-6">
          <div className="bg-slate-100/50 p-1 rounded-xl flex gap-1">
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === 'jobs' 
                ? 'bg-white text-[#002b5c] shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Briefcase size={12} /> Vacancies ({jobs.length})
            </button>
            <button 
              onClick={() => setActiveTab('applications')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === 'applications' 
                ? 'bg-white text-[#002b5c] shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <FileText size={12} /> Resumes ({applications.length})
            </button>
            <button 
              onClick={() => setActiveTab('enquiries')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === 'enquiries' 
                ? 'bg-white text-[#002b5c] shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Mail size={12} /> Inquiries ({enquiries.length})
            </button>
          </div>
        </div>

        {/* Dynamic Control Main Interface */}
        <div className="space-y-8">
          
          {/* TAB 1: JOBS & TEMPLATES */}
          {activeTab === 'jobs' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              <div className="lg:col-span-12 bg-white border border-slate-200 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-sans font-black uppercase text-[#002b5c] tracking-wider">Deploy Position</h2>
                  <span className="text-[9px] text-slate-400 font-mono">Select Blueprint or Manual Entry</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {JOB_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.name}
                      type="button"
                      onClick={() => handleLoadTemplate(tmpl)}
                      className="text-left p-2 border border-slate-100 hover:border-[#002b5c]/30 rounded-xl transition-all group bg-slate-50/50"
                    >
                      <div className="text-[9px] font-black uppercase text-[#002b5c] leading-tight flex items-center justify-between">
                        {tmpl.name}
                        <Plus size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>

                <div className="h-px bg-slate-100" />

                <form onSubmit={handleAddJob} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="text-[8px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Title</label>
                      <input type="text" required value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})}
                        className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-lg px-3 py-2 text-xs text-slate-800 font-semibold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Type</label>
                      <input type="text" required value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}
                        className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-lg px-3 py-2 text-xs text-slate-800 font-semibold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Location</label>
                      <input type="text" required value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})}
                        className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-lg px-3 py-2 text-xs text-slate-800 font-semibold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Experience</label>
                      <input type="text" value={newJob.exp} onChange={e => setNewJob({...newJob, exp: e.target.value})}
                        className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-lg px-3 py-2 text-xs text-slate-800 font-semibold" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Description</label>
                    <textarea rows={2} required value={newJob.desc} onChange={e => setNewJob({...newJob, desc: e.target.value})}
                      className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-lg px-3 py-2 text-xs text-slate-800 font-semibold resize-none" />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1 space-y-1">
                      <label className="text-[8px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Technical Skills</label>
                      <input type="text" value={newJob.skills} onChange={e => setNewJob({...newJob, skills: e.target.value})}
                        className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-lg px-3 py-2 text-xs text-slate-800 font-semibold"
                        placeholder="MATLAB, C++..." />
                    </div>
                    <button 
                      type="submit"
                      className="self-end px-6 bg-[#002b5c] hover:bg-blue-600 text-white font-mono text-[9px] font-bold uppercase tracking-widest py-2.5 rounded-lg transition-all"
                    >
                      Deploy
                    </button>
                  </div>
                </form>
              </div>

              <div className="lg:col-span-12 bg-white border border-slate-200 p-5 rounded-2xl">
                <h3 className="text-[9px] font-sans font-black uppercase text-slate-400 tracking-widest mb-4 border-b border-slate-50 pb-2">Active Roles Pipeline</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {jobs.length === 0 ? (
                    <div className="col-span-full p-6 border border-dashed border-slate-100 rounded-xl text-center text-[9px] text-slate-300 font-bold uppercase">
                      No positions configured.
                    </div>
                  ) : (
                    jobs.map((job) => (
                      <div key={job.id} className="p-3 border border-slate-100 hover:border-slate-200 rounded-xl flex items-center justify-between gap-3 bg-slate-50/20 transition-all">
                        <div className="min-w-0">
                          <h4 className="text-[9px] font-black uppercase text-[#002b5c] truncate">{job.title}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[8px] text-slate-400 font-bold uppercase">{job.type}</span>
                            <span className="text-slate-200">•</span>
                            <span className="text-[8px] text-slate-400 font-bold uppercase">{job.location}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteJob(job.id, job.title)}
                          className="p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4">
              <h2 className="text-[9px] font-sans font-black uppercase text-slate-400 tracking-widest border-b border-slate-50 pb-2">Resume Database ({applications.length})</h2>
              
              <div className="space-y-2">
                {applications.length === 0 ? (
                  <div className="p-8 border border-dashed border-slate-100 rounded-xl text-center text-[9px] text-slate-300 font-bold uppercase">No entries Pipeline.</div>
                ) : (
                  applications.map((app) => (
                    <div key={app.id} className="p-3 border border-slate-100 rounded-xl bg-white hover:bg-slate-50/50 transition-all flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase text-[#002b5c]">{app.applicantName}</span>
                          <span className="text-[10px] text-slate-400 font-medium">| {app.applicantEmail}</span>
                        </div>
                        <div className="text-[8px] text-blue-500 font-mono font-bold uppercase mt-1">Ref: {app.jobId || 'N/A'}</div>
                        {app.resumeData && (
                          <a href={app.resumeData} download={app.resumeName || 'resume'} className="inline-flex items-center gap-1 mt-2 text-[9px] text-slate-500 hover:text-[#002b5c] font-bold">
                            <Download size={10} /> {app.resumeName || 'CV'}
                          </a>
                        )}
                      </div>
                      <button onClick={() => handleDeleteApplication(app.id, app.applicantName)} className="p-1 text-slate-300 hover:text-red-500 transition-all">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'enquiries' && (
            <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4">
              <h2 className="text-[9px] font-sans font-black uppercase text-slate-400 tracking-widest border-b border-slate-50 pb-2">Correspondance Streams ({enquiries.length})</h2>
              
              <div className="space-y-2">
                {enquiries.length === 0 ? (
                  <div className="p-8 border border-dashed border-slate-100 rounded-xl text-center text-[9px] text-slate-300 font-bold uppercase">No active requests.</div>
                ) : (
                  enquiries.map((enq) => (
                    <div key={enq.id} className="p-3 border border-slate-100 rounded-xl bg-white hover:bg-slate-50/50 transition-all flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase text-[#002b5c]">{enq.applicantName || 'Anonymous'}</span>
                          <span className="text-[10px] text-slate-400 font-medium">| {enq.applicantEmail}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg mt-2">
                          <p className="text-[9px] text-slate-600 leading-relaxed font-semibold italic">"{enq.message}"</p>
                        </div>
                        <div className="text-[8px] text-slate-300 font-mono mt-1">Transmitted: {enq.timestamp?.toDate ? enq.timestamp.toDate().toLocaleString() : new Date().toLocaleString()}</div>
                      </div>
                      <button onClick={() => handleDeleteEnquiry(enq.id, enq.applicantName || 'Anonymous')} className="p-1 text-slate-300 hover:text-red-500 transition-all">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
        
      </div>
    </div>
  );
}

