import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { 
  Lock, CheckCircle, Trash2, Plus, Briefcase, FileText, Mail, 
  MapPin, Clock, Calendar, Shield, LogOut, ChevronRight, RefreshCw, AlertCircle, Download, Zap, PenTool, ArrowLeft,
  Share2, Link, Check, Twitter, Linkedin, Radio, CheckCircle2, ExternalLink, Activity, Search, Globe, User
} from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { pingGoogleSearchConsole } from '../utils/searchConsolePing';

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
  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'enquiries' | 'blogs' | 'categories' | 'seo'>('jobs');
  
  // Blog Management State
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: 'Electronics Engineering',
    readingTime: '5 min read',
    excerpt: '',
    content: '',
    author: 'Systems Engineering Division',
    status: 'published' as 'published' | 'draft',
    featured: false,
    bgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
  });

  // Category Management State
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });

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
      const unsubBlogs = onSnapshot(query(collection(db, 'blogs'), orderBy('timestamp', 'desc')), (snapshot) => {
        setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setIsLoading(false);
      });
      const unsubCategories = onSnapshot(query(collection(db, 'blog_categories'), orderBy('timestamp', 'desc')), (snapshot) => {
        setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return () => {
        unsubEnquiries();
        unsubJobs();
        unsubApps();
        unsubBlogs();
        unsubCategories();
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

  // Delete Blog (Blogs CRUD)
  const handleDeleteBlog = async (blogId: string, title: string) => {
    if (!window.confirm(`Permanently delete the technical paper "${title}"?`)) return;
    try {
      await deleteDoc(doc(db, 'blogs', blogId));
      showToast('Blog Purged', 'Technical digest removed from database catalog.', 'success');
    } catch (e) {
      showToast('Deletion failed', 'Failed to remove blog entry.', 'warning');
    }
  };

  // Edit Blog trigger
  const handleEditBlog = (blog: any) => {
    setEditingBlogId(blog.id);
    setNewBlog({
      title: blog.title || '',
      category: blog.category || 'Electronics Engineering',
      readingTime: blog.readingTime || '5 min read',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      author: blog.author || 'Systems Engineering Division',
      status: blog.status || 'published',
      featured: blog.featured || false,
      bgUrl: blog.bgUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
    });
    setIsAddingBlog(true);
  };

  // Create or Update Blog
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content || !newBlog.excerpt || !newBlog.readingTime) {
      showToast('Validation Error', 'All fields are mandatory for publication.', 'warning');
      return;
    }
    
    setIsLoading(true);
    const path = 'blogs';
    try {
      const blogData = {
        ...newBlog,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
        timestamp: serverTimestamp()
      };

      if (editingBlogId) {
        const { updateDoc } = await import('firebase/firestore');
        await updateDoc(doc(db, path, editingBlogId), blogData);
        showToast('Blog Updated', 'Changes saved to the engineering journal.', 'success');
      } else {
        await addDoc(collection(db, path), blogData);
        showToast('Blog Published', 'Technical paper successfully added to the journal.', 'success');
      }
      
      setIsAddingBlog(false);
      setEditingBlogId(null);
      setNewBlog({
        title: '',
        category: 'Electronics Engineering',
        readingTime: '5 min read',
        excerpt: '',
        content: '',
        author: 'Systems Engineering Division',
        status: 'published',
        featured: false,
        bgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
      });
    } catch (e) {
      console.error("Firestore Blog Save Error:", e);
      try {
        handleFirestoreError(e, OperationType.WRITE, path);
      } catch (f) {
        showToast('Save failed', 'Database rejection. Check field lengths or connectivity.', 'warning');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Category Handlers
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name || !newCategory.slug) return;
    
    try {
      await addDoc(collection(db, 'blog_categories'), {
        ...newCategory,
        timestamp: serverTimestamp()
      });
      setNewCategory({ name: '', slug: '' });
      showToast('Category Added', 'New classification node indexed.', 'success');
    } catch (err) {
      showToast('Failed to add category', 'Firestore rejection', 'warning');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await deleteDoc(doc(db, 'blog_categories', id));
      showToast('Category Removed', 'Classification node purged.', 'success');
    } catch (err) {
      showToast('Deletion failed', 'Firestore rejection', 'warning');
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
          <button 
            onClick={() => setActiveTab('blogs')}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${
              activeTab === 'blogs' 
              ? 'text-[#002b5c] border-b-2 border-[#002b5c]' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Blogs ({blogs.length})
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${
              activeTab === 'categories' 
              ? 'text-[#002b5c] border-b-2 border-[#002b5c]' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Categories ({categories.length})
          </button>
          <button 
            onClick={() => setActiveTab('seo')}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${
              activeTab === 'seo' 
              ? 'text-[#002b5c] border-b-2 border-[#002b5c]' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            SEO & Indexing
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

          {/* TAB 4: BLOGS */}
          {activeTab === 'blogs' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#002b5c]">Technical Publications Manager</h2>
                  <p className="text-[10px] text-slate-400 font-medium">Published Papers: {blogs.length}</p>
                </div>
                <button 
                  onClick={() => setIsAddingBlog(!isAddingBlog)}
                  className="flex items-center gap-2 bg-[#002b5c] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-900 transition-all shadow-lg shadow-blue-900/10"
                >
                  {isAddingBlog ? <ArrowLeft size={16} /> : <Plus size={16} />}
                  {isAddingBlog ? 'Cancel Publishing' : 'New Publication'}
                </button>
              </div>
              {isAddingBlog ? (
                <form onSubmit={handleSaveBlog} className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 space-y-4 animate-in slide-in-from-top-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Publication Title *</label>
                      <input
                        type="text"
                        required
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:border-[#002b5c] outline-none"
                        placeholder="e.g. Design of High-Speed Telemetry Systems"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Author / Division *</label>
                      <input
                        type="text"
                        required
                        value={newBlog.author}
                        onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:border-[#002b5c] outline-none"
                        placeholder="e.g. Systems Engineering Division"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Category *</label>
                      <select
                        value={newBlog.category}
                        onChange={(e) => setNewBlog({...newBlog, category: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:border-[#002b5c] outline-none"
                      >
                        {categories.length > 0 ? (
                          categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)
                        ) : (
                          <>
                            <option value="Electronics Engineering">Electronics Engineering</option>
                            <option value="UAV & Aerospace">UAV & Aerospace</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Research & Innovation">Research & Innovation</option>
                          </>
                        )}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Reading Time (e.g. 5 min read) *</label>
                      <input
                        type="text"
                        required
                        value={newBlog.readingTime}
                        onChange={(e) => setNewBlog({...newBlog, readingTime: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:border-[#002b5c] outline-none"
                        placeholder="5 min read"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Status *</label>
                      <div className="flex gap-4 p-2 bg-white rounded-xl border border-slate-200">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" checked={newBlog.status === 'published'} onChange={() => setNewBlog({...newBlog, status: 'published'})} className="accent-[#002b5c]" />
                          <span className="text-xs font-bold text-slate-600">Published</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" checked={newBlog.status === 'draft'} onChange={() => setNewBlog({...newBlog, status: 'draft'})} className="accent-[#002b5c]" />
                          <span className="text-xs font-bold text-slate-600">Draft</span>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Featured Post</label>
                      <label className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                        <input type="checkbox" checked={newBlog.featured} onChange={(e) => setNewBlog({...newBlog, featured: e.target.checked})} className="w-4 h-4 accent-[#002b5c]" />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider text-[10px]">Mark as Featured</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Featured Image URL (High Resolution)*</label>
                    <input
                      type="url"
                      required
                      value={newBlog.bgUrl}
                      onChange={(e) => setNewBlog({...newBlog, bgUrl: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:border-[#002b5c] outline-none"
                      placeholder="https://images.unsplash.com/..."
                    />
                    {newBlog.bgUrl && (
                      <div className="mt-2 h-24 w-40 relative rounded-lg overflow-hidden border border-slate-200">
                        <img src={newBlog.bgUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Abstract / Summary Excerpt *</label>
                    <textarea
                      required
                      value={newBlog.excerpt}
                      onChange={(e) => setNewBlog({...newBlog, excerpt: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 font-semibold focus:border-[#002b5c] outline-none h-20 resize-none"
                      placeholder="Brief overview for the listing card..."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Full Technical Content (Markdown Supported) *</label>
                    <textarea
                      required
                      value={newBlog.content}
                      onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 text-xs text-slate-800 font-semibold font-mono focus:border-[#002b5c] outline-none h-48 resize-none"
                      placeholder="Enter detailed report findings..."
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#002b5c] text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-900 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    {isLoading ? <RefreshCw className="animate-spin" size={16} /> : <CheckCircle size={16} />}
                    {isLoading ? 'Processing...' : (editingBlogId ? 'Update Publication' : 'Publish to Engineering Journal')}
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {blogs.length === 0 ? (
                  <div className="p-20 border border-dashed border-slate-200 rounded-2xl text-center">
                    <p className="text-sm text-slate-400 font-medium italic">No custom blog posts found in the database. Utilizing initial system defaults.</p>
                  </div>
                ) : (
                  blogs.map((blog) => (
                    <div key={blog.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-start gap-6 hover:border-[#002b5c]/20 transition-all relative group overflow-hidden">
                      {blog.featured && (
                        <div className="absolute top-0 right-0 bg-amber-400 text-white text-[8px] font-black uppercase px-3 py-1 rounded-bl-lg tracking-widest z-10">
                          Featured
                        </div>
                      )}
                      
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                        <img src={blog.bgUrl} alt={blog.title} className="w-full h-full object-cover" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-base font-bold text-slate-900 truncate pr-16">{blog.title}</h3>
                          <span className="text-[10px] text-slate-400 font-mono italic">
                            {blog.date || 'Undated'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2 py-0.5 bg-blue-50 text-[#002b5c] text-[9px] font-bold uppercase rounded border border-blue-100">
                            {blog.category}
                          </span>
                          <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded border ${
                            blog.status === 'published' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-200'
                          }`}>
                            {blog.status || 'published'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {blog.excerpt}
                        </p>
                        
                        <div className="mt-4 flex items-center gap-4">
                          <button onClick={() => handleEditBlog(blog)} className="text-[10px] font-black uppercase tracking-widest text-[#002b5c] hover:underline flex items-center gap-1">
                            <PenTool size={12} /> Edit Details
                          </button>
                          <button onClick={() => handleDeleteBlog(blog.id, blog.title)} className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline flex items-center gap-1">
                            <Trash2 size={12} /> Delete Entry
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#002b5c]">Taxonomy Management</h2>
              <p className="text-[10px] text-slate-400 font-medium">Controlled Nodes: {categories.length}</p>
            </header>

            <form onSubmit={handleAddCategory} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 space-y-1 w-full">
                <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Category Name</label>
                <input
                  type="text"
                  required
                  value={newCategory.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/\s+/g, '-');
                    setNewCategory({ name, slug });
                  }}
                  placeholder="e.g. Avionics Systems"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:bg-white outline-none"
                />
              </div>
              <div className="flex-1 space-y-1 w-full">
                <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">URL Slug (Auto)</label>
                <input
                  type="text"
                  readOnly
                  value={newCategory.slug}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-400 font-mono"
                />
              </div>
              <button
                type="submit"
                className="bg-[#002b5c] text-white px-8 h-[42px] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-900 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={14} /> Add Node
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map(cat => (
                <div key={cat.id} className="bg-white p-4 border border-slate-200 rounded-xl flex items-center justify-between shadow-sm group hover:border-[#002b5c]/30 transition-all">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{cat.name}</h4>
                    <span className="text-[10px] font-mono text-slate-400">/{cat.slug}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SEO & INDEXING */}
        {activeTab === 'seo' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <header className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#002b5c]">Search Engine Control</h2>
              <p className="text-[10px] text-slate-400 font-medium">Global Sitemap Mapping Enabled</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Google Search Console Status */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-[#002b5c]">
                    <Search size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Google Search Console</h3>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Configuration Applied</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The website is configured with valid verification meta tags and a dynamically referenced robots.txt file to assist Google's crawler in traversing the engineering journal.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={async () => {
                      setIsLoading(true);
                      const result = await pingGoogleSearchConsole();
                      setIsLoading(false);
                      showToast('Indexing Requested', result.message, 'success');
                    }}
                    disabled={isLoading}
                    className="w-full h-10 border border-[#002b5c] text-[#002b5c] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#002b5c] hover:text-white transition-all flex items-center justify-center gap-2 group"
                  >
                    <Activity size={14} className="group-hover:animate-pulse" />
                    {isLoading ? 'Requesting Ping...' : 'Submit Indexing Request'}
                  </button>
                </div>
              </div>

              {/* Google Analytics Status */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Google Analytics (GA4)</h3>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tracking Integrated</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Global tracking scripts (gtag.js) are injected with performance-optimized loading to monitor visitor traffic, engineering paper engagement, and career application flows.
                </p>
                <div className="pt-2">
                  <a 
                    href="https://analytics.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full h-10 border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={14} />
                    Open Dashboard
                  </a>
                </div>
              </div>
            </div>

            {/* Sitemap & Meta Preview */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
              <Globe size={180} className="absolute -bottom-20 -right-20 text-white/5" />
              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Sitemap Mapping</h3>
                  <code className="text-[11px] font-mono text-blue-300 block bg-black/30 p-3 rounded-lg border border-white/10 break-all">
                    URL: https://www.hasanthengineering.co.in/sitemap.xml
                  </code>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Current Page Meta Engine</h3>
                  <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                    Our architectural SEO engine utilizes "react-helmet-async" to inject precision meta tags, canonical URLs, and JSON-LD structured data into the DOM before search engine bots begin their analysis.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                    <CheckCircle size={12} /> Open Graph v3.0
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                    <CheckCircle size={12} /> Twitter Card Support
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                    <CheckCircle size={12} /> Schema.org LD-JSON
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </main>
      </div>
    </div>
  );
}

