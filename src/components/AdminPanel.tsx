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
        
        {/* Dynamic Upper Header Section */}
        <div className="bg-white border-2 border-slate-100 p-6 sm:p-8 rounded-[32px] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-50 text-[#002b5c] rounded-2xl border border-blue-100 shadow-inner shrink-0">
              <Shield size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#0056b3] uppercase tracking-widest font-black">
                <span>HYDERABAD CORE VAULT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-sans font-black uppercase text-[#002b5c] tracking-tight">
                Control Center
              </h1>
              <p className="text-xs text-slate-500 font-semibold">
                Manage operational vacancies, evaluate candidate portfolios, and respond to incoming corporate inquiries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <button 
              onClick={handleLogout}
              className="px-4 py-2.5 bg-slate-150 hover:bg-red-50 hover:text-red-600 text-slate-700 font-mono text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-200 cursor-pointer transition-all flex items-center gap-2"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="bg-white border-2 border-slate-100 p-1.5 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-1">
          <button 
            onClick={() => setActiveTab('jobs')} 
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'jobs' 
                ? 'bg-[#002b5c] text-white shadow-md' 
                : 'text-slate-600 hover:text-[#002b5c] hover:bg-slate-50'
            }`}
          >
            <Briefcase size={14} />
            <span>Manage Vacancies</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-sans ${
              activeTab === 'jobs' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-650'
            }`}>{jobs.length}</span>
          </button>

          <button 
            onClick={() => setActiveTab('applications')} 
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'applications' 
                ? 'bg-[#002b5c] text-white shadow-md' 
                : 'text-slate-600 hover:text-[#002b5c] hover:bg-slate-50'
            }`}
          >
            <FileText size={14} />
            <span>Candidate Resumes</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-sans ${
              activeTab === 'applications' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-650'
            }`}>{applications.length}</span>
          </button>

          <button 
            onClick={() => setActiveTab('enquiries')} 
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'enquiries' 
                ? 'bg-[#002b5c] text-white shadow-md' 
                : 'text-slate-600 hover:text-[#002b5c] hover:bg-slate-50'
            }`}
          >
            <Mail size={14} />
            <span>Enquiry Streams</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-sans ${
              activeTab === 'enquiries' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-650'
            }`}>{enquiries.length}</span>
          </button>
        </div>

        {/* Dynamic Control Main Interface */}
        <div className="space-y-8">
          
          {/* TAB 1: JOBS & TEMPLATES */}
          {activeTab === 'jobs' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Job Creation Form with Template Quick loader */}
              <div className="lg:col-span-7 bg-white border-2 border-slate-100 p-6 sm:p-8 rounded-[32px] shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-sans font-black uppercase text-[#002b5c] tracking-tight leading-none mb-1">
                    Deploy Vacancy
                  </h2>
                  <p className="text-[11px] text-slate-500 font-semibold">
                    Input parametric requirements or select a verified template blueprint below to populate form variables variables instantly.
                  </p>
                </div>

                {/* Templates Grid Selector */}
                <div className="space-y-2">
                  <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-widest block">Blueprint Templates</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {JOB_TEMPLATES.map((tmpl) => (
                      <button
                        key={tmpl.name}
                        type="button"
                        onClick={() => handleLoadTemplate(tmpl)}
                        className="p-3 text-left border border-slate-200 hover:border-[#0056b3] bg-slate-50 hover:bg-blue-50/20 text-slate-800 rounded-xl transition-all duration-300 group cursor-pointer"
                      >
                        <p className="text-[11px] font-sans font-black uppercase text-[#002b5c] group-hover:text-[#0056b3] transition-colors truncate">
                          {tmpl.name}
                        </p>
                        <p className="text-[9px] text-slate-500 font-medium truncate mt-0.5">
                          {tmpl.title} ({tmpl.location})
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Form fields */}
                <form onSubmit={handleAddJob} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Position Title *</label>
                      <input 
                        type="text"
                        required
                        value={newJob.title}
                        onChange={e => setNewJob({...newJob, title: e.target.value})}
                        placeholder="e.g. Senior Firmware Designer"
                        className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Vacant Type *</label>
                      <input 
                        type="text"
                        required
                        value={newJob.type}
                        onChange={e => setNewJob({...newJob, type: e.target.value})}
                        placeholder="e.g. Full-Time Position"
                        className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Location coordinates *</label>
                      <input 
                        type="text"
                        required
                        value={newJob.location}
                        onChange={e => setNewJob({...newJob, location: e.target.value})}
                        placeholder="e.g. Balanagar Hub, Hyderabad"
                        className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Required Experience</label>
                      <input 
                        type="text"
                        value={newJob.exp}
                        onChange={e => setNewJob({...newJob, exp: e.target.value})}
                        placeholder="e.g. 3 - 5 Years Experience"
                        className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Role Narrative (Description) *</label>
                    <textarea 
                      rows={3}
                      required
                      value={newJob.desc}
                      onChange={e => setNewJob({...newJob, desc: e.target.value})}
                      placeholder="Specify RTOS tasks, physical structural tolerances, standard codes etc..."
                      className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Required Technical Skills (Comma Separated)</label>
                    <input 
                      type="text"
                      value={newJob.skills}
                      onChange={e => setNewJob({...newJob, skills: e.target.value})}
                      placeholder="e.g. C/C++, STM32 / ARM, FreeRTOS"
                      className="w-full bg-white border border-slate-200 focus:border-[#002b5c] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-[#002b5c] hover:bg-blue-900 text-white transition-all duration-300 font-mono text-xs font-black uppercase tracking-widest rounded-xl hover:shadow cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Plus size={14} />
                    <span>Deploy Vacancy Code</span>
                  </button>
                </form>
              </div>

              {/* Current vacancies list */}
              <div className="lg:col-span-5 bg-white border-2 border-slate-100 p-6 rounded-[32px] shadow-sm space-y-4">
                <div>
                  <h2 className="text-xl font-sans font-black uppercase text-[#002b5c] tracking-tight leading-none mb-1">
                    Active vacancys ({jobs.length})
                  </h2>
                  <p className="text-[11px] text-slate-500 font-semibold">
                    Current roles published live. Users will instantly view these positions on Careers division.
                  </p>
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {jobs.length === 0 ? (
                    <div className="p-8 border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-400 font-bold uppercase">
                      No positions configured.
                    </div>
                  ) : (
                    jobs.map((job) => (
                      <div key={job.id} className="p-4 border border-slate-150 hover:border-[#002b5c]/30 rounded-2xl flex items-start justify-between gap-4 transition-all bg-slate-50 relative group">
                        <div className="space-y-1.5 max-w-[80%]">
                          <h4 className="text-xs font-sans font-extrabold uppercase text-[#002b5c] leading-tight">
                            {job.title}
                          </h4>
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-sans font-bold text-slate-500 block">
                              {job.location}
                            </span>
                            <span className="text-[9px] font-mono text-blue-600 block uppercase font-bold">
                              {job.type} • {job.exp || 'Freshers / Graduates'}
                            </span>
                          </div>
                        </div>

                        <button 
                          onClick={() => handleDeleteJob(job.id, job.title)}
                          title="Purge position vacancy"
                          className="p-1 px-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CANDIDATE APPLICATIONS (CRUD View & Delete) */}
          {activeTab === 'applications' && (
            <div className="bg-white border-2 border-slate-100 p-6 sm:p-8 rounded-[32px] shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-sans font-black uppercase text-[#002b5c] tracking-tight leading-none mb-1">
                  Applicant Resume Database ({applications.length})
                </h2>
                <p className="text-[11px] text-slate-500 font-semibold">
                  Credentials and portfolio statements securely logged files. Standard review logs must remain end-to-end encrypted.
                </p>
              </div>

              <div className="space-y-4">
                {applications.length === 0 ? (
                  <div className="p-12 border-2 border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-400 font-bold uppercase">
                    No candidate applications currently logged inside pipeline.
                  </div>
                ) : (
                  applications.map((app) => (
                    <div key={app.id} className="p-5 border-2 border-slate-50 rounded-2xl bg-white hover:border-[#002b5c]/20 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 relative">
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                          <span className="text-[#002b5c] text-sm font-extrabold uppercase">
                            {app.applicantName}
                          </span>
                          <span className="hidden sm:inline text-slate-300">|</span>
                          <span className="text-slate-500 text-xs font-semibold">
                            {app.applicantEmail}
                          </span>
                          {app.applicantPhone && (
                            <>
                              <span className="hidden sm:inline text-slate-300">|</span>
                              <span className="text-slate-500 text-xs font-mono">
                                {app.applicantPhone}
                              </span>
                            </>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="text-[10px] text-slate-400 font-mono font-bold uppercase bg-slate-50 px-2 py-0.5 rounded-md inline-block">
                            Target Position Ref: {app.jobId || 'Embedded/Other vacancy'}
                          </div>

                          {app.coverLetter && (
                            <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl">
                              <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                                "{app.coverLetter}"
                              </p>
                            </div>
                          )}

                          {app.portfolioLink && (
                            <div className="text-[10px] text-blue-600 font-mono hover:underline">
                              Portfolio: <a href={app.portfolioLink} target="_blank" rel="noopener noreferrer">{app.portfolioLink}</a>
                            </div>
                          )}

                          {app.resumeData && (
                            <div className="mt-2 text-[10px] text-slate-500 font-mono">
                              <a 
                                href={app.resumeData} 
                                download={app.resumeName || 'resume'} 
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-slate-300 rounded-lg bg-white transition-colors text-slate-600 hover:text-[#002b5c] font-semibold"
                              >
                                <Download size={14} />
                                {app.resumeName || 'Download Resume Document'}
                              </a>
                            </div>
                          )}
                        </div>

                        <p className="text-[9px] text-slate-400 font-mono">
                          Transmitted: {app.timestamp?.toDate ? app.timestamp.toDate().toLocaleString() : new Date().toLocaleString()}
                        </p>
                      </div>

                      <button 
                        onClick={() => handleDeleteApplication(app.id, app.applicantName)}
                        title="Purge applicant data"
                        className="p-1.5 px-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer self-end md:self-start flex items-center justify-center border border-transparent hover:border-red-200"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT ENQUIRIES (CRUD View & Delete) */}
          {activeTab === 'enquiries' && (
            <div className="bg-white border-2 border-slate-100 p-6 sm:p-8 rounded-[32px] shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-sans font-black uppercase text-[#002b5c] tracking-tight leading-none mb-1">
                  Enquiry Streams and Correspondence ({enquiries.length})
                </h2>
                <p className="text-[11px] text-slate-500 font-semibold">
                  Active general system inquiries, quote requests, and coordinate correspondence from the Contact forms.
                </p>
              </div>

              <div className="space-y-4">
                {enquiries.length === 0 ? (
                  <div className="p-12 border-2 border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-400 font-bold uppercase">
                    No active system queue correspondencies or raw requests.
                  </div>
                ) : (
                  enquiries.map((enq) => (
                    <div key={enq.id} className="p-5 border-2 border-slate-50 rounded-2xl bg-white hover:border-[#002b5c]/20 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 relative">
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                          <span className="text-[#002b5c] text-sm font-extrabold uppercase">
                            {enq.applicantName || 'Anonymous Contact'}
                          </span>
                          <span className="hidden sm:inline text-slate-300">|</span>
                          <span className="text-slate-500 text-xs font-semibold">
                            {enq.applicantEmail}
                          </span>
                        </div>

                        {enq.subject && (
                          <div className="text-[10px] font-mono text-blue-600 font-black uppercase">
                            Ref Subject: {enq.subject}
                          </div>
                        )}

                        <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl">
                          <p className="text-[11px] text-slate-700 leading-relaxed font-semibold">
                            "{enq.message}"
                          </p>
                        </div>

                        <p className="text-[9px] text-slate-400 font-mono">
                          Transmitted: {enq.timestamp?.toDate ? enq.timestamp.toDate().toLocaleString() : new Date().toLocaleString()}
                        </p>
                      </div>

                      <button 
                        onClick={() => handleDeleteEnquiry(enq.id, enq.applicantName || 'Anonymous')}
                        title="Delete inquiry from records queue"
                        className="p-1.5 px-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer self-end md:self-start flex items-center justify-center border border-transparent hover:border-red-200"
                      >
                        <Trash2 size={15} />
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

