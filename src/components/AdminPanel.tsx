import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { 
  Lock, CheckCircle, Trash2, Plus, Briefcase, FileText, Mail, Phone,
  MapPin, Clock, Calendar, Shield, LogOut, ChevronRight, RefreshCw, AlertCircle, Download, Zap, PenTool, ArrowLeft,
  Share2, Link, Check, Twitter, Linkedin, Radio, CheckCircle2, ExternalLink, Activity, Search, Globe, User,
  BarChart, Settings, MessageCircle, Save
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
  const [legalPages, setLegalPages] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [pageContent, setPageContent] = useState<any[]>([]);
  const [trustMetrics, setTrustMetrics] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'enquiries' | 'blogs' | 'projects' | 'content' | 'metrics' | 'settings'>('jobs');
  
  // Site Configuration State
  const [siteConfig, setSiteConfig] = useState<any>({
    whatsappNumber: '8187044238',
    whatsappMessage: 'Hello, I am looking to schedule an industrial engineering consultation with HASANTH ENGINEERING. Please connect me with a designer.',
    contactPhone: '8187044238',
    contactEmail: 'hasanthengg@gmail.com',
    contactAddress: 'H NO 3-3-8/4, KUKATPALLY, Vivekanandanagar Colony, Balanagar, Hyderabad-500072, Telangana.',
    contactAddressShort: 'Kukatpally, Hyderabad'
  });
  // Content Management State
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editingPageData, setEditingPageData] = useState<any>(null);
  
  // Project Management State
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Aerospace Systems',
    imageUrl: '',
    description: '',
    specs: ['', '', '']
  });

  // Trust Metrics Management State
  const [isAddingMetric, setIsAddingMetric] = useState(false);
  const [editingMetricId, setEditingMetricId] = useState<string | null>(null);
  const [newMetric, setNewMetric] = useState({
    value: '',
    label: '',
    desc: '',
    order: 0
  });
  
  // Legal Management State
  const [editingLegal, setEditingLegal] = useState<any>(null);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');
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
      }, (error) => handleFirestoreError(error, OperationType.LIST, 'enquiries'));
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
      }, (error) => handleFirestoreError(error, OperationType.LIST, 'jobs'));
      const unsubApps = onSnapshot(query(collection(db, 'applications'), orderBy('timestamp', 'desc')), (snapshot) => {
        setApplications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setIsLoading(false);
      }, (error) => handleFirestoreError(error, OperationType.LIST, 'applications'));
      const unsubBlogs = onSnapshot(query(collection(db, 'blogs'), orderBy('timestamp', 'desc')), (snapshot) => {
        setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setIsLoading(false);
      }, (error) => handleFirestoreError(error, OperationType.LIST, 'blogs'));
      const unsubCategories = onSnapshot(query(collection(db, 'blog_categories'), orderBy('timestamp', 'desc')), (snapshot) => {
        setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }, (error) => handleFirestoreError(error, OperationType.LIST, 'blog_categories'));
      const unsubLegal = onSnapshot(collection(db, 'legal'), (snapshot) => {
        setLegalPages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }, (error) => handleFirestoreError(error, OperationType.LIST, 'legal'));
      const unsubProjects = onSnapshot(query(collection(db, 'projects'), orderBy('timestamp', 'desc')), (snapshot) => {
        setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }, (error) => handleFirestoreError(error, OperationType.LIST, 'projects'));
      const unsubPageContent = onSnapshot(collection(db, 'page_content'), (snapshot) => {
        setPageContent(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }, (error) => handleFirestoreError(error, OperationType.LIST, 'page_content'));
      const unsubMetrics = onSnapshot(query(collection(db, 'trust_metrics'), orderBy('order', 'asc')), (snapshot) => {
        setTrustMetrics(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }, (error) => handleFirestoreError(error, OperationType.LIST, 'trust_metrics'));
      const unsubConfig = onSnapshot(doc(db, 'site_config', 'global'), (snapshot) => {
        if (snapshot.exists()) {
          setSiteConfig(snapshot.data());
        }
      }, (error) => handleFirestoreError(error, OperationType.GET, 'site_config/global'));
      return () => {
        unsubEnquiries();
        unsubJobs();
        unsubApps();
        unsubBlogs();
        unsubProjects();
        unsubPageContent();
        unsubMetrics();
        unsubConfig();
      };
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (activeTab === 'content' && pageContent.length > 0) {
      if (!editingPageId) {
        setEditingPageId('home');
      }
      const page = pageContent.find(p => p.id === (editingPageId || 'home'));
      if (page) {
        setEditingPageData({
          title: page.title || '',
          subtitle: page.subtitle || '',
          content: page.content || '',
          imageUrl: page.imageUrl || '',
          sections: page.sections || []
        });
      }
    }
  }, [activeTab, editingPageId, pageContent]);

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

  // Legal Handlers
  const handleSaveLegal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLegal?.content) return;

    setIsLoading(true);
    try {
      const { setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, 'legal', legalTab), {
        ...editingLegal,
        type: legalTab,
        lastUpdated: serverTimestamp()
      }, { merge: true });
      showToast('Legal Page Updated', 'Changes saved to the secure database.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Save failed', 'Firestore rejection', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.imageUrl || !newProject.description) {
      showToast('Form incomplete', 'Required fields missing for project archive.', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const projectData = {
        ...newProject,
        specs: newProject.specs.filter(s => s.trim() !== ''),
        timestamp: serverTimestamp()
      };

      if (editingProjectId) {
        const { updateDoc } = await import('firebase/firestore');
        await updateDoc(doc(db, 'projects', editingProjectId), projectData);
        showToast('Project Updated', 'Blueprint archive successfully re-calibrated.', 'success');
      } else {
        await addDoc(collection(db, 'projects'), projectData);
        showToast('Project Added', 'New project node established in infrastructure.', 'success');
      }
      setIsAddingProject(false);
      setEditingProjectId(null);
      setNewProject({ title: '', category: 'Aerospace Systems', imageUrl: '', description: '', specs: ['', '', ''] });
    } catch (err) {
      showToast('Operation Failed', 'Database write aborted.', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Physically remove this project blueprint from archives?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      showToast('Metadata Purged', 'Project archived and removed.', 'info');
    } catch (err) {
      showToast('Deletion Failed', 'Node could not be removed.', 'warning');
    }
  };

  // Content Management Handlers
  const handleSavePageContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPageData) return;
    setIsLoading(true);
    try {
      const { setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, 'page_content', editingPageId!), {
        ...editingPageData,
        pageId: editingPageId,
        lastUpdated: serverTimestamp()
      }, { merge: true });
      showToast('Page Updated', 'Content successfully synchronized with public servers.', 'success');
    } catch (err) {
      showToast('Update Failed', 'Firestore write rejected.', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMetric = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMetric.value || !newMetric.label || !newMetric.desc) {
      showToast('Form incomplete', 'Required fields missing for metric.', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const metricData = {
        ...newMetric,
        timestamp: serverTimestamp()
      };

      if (editingMetricId) {
        const { updateDoc } = await import('firebase/firestore');
        await updateDoc(doc(db, 'trust_metrics', editingMetricId), metricData);
        showToast('Metric Updated', 'Trust metric successfully calibrated.', 'success');
      } else {
        await addDoc(collection(db, 'trust_metrics'), metricData);
        showToast('Metric Added', 'New trust metric node established.', 'success');
      }
      setIsAddingMetric(false);
      setEditingMetricId(null);
      setNewMetric({ value: '', label: '', desc: '', order: trustMetrics.length });
    } catch (err) {
      showToast('Operation Failed', 'Database write aborted.', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMetric = async (id: string) => {
    if (!window.confirm('Permanently delete this trust metric?')) return;
    try {
      await deleteDoc(doc(db, 'trust_metrics', id));
      showToast('Metric Purged', 'Trust metric removed from database.', 'info');
    } catch (err) {
      showToast('Deletion Failed', 'Node could not be removed.', 'warning');
    }
  };

  // Save site config
  const handleSaveSiteConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, 'site_config', 'global'), {
        ...siteConfig,
        lastUpdated: serverTimestamp()
      });
      showToast('Settings Updated', 'Global configuration nodes have been recalibrated.', 'success');
    } catch (err) {
      showToast('Sync Failed', 'Could not transmit configuration to database.', 'warning');
    } finally {
      setIsLoading(false);
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
            onClick={() => setActiveTab('projects')}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${
              activeTab === 'projects' 
              ? 'text-[#002b5c] border-b-2 border-[#002b5c]' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Projects ({projects.length})
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${
              activeTab === 'content' 
              ? 'text-[#002b5c] border-b-2 border-[#002b5c]' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Page Content ({pageContent.length})
          </button>
          <button 
            onClick={() => setActiveTab('metrics')}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${
              activeTab === 'metrics' 
              ? 'text-[#002b5c] border-b-2 border-[#002b5c]' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Trust Metrics ({trustMetrics.length})
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${
              activeTab === 'settings' 
              ? 'text-[#002b5c] border-b-2 border-[#002b5c]' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Site Settings
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
                          {enq.serviceType && <p className="text-[11px] text-slate-500 font-medium">Service: <span className="text-slate-700">{enq.serviceType}</span></p>}
                          {enq.executionTimeframe && <p className="text-[11px] text-slate-500 font-medium">Timing: <span className="text-slate-700">{enq.executionTimeframe}</span></p>}
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

        {/* TAB 5-7: REPLACED BY CONTENT MANAGEMENT */}
        {activeTab === 'content' && (
          <div className="space-y-10 animate-in fade-in duration-500">
             <header className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#002b5c]">Website Content Management</h2>
                <p className="text-[10px] text-slate-400 font-medium">Balanagar Facility Digital Core</p>
              </div>
              <div className="flex gap-4">
              </div>
            </header>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {['home', 'about', 'services', 'research', 'industries', 'privacy', 'terms'].map((pId) => (
                <button 
                  key={pId}
                  onClick={() => setEditingPageId(pId)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${
                    editingPageId === pId 
                    ? 'bg-[#002b5c] text-white shadow-lg' 
                    : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100'
                  }`}
                >
                  {pId}
                </button>
              ))}
            </div>

            {editingPageData ? (
              <form onSubmit={handleSavePageContent} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Page Hero Title</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all underline decoration-slate-200"
                      value={editingPageData.title}
                      onChange={e => setEditingPageData({...editingPageData, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Page Subtitle</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all underline decoration-slate-200"
                      value={editingPageData.subtitle}
                      onChange={e => setEditingPageData({...editingPageData, subtitle: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Main Narrative / Content</label>
                  <textarea 
                    rows={6}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-xs font-medium text-slate-700 leading-relaxed outline-none focus:border-[#002b5c] focus:bg-white transition-all resize-none"
                    value={editingPageData.content}
                    onChange={e => setEditingPageData({...editingPageData, content: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Background Image URL</label>
                   <input 
                    type="text"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all"
                    value={editingPageData.imageUrl}
                    onChange={e => setEditingPageData({...editingPageData, imageUrl: e.target.value})}
                  />
                </div>

                <div className="space-y-6 pt-6 border-t border-slate-50">
                   <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Custom Page Sections</h3>
                    <button 
                      type="button"
                      onClick={() => setEditingPageData({...editingPageData, sections: [...(editingPageData.sections || []), { id: Math.random().toString(36).substr(2, 9), heading: '', body: '', imageUrl: '' }]})}
                      className="text-[10px] font-bold text-blue-600 uppercase hover:underline"
                    >
                      + Add Section Node
                    </button>
                   </div>

                   <div className="grid grid-cols-1 gap-6">
                      {editingPageData.sections?.map((section: any, idx: number) => (
                        <div key={idx} className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 relative group">
                           <button 
                            type="button"
                            onClick={() => {
                              const newSections = [...editingPageData.sections];
                              newSections.splice(idx, 1);
                              setEditingPageData({...editingPageData, sections: newSections});
                            }}
                            className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                           >
                            <Trash2 size={14} />
                           </button>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <input 
                                placeholder="Section Heading"
                                className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c]"
                                value={section.heading}
                                onChange={e => {
                                  const newSections = [...editingPageData.sections];
                                  newSections[idx].heading = e.target.value;
                                  setEditingPageData({...editingPageData, sections: newSections});
                                }}
                              />
                              <input 
                                placeholder="Feature Image (Optional)"
                                className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c]"
                                value={section.imageUrl}
                                onChange={e => {
                                  const newSections = [...editingPageData.sections];
                                  newSections[idx].imageUrl = e.target.value;
                                  setEditingPageData({...editingPageData, sections: newSections});
                                }}
                              />
                           </div>
                           <textarea 
                              placeholder="Section Body Content"
                              rows={3}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:border-[#002b5c] transition-all resize-none"
                              value={section.body}
                              onChange={e => {
                                const newSections = [...editingPageData.sections];
                                newSections[idx].body = e.target.value;
                                setEditingPageData({...editingPageData, sections: newSections});
                              }}
                           />
                        </div>
                      ))}
                   </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-[10px] text-slate-400 font-medium italic">
                    Changes to "{editingPageId}" node will be live globally upon synchronization.
                  </p>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="px-10 py-3.5 bg-[#002b5c] hover:bg-blue-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-900/10 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                    Sync Page Content
                  </button>
                </div>
              </form>
            ) : (
               <div className="p-20 bg-white border border-slate-200 rounded-3xl shadow-sm text-center">
                <p className="text-sm text-slate-400 font-medium mb-6">No data mapping found for the "{editingPageId}" node.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <header className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#002b5c]">Corporate Project Portfolios</h2>
                <p className="text-[10px] text-slate-400 font-medium">Balanagar Engineering Design Core</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setIsAddingProject(!isAddingProject);
                    setEditingProjectId(null);
                    setNewProject({ title: '', category: 'Aerospace Systems', imageUrl: '', description: '', specs: ['', '', ''] });
                  }}
                  className="flex items-center gap-2 bg-[#002b5c] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/10"
                >
                  {isAddingProject ? <ArrowLeft size={16} /> : <Plus size={16} />}
                  {isAddingProject ? 'Back to Archives' : 'Calibrate New Project'}
                </button>
              </div>
            </header>

            {isAddingProject ? (
              <form onSubmit={handleSaveProject} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Project Identifier (Title)</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all"
                      value={newProject.title}
                      onChange={e => setNewProject({...newProject, title: e.target.value})}
                      placeholder="e.g. Advanced Drone Gimbal Assembly"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Industry Vertical</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all"
                      value={newProject.category}
                      onChange={e => setNewProject({...newProject, category: e.target.value})}
                    >
                      <option>Aerospace Systems</option>
                      <option>Defense Tech</option>
                      <option>Mechanical CAD</option>
                      <option>Embedded PCBs</option>
                      <option>Automation PLCs</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Technical Representation (Image URL)</label>
                  <input 
                    type="url"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all"
                    value={newProject.imageUrl}
                    onChange={e => setNewProject({...newProject, imageUrl: e.target.value})}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Project Abstract (Description)</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all resize-none"
                    value={newProject.description}
                    onChange={e => setNewProject({...newProject, description: e.target.value})}
                    placeholder="Provide technical overview of the project scope and outcomes..."
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Parametric Specs (Tag List)</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {newProject.specs.map((spec, idx) => (
                      <input 
                        key={idx}
                        type="text"
                        className="bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-[10px] font-black text-[#002b5c] outline-none focus:border-[#002b5c] focus:bg-white transition-all"
                        value={spec}
                        onChange={e => {
                          const newSpecs = [...newProject.specs];
                          newSpecs[idx] = e.target.value;
                          setNewProject({...newProject, specs: newSpecs});
                        }}
                        placeholder={`Spec ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#002b5c] text-white px-10 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/10 flex items-center gap-2"
                  >
                    {isLoading ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                    {editingProjectId ? 'Update Project Node' : 'Initialize Project Archive'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((p) => (
                  <div key={p.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                    <div className="h-40 w-full relative">
                      <img src={p.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => {
                            setIsAddingProject(true);
                            setEditingProjectId(p.id);
                            setNewProject({
                              title: p.title,
                              category: p.category,
                              imageUrl: p.imageUrl,
                              description: p.description,
                              specs: [...(p.specs || []), '', '', ''].slice(0, 3)
                            });
                          }}
                          className="p-2 bg-white text-blue-600 rounded-lg shadow-lg hover:bg-blue-50 transition-colors"
                        >
                          <PenTool size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-2 bg-white text-red-600 rounded-lg shadow-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-black text-[#002b5c] uppercase tracking-wider shadow-sm">
                        {p.category}
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 className="text-sm font-black text-[#002b5c] uppercase leading-tight">{p.title}</h3>
                      <p className="text-[10px] text-slate-500 font-medium line-clamp-3">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {p.specs?.map((s: string, i: number) => (
                          <span key={i} className="text-[8px] font-bold bg-slate-50 text-slate-400 px-2 py-0.5 rounded border border-slate-100">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 9: TRUST METRICS */}
        {activeTab === 'metrics' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <header className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#002b5c]">Corporate Trust Metrics</h2>
                <p className="text-[10px] text-slate-400 font-medium">Balanagar Facility Performance Indicators</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setIsAddingMetric(!isAddingMetric);
                    setEditingMetricId(null);
                    setNewMetric({ value: '', label: '', desc: '', order: trustMetrics.length });
                  }}
                  className="flex items-center gap-2 bg-[#002b5c] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/10"
                >
                  {isAddingMetric ? <ArrowLeft size={16} /> : <Plus size={16} />}
                  {isAddingMetric ? 'Back to Ledger' : 'Add New Metric'}
                </button>
              </div>
            </header>

            {isAddingMetric ? (
              <form onSubmit={handleSaveMetric} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Metric Value (e.g. 10+)</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all"
                      value={newMetric.value}
                      onChange={e => setNewMetric({...newMetric, value: e.target.value})}
                      placeholder="e.g. 15+"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Display Label</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all"
                      value={newMetric.label}
                      onChange={e => setNewMetric({...newMetric, label: e.target.value})}
                      placeholder="e.g. Years Experience"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Technical Description</label>
                  <textarea 
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all resize-none"
                    value={newMetric.desc}
                    onChange={e => setNewMetric({...newMetric, desc: e.target.value})}
                    placeholder="Provide brief context for this metric..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Display Order (0 is first)</label>
                  <input 
                    type="number"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all"
                    value={newMetric.order}
                    onChange={e => setNewMetric({...newMetric, order: parseInt(e.target.value)})}
                  />
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#002b5c] text-white px-10 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/10 flex items-center gap-2"
                  >
                    {isLoading ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                    {editingMetricId ? 'Update Metric' : 'Save Metric'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trustMetrics.map((m) => (
                  <div key={m.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all group flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-black text-[#002b5c]">{m.value}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#38bdf8] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{m.label}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{m.desc}</p>
                      <div className="mt-4 flex items-center gap-4">
                        <button 
                          onClick={() => {
                            setIsAddingMetric(true);
                            setEditingMetricId(m.id);
                            setNewMetric({
                              value: m.value,
                              label: m.label,
                              desc: m.desc,
                              order: m.order || 0
                            });
                          }}
                          className="text-[10px] font-black uppercase tracking-widest text-[#002b5c] hover:underline flex items-center gap-1"
                        >
                          <PenTool size={12} /> Edit Details
                        </button>
                        <button 
                          onClick={() => handleDeleteMetric(m.id)}
                          className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline flex items-center gap-1"
                        >
                          <Trash2 size={12} /> Delete Node
                        </button>
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-300 font-bold">
                      #{m.order}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 10: SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <header className="mb-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#002b5c]">Global System Configuration</h2>
              <p className="text-[10px] text-slate-400 font-medium">Calibrate operational parameters and support nodes</p>
            </header>

            <div className="max-w-3xl">
              <form onSubmit={handleSaveSiteConfig} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">WhatsApp Support Channel</h3>
                      <p className="text-[10px] text-slate-500 font-medium">Configure the active support line and pre-filled message</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">WhatsApp Phone Number</label>
                      <input 
                        type="text"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all"
                        value={siteConfig.whatsappNumber}
                        onChange={e => setSiteConfig({...siteConfig, whatsappNumber: e.target.value})}
                        placeholder="e.g. 918328903031"
                      />
                      <p className="text-[9px] text-slate-400 px-1">Include country code without '+' or spaces (e.g. 91 for India)</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Active Message Preset</label>
                      <textarea 
                        rows={4}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all resize-none"
                        value={siteConfig.whatsappMessage}
                        onChange={e => setSiteConfig({...siteConfig, whatsappMessage: e.target.value})}
                        placeholder="Default greeting message..."
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                        <Phone size={20} />
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Public Contact Nodes</h3>
                        <p className="text-[10px] text-slate-500 font-medium">Update phone, email and physical address displayed site-wide</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Contact Phone</label>
                        <input 
                          type="text"
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all"
                          value={siteConfig.contactPhone}
                          onChange={e => setSiteConfig({...siteConfig, contactPhone: e.target.value})}
                          placeholder="e.g. 8187044238"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Contact Email</label>
                        <input 
                          type="email"
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all"
                          value={siteConfig.contactEmail}
                          onChange={e => setSiteConfig({...siteConfig, contactEmail: e.target.value})}
                          placeholder="e.g. hasanthengg@gmail.com"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Full Physical Address</label>
                        <textarea 
                          rows={2}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all resize-none"
                          value={siteConfig.contactAddress}
                          onChange={e => setSiteConfig({...siteConfig, contactAddress: e.target.value})}
                          placeholder="Enter full registered address..."
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Short Address (City/Area)</label>
                        <input 
                          type="text"
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all"
                          value={siteConfig.contactAddressShort}
                          onChange={e => setSiteConfig({...siteConfig, contactAddressShort: e.target.value})}
                          placeholder="e.g. Kukatpally, Hyderabad"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#002b5c] text-white px-10 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/10 flex items-center gap-2"
                  >
                    {isLoading ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                    Update Global Config
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        </main>
      </div>
    </div>
  );
}

