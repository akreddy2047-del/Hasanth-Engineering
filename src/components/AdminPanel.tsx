import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, CheckCircle, Trash2, Plus, Briefcase, FileText, Mail, Phone,
  MapPin, Clock, Calendar, Shield, LogOut, ChevronRight, RefreshCw, AlertCircle, Download, Zap, PenTool, ArrowLeft,
  Share2, Link, Check, Twitter, Linkedin, Radio, CheckCircle2, ExternalLink, Activity, Search, Globe, User,
  BarChart, Settings, MessageCircle, Save, Layers, Cpu, Bot, Compass, ShieldAlert, Hammer, FlaskConical, Network
} from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { pingGoogleSearchConsole } from '../utils/searchConsolePing';
import HasanthLogo from './HasanthLogo';

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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'divisions' | 'jobs' | 'applications' | 'enquiries' | 'blogs' | 'projects' | 'content' | 'metrics' | 'settings' | 'research'>('dashboard');
  
  // Divisions & Machines Management State
  const [divisions, setDivisions] = useState<any[]>([]);
  const [isAddingDivision, setIsAddingDivision] = useState(false);
  const [editingDivisionId, setEditingDivisionId] = useState<string | null>(null);
  const [newDivision, setNewDivision] = useState<any>({
    title: '',
    desc: '',
    icon: 'Settings',
    badge: 'ISO-9001 COMPLIANT',
    color: 'from-blue-600 to-indigo-600',
    order: 1,
    bulletPoints: [], // array of { label: '', desc: '' }
    machines: [] // array of { name: '', desc: '', imageUrl: '' }
  });
  
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

  // Research Management State
  const [researchCards, setResearchCards] = useState<any[]>([]);
  const [isAddingResearch, setIsAddingResearch] = useState(false);
  const [editingResearchId, setEditingResearchId] = useState<string | null>(null);
  const [newResearch, setNewResearch] = useState({
    title: '',
    desc: '',
    imageUrl: '',
    iconName: 'Cpu'
  });

  // Loading & Action States
  const [isLoading, setIsLoading] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
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
      
      const unsubDivisions = onSnapshot(query(collection(db, 'divisions'), orderBy('order', 'asc')), (snapshot) => {
        setDivisions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setIsLoading(false);
      }, (error) => handleFirestoreError(error, OperationType.LIST, 'divisions'));

      const unsubResearch = onSnapshot(query(collection(db, 'research'), orderBy('timestamp', 'desc')), (snapshot) => {
        setResearchCards(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setIsLoading(false);
      }, (error) => handleFirestoreError(error, OperationType.LIST, 'research'));

      return () => {
        unsubEnquiries();
        unsubJobs();
        unsubApps();
        unsubBlogs();
        unsubProjects();
        unsubPageContent();
        unsubMetrics();
        unsubConfig();
        unsubDivisions();
        unsubResearch();
      };
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (activeTab === 'content') {
      const currentId = editingPageId || 'home';
      if (!editingPageId) {
        setEditingPageId('home');
      }
      const page = pageContent.find(p => p.id === currentId);
      if (page) {
        setEditingPageData({
          title: page.title || '',
          subtitle: page.subtitle || '',
          content: page.content || '',
          imageUrl: page.imageUrl || '',
          sections: page.sections || []
        });
      } else {
        setEditingPageData({
          title: '',
          subtitle: '',
          content: '',
          imageUrl: '',
          sections: []
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

  // Add or Update job
  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.type || !newJob.location || !newJob.desc) {
      showToast('Form Incomplete', 'Please fill in all core position parameters.', 'warning');
      return;
    }

    try {
      const skillsArray = typeof newJob.skills === 'string'
        ? newJob.skills.split(',').map((s: string) => s.trim()).filter(Boolean)
        : Array.isArray(newJob.skills) ? newJob.skills : [];

      if (editingJobId) {
        await updateDoc(doc(db, 'jobs', editingJobId), {
          title: newJob.title,
          type: newJob.type,
          location: newJob.location,
          exp: newJob.exp,
          desc: newJob.desc,
          skills: skillsArray,
          lastUpdated: serverTimestamp()
        });
        showToast('Position Updated', `"${newJob.title}" has been updated in vacancy nodes.`, 'success');
        setEditingJobId(null);
      } else {
        await addDoc(collection(db, 'jobs'), {
          title: newJob.title,
          type: newJob.type,
          location: newJob.location,
          exp: newJob.exp,
          desc: newJob.desc,
          skills: skillsArray,
          timestamp: serverTimestamp()
        });
        showToast('Position Loaded', `"${newJob.title}" added to active vacancy nodes.`, 'success');
      }
      setNewJob({ title: '', type: '', location: '', exp: '', desc: '', skills: '' });
    } catch (error) {
      console.error(error);
      showToast('Action Failed', 'Firestore write rejected', 'warning');
    }
  };

  // Start Edit vacancy
  const handleStartEditJob = (job: any) => {
    setEditingJobId(job.id);
    setNewJob({
      title: job.title || '',
      type: job.type || '',
      location: job.location || '',
      exp: job.exp || '',
      desc: job.desc || '',
      skills: Array.isArray(job.skills) ? job.skills.join(', ') : (job.skills || '')
    });
    const formElement = document.getElementById('job-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cancel Edit vacancy
  const handleCancelEditJob = () => {
    setEditingJobId(null);
    setNewJob({ title: '', type: '', location: '', exp: '', desc: '', skills: '' });
    showToast('Edit Cancelled', 'Vacancy modification aborted.', 'info');
  };

  // Delete vacancy (Jobs CRUD)
  const handleDeleteJob = async (jobId: string, title: string) => {
    if (!window.confirm(`Permanently remove the listing for "${title}"?`)) return;
    try {
      await deleteDoc(doc(db, 'jobs', jobId));
      showToast('Vacancy Purged', 'Position removed from recruitment pipeline.', 'success');
      if (editingJobId === jobId) {
        setEditingJobId(null);
        setNewJob({ title: '', type: '', location: '', exp: '', desc: '', skills: '' });
      }
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

  const handleSaveDivision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDivision.title || !newDivision.desc) {
      showToast('Form incomplete', 'Required fields missing for engineering division.', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const divisionData = {
        title: newDivision.title,
        desc: newDivision.desc,
        icon: newDivision.icon || 'Settings',
        badge: newDivision.badge || 'ISO-9001 COMPLIANT',
        color: newDivision.color || 'from-blue-600 to-indigo-600',
        order: Number(newDivision.order || 1),
        bulletPoints: newDivision.bulletPoints || [],
        machines: newDivision.machines || []
      };

      if (editingDivisionId) {
        const { updateDoc } = await import('firebase/firestore');
        await updateDoc(doc(db, 'divisions', editingDivisionId), divisionData);
        showToast('Division Updated', 'Engineering division successfully re-calibrated.', 'success');
      } else {
        await addDoc(collection(db, 'divisions'), divisionData);
        showToast('Division Added', 'New division node established in infrastructure.', 'success');
      }
      setIsAddingDivision(false);
      setEditingDivisionId(null);
      setNewDivision({
        title: '',
        desc: '',
        icon: 'Settings',
        badge: 'ISO-9001 COMPLIANT',
        color: 'from-blue-600 to-indigo-600',
        order: divisions.length + 1,
        bulletPoints: [],
        machines: []
      });
    } catch (err) {
      console.error(err);
      showToast('Operation Failed', 'Database write aborted.', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDivision = async (divId: string) => {
    if (!window.confirm('Are you sure you want to delete this division? This action is irreversible.')) return;
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, 'divisions', divId));
      showToast('Division Deleted', 'Engineering division node successfully removed.', 'success');
    } catch (err) {
      showToast('Operation Failed', 'Database write aborted.', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeedDivisions = async () => {
    if (divisions.length > 0) {
      showToast('Already populated', 'Divisions collection already exists.', 'info');
      return;
    }
    setIsLoading(true);
    try {
      const defaultDivs = [
        {
          title: 'Mechanical Engineering',
          desc: 'Formulation of high-fidelity parametric 3D models with physical-stress finite-element analyses (FEA) geared for custom sheet-metal and machine-tooled parts.',
          icon: 'Settings',
          badge: 'ISO-9001 COMPLIANT',
          color: 'from-blue-600 to-indigo-600',
          order: 1,
          bulletPoints: [
            { label: '3D CAD Modeling', desc: 'Symmetrical SolidWorks solid parts & multi-sheet components assemblies.', imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
            { label: 'Product Design', desc: 'Comprehensive concept blueprints turned into physically tight assemblies.', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80' },
            { label: 'Reverse Engineering', desc: 'Scan metric mappings transformed into physical production tolerances.', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
            { label: 'Structural Design', desc: 'High strength, low stress structural design frame layouts.', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80' },
            { label: 'Sheet Metal Design', desc: 'Bending schedules, laser layout optimization, and high tolerance folds.', imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80' },
            { label: 'Tool & Fixture Design', desc: 'Specialized physical jigs, inspection guides, and progression sets.', imageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80' },
            { label: 'Manufacturing Support', desc: 'Complete fabrication pathways with on-location CNC setup guidelines.', imageUrl: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80' }
          ],
          machines: [
            { name: 'Precision 5-Axis CNC Milling Machine', desc: 'Aviation-grade Titanium & Aluminum 7075 milling with micron-perfect calibration.', imageUrl: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80' },
            { name: 'High-Speed Fiber Laser Cutter', desc: 'Dynamic laser profiling with automated sheet metal feeding and high-tolerance folds.', imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80' }
          ]
        },
        {
          title: 'Electronics Engineering',
          desc: 'Creation of industrial electronic PCB systems, microprocessor layouts, high-fidelity analog interfaces, and internet-connected devices.',
          icon: 'Cpu',
          badge: 'IPC-A-610 CERTIFIED',
          color: 'from-blue-700 to-cyan-600',
          order: 2,
          bulletPoints: [
            { label: 'PCB Design', desc: 'Controlled impedance, multi-layer RF, and high-frequency digital traces.', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
            { label: 'Embedded Systems Development', desc: 'Bare-metal, low power C/C++ firmware nodes on ARM, STM32, ESP32.', imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80' },
            { label: 'IoT Product Design', desc: 'Low-power end devices integrated with reliable cloud dashboards.', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
            { label: 'Sensor Integration', desc: 'Low noise analog filters, dynamic SPI/I2C buses, and high-grain amplifications.', imageUrl: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=600&q=80' },
            { label: 'Power Electronics', desc: 'High-efficiency buck converters, motor controllers, and smart fuse paths.', imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80' },
            { label: 'Industrial Control Systems', desc: 'Opto-isolated interface signals, DIN rail enclosures, and MODBUS nodes.', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80' },
            { label: 'Electronics Prototyping', desc: 'Rapid PCB layout routing, component SMD soldering, and bench check metrics.', imageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80' }
          ],
          machines: [
            { name: 'Automated SMT Pick & Place Machine', desc: 'Controlled impedance layouts with sub-millimeter component pitch solder optimization.', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
            { name: 'Multilayer PCB Reflow Oven', desc: 'Multi-zone convection thermal profiling to prevent thermal bridge shorts.', imageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80' }
          ]
        },
        {
          title: 'Automation & Robotics',
          desc: 'Automated assembly integration, smart robotics nodes, PLC controls, and camera-guided sorting systems to optimize factory layouts.',
          icon: 'Bot',
          badge: 'SCADA CAPABLE',
          color: 'from-indigo-600 to-blue-800',
          order: 3,
          bulletPoints: [
            { label: 'Industrial Automation', desc: 'Centralized plant layout controls and modular automation setups.', imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80' },
            { label: 'PLC Programming', desc: 'Ladder logic development on Siemens, Allen Bradley, and Delta modules.', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
            { label: 'Robotic Systems', desc: 'Pre-program axis coordinate pathways for multi-joint pickerarms.', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80' },
            { label: 'Machine Vision Systems', desc: 'In-line defect checking cameras using smart AI contrast detection.', imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
            { label: 'Smart Factory Solutions', desc: 'Integrated Industrial Internet of Things (IIoT) monitoring setups.', imageUrl: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80' }
          ],
          machines: [
            { name: '6-Axis Robotic Arm Assembly', desc: 'Coordinate pathway programming for high-speed pick and place operations.', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80' },
            { name: 'Siemens PLC Training Rig', desc: 'Ladder logic testing systems and human machine interface (HMI) nodes.', imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' }
          ]
        },
        {
          title: 'UAV & Drone Technologies',
          desc: 'Advanced autonomous aerial structures, drone setups, payload integrations, and surveillance system components built to strict design standards.',
          icon: 'Compass',
          badge: 'DGCA COMPLIANT ASSURANCE',
          color: 'from-blue-600 to-sky-600',
          order: 4,
          bulletPoints: [
            { label: 'Drone Design', desc: 'High structural integrity carbon fiber frames with optimized aeromechanics.', imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80' },
            { label: 'Flight Control Integration', desc: 'ArduPilot, PX4 payload tuning with fail-safe telemetry routing.', imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80' },
            { label: 'Payload Development', desc: 'Gimbal assemblies, custom multispectral sensors, and releases.', imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80' },
            { label: 'Surveillance Systems', desc: 'Live long-range visual telemetry feedback with military-grade encryption.', imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80' },
            { label: 'Agricultural Drone Solutions', desc: 'Liquid spray drone setups, multi-hectare flight optimization curves.', imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=600&q=80' }
          ],
          machines: [
            { name: 'Carbon Fiber CNC Cutter', desc: 'Specialized diamond routing of ultra-rigid carbon fiber aerospace frames.', imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80' },
            { name: '915MHz RF Signal Analyzers', desc: 'Frequency Hopping (FHSS) telemetry analysis and signal tracking.', imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80' }
          ]
        },
        {
          title: 'Aerospace Engineering',
          desc: 'Highly calibrated structural analyses, airframe component configurations, and maintenance support for commercial and private aviation parts.',
          icon: 'Layers',
          badge: 'AS9100 STANDARDS',
          color: 'from-blue-900 to-blue-750',
          order: 5,
          bulletPoints: [
            { label: 'Aircraft Component Design', desc: 'Aviation brackets, ducts, flaps, and structural component modeling.', imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=600&q=80' },
            { label: 'CAD & CAE Analysis', desc: 'Linear structural stresses, vibration sweeps, and fatigue lifetime margins.', imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80' },
            { label: 'Aerospace Manufacturing Support', desc: 'Strategic assembly material planning and inspection templates.', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80' },
            { label: 'Maintenance Engineering Support', desc: 'Repair coordinate drawings and system overhaul diagnostic reviews.', imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
            { label: 'Structural Analysis', desc: 'High-strength shear margins, buckle margins, and lightweight optimizations.', imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80' }
          ],
          machines: [
            { name: 'Fatigue & Tensile Tester', desc: 'High-precision mechanical load fatigue checkers to AS9100 standard.', imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80' },
            { name: 'High-Altitude Thermal Vacuum Chamber', desc: 'Simulated atmospheric and pressure changes for structural calibrations.', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' }
          ]
        },
        {
          title: 'Defense Technologies',
          desc: 'Rigorous engineering solutions for high-spec defense requirements, focusing on rugged electronics, electro-mechanical devices, and rapid physical prototypes.',
          icon: 'ShieldAlert',
          badge: 'MIL-STD COMPLIANT',
          color: 'from-blue-950 to-indigo-900',
          order: 6,
          bulletPoints: [
            { label: 'Surveillance Systems', desc: 'Ultra-low latency night vision, radio frequency scanners, and track solutions.', imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80' },
            { label: 'Sensor Fusion Solutions', desc: 'Coordinated GPS, IMUs, laser sensors mapping to a single output.', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
            { label: 'UAV Payload Systems', desc: 'Rugged release relays, payload enclosures, and remote controls.', imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80' },
            { label: 'Electro-Mechanical Systems', desc: 'Mil-spec actuator packages, drive gear matrices, and isolation cases.', imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
            { label: 'Advanced Engineering Prototypes', desc: 'Solderable mil-connectors, heavy shock housings, and physical test jigs.', imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80' }
          ],
          machines: [
            { name: 'Military Ruggedness Shake Table', desc: 'Severe shock and vibrations simulation verifying structural rigidity.', imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80' },
            { name: 'Low-Latency Electro-Optical Camera Rig', desc: 'Calibrated night-vision thermal camera stabilization sensors.', imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80' }
          ]
        }
      ];

      for (const div of defaultDivs) {
        await addDoc(collection(db, 'divisions'), div);
      }
      showToast('Seeding Succeeded', 'Default divisions and machine datasets deployed.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Seeding Failed', 'Database could not write divisions default set.', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  // Seed Research Cards Handlers
  const seedResearchCards = async () => {
    setIsLoading(true);
    try {
      const defaultResearch = [
        {
          title: 'AI Integrated Engineering Systems',
          desc: 'Applying machine learning algorithms to structural stress analysis and thermal models, reducing numerical compute convergence times by up to 60%.',
          iconName: 'Cpu',
          imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
        },
        {
          title: 'Autonomous UAV Technologies',
          desc: 'Highly customized aerodynamic drones featuring fail-safe path finding under conditions with restricted GPS signals.',
          iconName: 'Compass',
          imageUrl: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=800'
        },
        {
          title: 'Smart Sensor Networks',
          desc: 'Highly rugged sensor nodes linked in industrial mesh arrays to observe power grids and high-temperature machinery locations.',
          iconName: 'Network',
          imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
        },
        {
          title: 'Defense Electronics',
          desc: 'Mil-spec multi-layer hardware architectures capable of operating under high electro-static discharge (ESD) and high thermal vibration parameters.',
          iconName: 'Shield',
          imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'
        },
        {
          title: 'Industrial IoT Solutions',
          desc: 'Low-latency telemetry and DIN-rail SCADA configurations streaming diagnostic logs in real-time.',
          iconName: 'HardDrive',
          imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010bb031cc?auto=format&fit=crop&q=80&w=800'
        },
        {
          title: 'Aerospace Manufacturing Support',
          desc: 'Researching multi-axis additive laser paths to minimize manufacturing waste of titanium alloy aircraft brackets.',
          iconName: 'Layers',
          imageUrl: 'https://images.unsplash.com/photo-1502473775464-9694c96572e9?auto=format&fit=crop&q=80&w=800'
        }
      ];

      for (const item of defaultResearch) {
        await addDoc(collection(db, 'research'), {
          ...item,
          timestamp: serverTimestamp()
        });
      }
      showToast('Seeding Succeeded', 'Default research innovation cards deployed.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Seeding Failed', 'Database could not write research focus areas.', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  // Save or Update Research Focus Area
  const handleSaveResearchCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResearch.title || !newResearch.desc || !newResearch.imageUrl) {
      showToast('Missing Parameters', 'All fields except icon are required.', 'warning');
      return;
    }
    setIsLoading(true);
    try {
      const cardData = {
        title: newResearch.title,
        desc: newResearch.desc,
        imageUrl: newResearch.imageUrl,
        iconName: newResearch.iconName || 'Cpu',
        timestamp: serverTimestamp()
      };

      if (editingResearchId) {
        await updateDoc(doc(db, 'research', editingResearchId), cardData);
        showToast('Position Updated', `Research card "${newResearch.title}" has been updated.`, 'success');
        setEditingResearchId(null);
      } else {
        await addDoc(collection(db, 'research'), cardData);
        showToast('Position Loaded', `Research card "${newResearch.title}" has been added.`, 'success');
      }
      setNewResearch({ title: '', desc: '', imageUrl: '', iconName: 'Cpu' });
      setIsAddingResearch(false);
    } catch (err) {
      console.error(err);
      showToast('Action Failed', 'Failed to write research card to Firestore.', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Research Focus Area
  const handleDeleteResearchCard = async (cardId: string, cardTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete research focus area "${cardTitle}"?`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'research', cardId));
      showToast('Vacancy Purged', 'Research focus area removed successfully.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Action Failed', 'Failed to delete research card.', 'warning');
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
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 sm:p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[650px] bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 flex flex-col md:flex-row min-h-[380px]"
        >
          {/* Left Panel: Company Details */}
          <div className="md:w-5/12 bg-[#002b5c] p-6 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-black/30 pointer-events-none" />
            
            <div className="relative z-10 space-y-4 my-auto text-center md:text-left flex flex-col items-center md:items-start">
              <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md inline-block">
                <HasanthLogo size={40} className="text-white" />
              </div>
              <div className="space-y-1">
                <h2 className="text-sm font-black tracking-tight leading-tight uppercase !text-white text-white">
                  Hasanth Engineering
                </h2>
                <p className="text-[9px] font-black tracking-widest text-blue-200/80 uppercase">
                  Pvt Ltd
                </p>
                <p className="text-[10px] text-white/70 leading-relaxed font-semibold max-w-[180px] md:max-w-none">
                  Corporate administrative portal. Authenticate to establish your session credentials.
                </p>
              </div>
            </div>
            
            <div className="relative z-10 border-t border-white/10 pt-3 hidden md:block">
              <p className="text-[8px] text-white/40 font-bold uppercase tracking-wider">
                © {new Date().getFullYear()} Hasanth Engg
              </p>
            </div>
          </div>

          {/* Right Panel: Login Details */}
          <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-center space-y-5">
            <div className="space-y-1">
              <h3 className="text-sm font-black text-[#002b5c] uppercase tracking-wider">
                Admin Sign In
              </h3>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Authorized Credentials Only
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider px-0.5">
                  Email Identifier
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#002b5c] transition-colors" size={14} />
                  <input 
                    type="email"
                    required
                    value={email}
                    placeholder="admin@hasanthenginnering.co.in"
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-slate-800 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider px-0.5">
                  Security Key
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#002b5c] transition-colors" size={14} />
                  <input 
                    type="password"
                    required
                    value={password}
                    placeholder="••••••••"
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-slate-800 transition-all shadow-inner"
                  />
                </div>
              </div>

              {loginError && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-2.5 bg-red-50 border border-red-100 rounded-xl text-[9px] text-red-600 font-bold uppercase tracking-wider"
                >
                  <AlertCircle size={12} className="shrink-0" />
                  <span>{loginError}</span>
                </motion.div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 mt-2 bg-[#002b5c] hover:bg-blue-800 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? <RefreshCw className="animate-spin" size={12} /> : <span>Sign In to Console</span>}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-900 overflow-hidden">
      {/* Professional Sidebar */}
      <aside className="w-72 bg-[#0f172a] text-slate-300 flex flex-col flex-shrink-0 border-r border-slate-800 shadow-2xl z-50">
        <div className="p-8 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-[#002b5c] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-sm font-black text-white tracking-tighter uppercase leading-none">Management</h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">HASANTH ENGG</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
          <div className="space-y-1.5">
            <h3 className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Overview</h3>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === 'dashboard' 
                ? 'bg-blue-600/10 text-blue-400 font-bold' 
                : 'hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Activity size={18} className={activeTab === 'dashboard' ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="text-xs tracking-tight">System Dashboard</span>
              {activeTab === 'dashboard' && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />}
            </button>
          </div>

          <div className="space-y-1.5">
            <h3 className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Communication</h3>
            <button 
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === 'enquiries' ? 'bg-blue-600/10 text-blue-400 font-bold' : 'hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Mail size={18} className={activeTab === 'enquiries' ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="text-xs tracking-tight">Contact Messages</span>
              <span className="ml-auto text-[10px] font-black bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 group-hover:text-white">{enquiries.length}</span>
            </button>
            <button 
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === 'applications' ? 'bg-blue-600/10 text-blue-400 font-bold' : 'hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <FileText size={18} className={activeTab === 'applications' ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="text-xs tracking-tight">Candidate Resumes</span>
              <span className="ml-auto text-[10px] font-black bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 group-hover:text-white">{applications.length}</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <h3 className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Site Content</h3>
            <button 
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === 'content' ? 'bg-blue-600/10 text-blue-400 font-bold' : 'hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Globe size={18} className={activeTab === 'content' ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="text-xs tracking-tight">Page Modules</span>
            </button>
            <button 
              onClick={() => setActiveTab('divisions')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === 'divisions' ? 'bg-blue-600/10 text-blue-400 font-bold' : 'hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Layers size={18} className={activeTab === 'divisions' ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="text-xs tracking-tight">Divisions & Machines</span>
            </button>
            <button 
              onClick={() => setActiveTab('research')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === 'research' ? 'bg-blue-600/10 text-blue-400 font-bold' : 'hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <FlaskConical size={18} className={activeTab === 'research' ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="text-xs tracking-tight">Research & Innovation</span>
            </button>
            <button 
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === 'blogs' ? 'bg-blue-600/10 text-blue-400 font-bold' : 'hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <PenTool size={18} className={activeTab === 'blogs' ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="text-xs tracking-tight">Tech Journals</span>
            </button>
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === 'jobs' ? 'bg-blue-600/10 text-blue-400 font-bold' : 'hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Briefcase size={18} className={activeTab === 'jobs' ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="text-xs tracking-tight">Job Openings</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <h3 className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Configuration</h3>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === 'settings' ? 'bg-blue-600/10 text-blue-400 font-bold' : 'hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Settings size={18} className={activeTab === 'settings' ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="text-xs tracking-tight">Contact Settings</span>
            </button>
          </div>
        </nav>

        <div className="p-6 border-t border-slate-800/50 bg-slate-900/30">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 bg-slate-800/50 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all border border-slate-700/50 hover:border-red-500/20"
          >
            <LogOut size={14} /> Terminate Session
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden bg-[#f8fafc]">
        <header className="h-20 border-b border-slate-200 flex items-center justify-between px-10 bg-white shadow-sm z-10">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              {activeTab === 'dashboard' && <Activity size={20} className="text-[#002b5c]" />}
              {activeTab === 'divisions' && <Layers size={20} className="text-[#002b5c]" />}
              {activeTab === 'research' && <FlaskConical size={20} className="text-[#002b5c]" />}
              {activeTab === 'jobs' && <Briefcase size={20} className="text-[#002b5c]" />}
              {activeTab === 'applications' && <FileText size={20} className="text-[#002b5c]" />}
              {activeTab === 'enquiries' && <Mail size={20} className="text-[#002b5c]" />}
              {activeTab === 'blogs' && <PenTool size={20} className="text-[#002b5c]" />}
              {activeTab === 'projects' && <Zap size={20} className="text-[#002b5c]" />}
              {activeTab === 'content' && <Globe size={20} className="text-[#002b5c]" />}
              {activeTab === 'metrics' && <BarChart size={20} className="text-[#002b5c]" />}
              {activeTab === 'settings' && <Settings size={20} className="text-[#002b5c]" />}
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight uppercase leading-none">
                {activeTab === 'dashboard' && 'System Overview'}
                {activeTab === 'divisions' && 'Divisions & Machine Assets'}
                {activeTab === 'research' && 'Research & Innovation'}
                {activeTab === 'jobs' && 'Vacancy Pipeline'}
                {activeTab === 'applications' && 'Candidate Ledger'}
                {activeTab === 'enquiries' && 'Inquiry Records'}
                {activeTab === 'blogs' && 'Tech Journals'}
                {activeTab === 'projects' && 'Project Folios'}
                {activeTab === 'content' && 'Page Modules'}
                {activeTab === 'metrics' && 'Trust Metrics'}
                {activeTab === 'settings' && 'Platform Settings'}
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1.5">
                HASANTH ENGINEERING • BALANAGAR HUB
              </p>
            </div>
          </div>
          <button 
            onClick={() => window.open('/', '_blank')}
            className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border border-slate-200"
          >
            <ExternalLink size={14} /> View Live App
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-10 bg-[#f8fafc]">
          <div className="max-w-6xl mx-auto space-y-12 pb-20">
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Mail size={24} />
                      </div>
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">Live</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">{enquiries.length}</h3>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Messages</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <FileText size={24} />
                      </div>
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">Inbox</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">{applications.length}</h3>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Resumes</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
                        <Globe size={24} />
                      </div>
                      <span className="text-[10px] font-black text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">Active</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">{pageContent.length}</h3>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Page Modules</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Briefcase size={24} />
                      </div>
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Open</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">{jobs.length}</h3>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Open Jobs</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.15em]">Site Operations Pulse</h3>
                      <Activity size={14} className="text-[#002b5c]" />
                    </div>
                    <div className="p-8">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <div className="flex-1">
                            <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">Main Infrastructure Status</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Site is live and running well • Real-time sync active</p>
                          </div>
                          <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase">Online</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <div className="flex-1">
                            <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">Cloud Storage Performance</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Database integrity verified for all collections</p>
                          </div>
                          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">100% HEALTH</span>
                        </div>
                        <div className="pt-4 border-t border-slate-50">
                          <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                            <div className="flex-1">
                              <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">Admin Console Intelligence</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Updates from this console are reflected across site modules</p>
                            </div>
                            <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full uppercase">Synced</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#002b5c] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-[#002b5c]/20">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                      <Shield size={120} />
                    </div>
                    <div className="relative z-10 space-y-6">
                      <div className="space-y-1">
                        <h3 className="text-lg font-black tracking-tight uppercase">Admin Console</h3>
                        <p className="text-[10px] font-bold text-blue-300 uppercase tracking-[0.2em]">Operational Summary</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-white/10">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Active Pages</span>
                          <span className="text-sm font-black">{pageContent.length} Modules</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-white/10">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Tech Articles</span>
                          <span className="text-sm font-black">{blogs.length} Logs</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-white/10">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Active Pipeline</span>
                          <span className="text-sm font-black">{jobs.length} Positions</span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <p className="text-[10px] leading-relaxed text-blue-100 font-medium italic">
                          "All modifications applied within this console are immediately transmitted to the frontend registry for live site reflection."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          
            {/* TAB 1: VACANCIES */}
            {activeTab === 'jobs' && (
            <div className="space-y-10 animate-in fade-in duration-500">
              
              {/* Position Creator Document */}
              <section id="job-form-section" className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-900">
                    {editingJobId ? 'Edit Job Opening' : 'Add New Job Opening'}
                  </h2>
                  {editingJobId && (
                    <button 
                      type="button" 
                      onClick={handleCancelEditJob}
                      className="text-[10px] font-black text-red-500 hover:text-red-700 uppercase tracking-widest cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div className="p-8 space-y-8">
                  {/* Template Quick Select */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Blueprint Templates</p>
                    <div className="flex flex-wrap gap-2">
                      {JOB_TEMPLATES.map((tmpl) => (
                        <button
                          key={tmpl.name}
                          type="button"
                          onClick={() => handleLoadTemplate(tmpl)}
                          className="px-4 py-2 border border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-xl transition-all text-xs font-bold text-slate-600 bg-slate-50/50 hover:bg-blue-50"
                        >
                          {tmpl.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" />

                  <form onSubmit={handleAddJob} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-1">Job Title</label>
                        <input type="text" required value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})}
                          placeholder="e.g. Mechanical Designer"
                          className="w-full bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white focus:outline-none rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-1">Job Type</label>
                        <input type="text" required value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}
                          placeholder="e.g. Full-Time"
                          className="w-full bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white focus:outline-none rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-1">Location</label>
                        <input type="text" required value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})}
                          placeholder="Hyderabad"
                          className="w-full bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white focus:outline-none rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-1">Experience</label>
                        <input type="text" value={newJob.exp} onChange={e => setNewJob({...newJob, exp: e.target.value})}
                          placeholder="e.g. 2+ Years"
                          className="w-full bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white focus:outline-none rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 transition-all" />
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
                      <div className="flex gap-3">
                        {editingJobId && (
                          <button 
                            type="button"
                            onClick={handleCancelEditJob}
                            className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                        <button 
                          type="submit"
                          className="px-10 bg-[#002b5c] hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition-all shadow-lg active:scale-[0.98]"
                        >
                          {editingJobId ? 'Update Vacancy' : 'Publish Vacancy'}
                        </button>
                      </div>
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
                        <div className="flex items-center gap-1.5">
                          <button 
                            onClick={() => handleStartEditJob(job)}
                            className={`p-2 rounded-lg transition-all ${
                              editingJobId === job.id 
                                ? 'text-blue-600 bg-blue-50' 
                                : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                            title="Edit vacancy parameters"
                          >
                            <PenTool size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteJob(job.id, job.title)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Purge vacancy listing"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">CANDIDATE LEDGER</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Verified entries in the recruitment pipeline</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <Activity size={14} className="text-blue-500" />
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{applications.length} Records</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {applications.length === 0 ? (
                  <div className="py-24 border-2 border-dashed border-slate-200 rounded-3xl text-center bg-slate-50/50">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4 shadow-sm border border-slate-100">
                      <FileText size={32} />
                    </div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">No candidates logged</p>
                  </div>
                ) : (
                  applications.map((app) => (
                    <div key={app.id} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                        <div className="w-16 h-16 bg-slate-50 flex items-center justify-center rounded-2xl text-slate-400 shrink-0 border border-slate-100 shadow-inner group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                          <User size={28} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                            <div>
                              <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none mb-2 uppercase">{app.applicantName}</h3>
                              <div className="flex flex-wrap items-center gap-4">
                                <span className="flex items-center gap-1.5 text-xs text-slate-500 font-bold"><Mail size={12} /> {app.applicantEmail}</span>
                                <span className="flex items-center gap-1.5 text-xs text-slate-500 font-bold"><Phone size={12} /> {app.applicantPhone || 'N/A'}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter border border-blue-100">
                                Ref: {app.jobId || 'Embedded/Other'}
                              </span>
                            </div>
                          </div>
                          
                          {app.coverLetter && (
                            <div className="mb-6 text-xs text-slate-600 leading-relaxed font-medium p-5 bg-slate-50/50 rounded-2xl border border-slate-100 italic relative">
                              <span className="absolute -top-3 left-4 text-slate-200 text-4xl font-serif leading-none">“</span>
                              {app.coverLetter}
                            </div>
                          )}

                          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-50">
                            <div className="flex items-center gap-6">
                              {app.resumeData && (
                                <a href={app.resumeData} download={app.resumeName || 'resume'} className="flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 uppercase tracking-widest">
                                  <Download size={14} /> CV Document
                                </a>
                              )}
                              {app.portfolioLink && (
                                <a href={app.portfolioLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">
                                  <Link size={14} /> Portfolio
                                </a>
                              )}
                            </div>
                            <button 
                              onClick={() => handleDeleteApplication(app.id, app.applicantName)}
                              className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              title="Delete Record"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: INQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">INQUIRY RECORDS</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Logged correspondence from external clients</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <MessageCircle size={14} className="text-blue-500" />
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{enquiries.length} Messages</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {enquiries.length === 0 ? (
                  <div className="py-24 border-2 border-dashed border-slate-200 rounded-3xl text-center bg-slate-50/50">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4 shadow-sm border border-slate-100">
                      <Mail size={32} />
                    </div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">No messages currently queued</p>
                  </div>
                ) : (
                  enquiries.map((enq) => (
                    <div key={enq.id} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-start gap-8">
                        <div className="w-16 h-16 bg-slate-50 flex items-center justify-center rounded-2xl text-slate-400 shrink-0 border border-slate-100 shadow-inner group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                          <MessageCircle size={28} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 border-b border-slate-50 pb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-1.5">
                                <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none uppercase">{enq.applicantName || 'Anonymous'}</h3>
                                {enq.type === 'consultation' && (
                                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase rounded-lg border border-indigo-100 tracking-tighter">Consultation</span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 font-bold">{enq.applicantEmail} • {enq.phone || 'No phone'}</p>
                            </div>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                              {enq.timestamp?.toDate ? enq.timestamp.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date Unlogged'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100/50">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Company</p>
                              <p className="text-xs font-bold text-slate-700 truncate">{enq.company || 'N/A'}</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100/50">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Industry</p>
                              <p className="text-xs font-bold text-slate-700 truncate">{enq.industry || 'N/A'}</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100/50">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Service</p>
                              <p className="text-xs font-bold text-slate-700 truncate">{enq.serviceType || 'N/A'}</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100/50">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Timeline</p>
                              <p className="text-xs font-bold text-slate-700 truncate">{enq.executionTimeframe || 'N/A'}</p>
                            </div>
                          </div>

                          <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-blue-600 group-hover:bg-white transition-colors duration-300 shadow-inner">
                            <p className="text-[10px] text-blue-600 font-black uppercase mb-3 tracking-widest flex items-center gap-2">
                              <Zap size={10} /> {enq.subject || 'Message Narrative'}
                            </p>
                            <p className="text-sm text-slate-800 leading-relaxed font-semibold italic">"{enq.message}"</p>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteEnquiry(enq.id, enq.applicantName || 'Anonymous')} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shrink-0">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: BLOGS */}
          {activeTab === 'blogs' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Tech Journals</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Manage technical publications and site articles</p>
                </div>
                <button 
                  onClick={() => setIsAddingBlog(!isAddingBlog)}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all shadow-xl shadow-blue-500/10 ${
                    isAddingBlog ? 'bg-slate-200 text-slate-600 hover:bg-slate-300' : 'bg-gradient-to-r from-blue-600 to-[#002b5c] text-white hover:shadow-blue-500/20'
                  }`}
                >
                  {isAddingBlog ? <ArrowLeft size={16} /> : <Plus size={16} />}
                  {isAddingBlog ? 'Cancel Operation' : 'Create Publication'}
                </button>
              </div>
              
              {isAddingBlog ? (
                <form onSubmit={handleSaveBlog} className="bg-white border border-slate-200 rounded-3xl p-10 shadow-lg space-y-8 animate-in slide-in-from-top-4 duration-500 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-5 text-slate-900"><PenTool size={120} /></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Publication Title *</label>
                      <input
                        type="text"
                        required
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm text-slate-800 font-bold focus:border-blue-500 focus:bg-white outline-none transition-all"
                        placeholder="e.g. Design of High-Speed Telemetry Systems"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Author / Division *</label>
                      <input
                        type="text"
                        required
                        value={newBlog.author}
                        onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm text-slate-800 font-bold focus:border-blue-500 focus:bg-white outline-none transition-all"
                        placeholder="Admin / Tech Dept"
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
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Page Title</label>
                  <input 
                    type="text"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all"
                    value={editingPageData.title}
                    onChange={e => setEditingPageData({...editingPageData, title: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Text Content</label>
                  <textarea 
                    rows={6}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-xs font-medium text-slate-700 leading-relaxed outline-none focus:border-[#002b5c] focus:bg-white transition-all resize-none"
                    value={editingPageData.content}
                    onChange={e => setEditingPageData({...editingPageData, content: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Background Image</label>
                   <input 
                    type="text"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all"
                    value={editingPageData.imageUrl}
                    onChange={e => setEditingPageData({...editingPageData, imageUrl: e.target.value})}
                  />
                </div>

                <div className="space-y-6 pt-6 border-t border-slate-50">
                   <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Page Sections</h3>
                    <button 
                      type="button"
                      onClick={() => setEditingPageData({...editingPageData, sections: [...(editingPageData.sections || []), { id: Math.random().toString(36).substr(2, 9), heading: '', body: '', imageUrl: '' }]})}
                      className="text-[10px] font-bold text-blue-600 uppercase hover:underline"
                    >
                      + Add New Section
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
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#002b5c]">Site Numbers</h2>
                <p className="text-[10px] text-slate-400 font-medium">Show your stats like years of experience</p>
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
                  {isAddingMetric ? 'Back' : 'Add New'}
                </button>
              </div>
            </header>

            {isAddingMetric ? (
              <form onSubmit={handleSaveMetric} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Number (e.g. 10+)</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all"
                      value={newMetric.value}
                      onChange={e => setNewMetric({...newMetric, value: e.target.value})}
                      placeholder="e.g. 15+"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Label</label>
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
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Description</label>
                  <textarea 
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#002b5c] focus:bg-white transition-all resize-none"
                    value={newMetric.desc}
                    onChange={e => setNewMetric({...newMetric, desc: e.target.value})}
                    placeholder="Briefly explain this number..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Order (0 is first)</label>
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
                    {editingMetricId ? 'Update' : 'Save'}
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

        {/* TAB 9.5: ENGINEERING DIVISIONS */}
        {activeTab === 'divisions' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Engineering Divisions & Machine Assets</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Manage corporate engineering divisions, service checklists, and physical machine imagery</p>
              </div>
              <div className="flex gap-3">
                {divisions.length === 0 && (
                  <button 
                    onClick={handleSeedDivisions}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm cursor-pointer"
                  >
                    <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> Seed Defaults
                  </button>
                )}
                {!isAddingDivision && !editingDivisionId && (
                  <button 
                    onClick={() => {
                      setIsAddingDivision(true);
                      setEditingDivisionId(null);
                      setNewDivision({
                        title: '',
                        desc: '',
                        icon: 'Settings',
                        badge: 'ISO-9001 COMPLIANT',
                        color: 'from-blue-600 to-indigo-600',
                        order: divisions.length + 1,
                        bulletPoints: [],
                        machines: []
                      });
                    }}
                    className="flex items-center gap-2 px-5 py-3 bg-[#002b5c] hover:bg-[#002b5c]/90 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md cursor-pointer"
                  >
                    <Plus size={14} /> New Division
                  </button>
                )}
              </div>
            </header>

            {/* FORM VIEW */}
            {(isAddingDivision || editingDivisionId) ? (
              <form onSubmit={handleSaveDivision} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8 max-w-5xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    {editingDivisionId ? 'Re-calibrate Division Node' : 'Establish New Division Node'}
                  </h3>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsAddingDivision(false);
                      setEditingDivisionId(null);
                    }}
                    className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Division Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Mechanical Engineering"
                      value={newDivision.title}
                      onChange={e => setNewDivision({...newDivision, title: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-bold focus:border-blue-500 focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Quality Badge</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. ISO-9001 COMPLIANT"
                        value={newDivision.badge}
                        onChange={e => setNewDivision({...newDivision, badge: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-bold focus:border-blue-500 focus:bg-white transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Display Order</label>
                      <input 
                        type="number" 
                        required
                        min="1"
                        value={newDivision.order}
                        onChange={e => setNewDivision({...newDivision, order: parseInt(e.target.value) || 1})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-bold focus:border-blue-500 focus:bg-white transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Division Description</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Describe the capabilities, standards, and outputs of this division..."
                      value={newDivision.desc}
                      onChange={e => setNewDivision({...newDivision, desc: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-medium focus:border-blue-500 focus:bg-white transition-all outline-none resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Representative Icon</label>
                    <select
                      value={newDivision.icon}
                      onChange={e => setNewDivision({...newDivision, icon: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-bold focus:border-blue-500 focus:bg-white transition-all outline-none"
                    >
                      <option value="Settings">Settings (Mechanical)</option>
                      <option value="Cpu">Cpu (Electronics)</option>
                      <option value="Bot">Bot (Automation & Robotics)</option>
                      <option value="Compass">Compass (UAV & Drone)</option>
                      <option value="Layers">Layers (Aerospace)</option>
                      <option value="ShieldAlert">ShieldAlert (Defense)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Theme Gradient (Tailwind Classes)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. from-blue-600 to-indigo-600"
                      value={newDivision.color}
                      onChange={e => setNewDivision({...newDivision, color: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-bold focus:border-blue-500 focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                {/* DYNAMIC LIST: BULLET POINTS / SERVICES */}
                <div className="space-y-4 border-t border-slate-100 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Division Core Services & Standards</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Checklist items rendered as cards in the division preview</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const currentPoints = newDivision.bulletPoints || [];
                        setNewDivision({
                          ...newDivision,
                          bulletPoints: [...currentPoints, { label: '', desc: '', imageUrl: '' }]
                        });
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                    >
                      <Plus size={12} /> Add Service
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(!newDivision.bulletPoints || newDivision.bulletPoints.length === 0) ? (
                      <div className="p-6 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">No service cards configured yet. Create one to populate your services portfolio.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {newDivision.bulletPoints.map((bp: any, idx: number) => (
                          <div key={idx} className="relative p-5 bg-slate-50/50 rounded-2xl border border-slate-200/65 space-y-3">
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...newDivision.bulletPoints];
                                list.splice(idx, 1);
                                setNewDivision({...newDivision, bulletPoints: list});
                              }}
                              className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Service CARD #{idx + 1}</span>
                            
                            <div className="space-y-3">
                              <input 
                                type="text" 
                                required
                                placeholder="Service Title (e.g. 3D CAD Modeling)"
                                value={bp.label}
                                onChange={e => {
                                  const list = [...newDivision.bulletPoints];
                                  list[idx] = { ...list[idx], label: e.target.value };
                                  setNewDivision({...newDivision, bulletPoints: list});
                                }}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-bold focus:border-blue-500 outline-none"
                              />
                              <textarea 
                                required
                                rows={2}
                                placeholder="Short description of the service metrics or outputs..."
                                value={bp.desc}
                                onChange={e => {
                                  const list = [...newDivision.bulletPoints];
                                  list[idx] = { ...list[idx], desc: e.target.value };
                                  setNewDivision({...newDivision, bulletPoints: list});
                                }}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:border-blue-500 outline-none resize-none"
                              />
                              <input 
                                type="text" 
                                placeholder="Image URL (Unsplash or direct URL) - Optional"
                                value={bp.imageUrl || ''}
                                onChange={e => {
                                  const list = [...newDivision.bulletPoints];
                                  list[idx] = { ...list[idx], imageUrl: e.target.value };
                                  setNewDivision({...newDivision, bulletPoints: list});
                                }}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:border-blue-500 outline-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* DYNAMIC LIST: INDIVIDUAL MACHINES */}
                <div className="space-y-4 border-t border-slate-100 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Related Machine Assets & Equipment</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Listed machines with individual illustrative imagery displayed below core services</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const currentMachines = newDivision.machines || [];
                        setNewDivision({
                          ...newDivision,
                          machines: [...currentMachines, { name: '', desc: '', imageUrl: '' }]
                        });
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                    >
                      <Plus size={12} /> Add Machine
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(!newDivision.machines || newDivision.machines.length === 0) ? (
                      <div className="p-6 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">No machine assets configured for this division yet. Add related equipment below.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {newDivision.machines.map((m: any, idx: number) => (
                          <div key={idx} className="relative p-5 bg-slate-50/50 rounded-2xl border border-slate-200/65 space-y-3">
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...newDivision.machines];
                                list.splice(idx, 1);
                                setNewDivision({...newDivision, machines: list});
                              }}
                              className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Machine Equipment #{idx + 1}</span>
                            
                            <div className="space-y-3">
                              <input 
                                type="text" 
                                required
                                placeholder="Machine Name (e.g. 5-Axis CNC Milling Machine)"
                                value={m.name}
                                onChange={e => {
                                  const list = [...newDivision.machines];
                                  list[idx] = { ...list[idx], name: e.target.value };
                                  setNewDivision({...newDivision, machines: list});
                                }}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-bold focus:border-blue-500 outline-none"
                              />
                              <input 
                                type="text" 
                                required
                                placeholder="Machine Image URL (Unsplash or direct URL)"
                                value={m.imageUrl}
                                onChange={e => {
                                  const list = [...newDivision.machines];
                                  list[idx] = { ...list[idx], imageUrl: e.target.value };
                                  setNewDivision({...newDivision, machines: list});
                                }}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:border-blue-500 outline-none"
                              />
                              <textarea 
                                required
                                rows={2}
                                placeholder="Specs or machine operational description..."
                                value={m.desc}
                                onChange={e => {
                                  const list = [...newDivision.machines];
                                  list[idx] = { ...list[idx], desc: e.target.value };
                                  setNewDivision({...newDivision, machines: list});
                                }}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:border-blue-500 outline-none resize-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* SAVE BUTTONS */}
                <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
                  <button 
                    type="button"
                    onClick={() => {
                      setIsAddingDivision(false);
                      setEditingDivisionId(null);
                    }}
                    className="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Discard Changes
                  </button>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-[#002b5c] hover:bg-[#002b5c]/95 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md cursor-pointer"
                  >
                    <Save size={14} /> {editingDivisionId ? 'Calibrate Node' : 'Establish Node'}
                  </button>
                </div>
              </form>
            ) : (
              /* LIST VIEW */
              <div className="space-y-6 max-w-5xl animate-in fade-in duration-300">
                {divisions.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-6 max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto text-slate-400">
                      <Layers size={28} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-black text-[#002b5c] uppercase tracking-wide">Infrastructure Empty</h3>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">There are no dynamic engineering divisions in the database. Use seed defaults or create a new custom division node.</p>
                    </div>
                    <div className="flex justify-center gap-3 pt-2">
                      <button 
                        onClick={handleSeedDivisions}
                        disabled={isLoading}
                        className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm cursor-pointer"
                      >
                        Seed Default Divisions Set
                      </button>
                      <button 
                        onClick={() => {
                          setIsAddingDivision(true);
                          setNewDivision({
                            title: '',
                            desc: '',
                            icon: 'Settings',
                            badge: 'ISO-9001 COMPLIANT',
                            color: 'from-blue-600 to-indigo-600',
                            order: 1,
                            bulletPoints: [],
                            machines: []
                          });
                        }}
                        className="px-5 py-3 bg-[#002b5c] hover:bg-[#002b5c]/90 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm cursor-pointer"
                      >
                        Add Custom
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {divisions.map((div: any) => {
                      return (
                        <div key={div.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <span className="text-[10px] font-mono font-bold text-white bg-[#002b5c] px-2.5 py-0.5 rounded-full uppercase tracking-widest animate-pulse">
                                {div.badge}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400 font-bold">
                                ORDER #{div.order}
                              </span>
                            </div>

                            <div className="space-y-2">
                              <h3 className="text-base font-black text-[#002b5c] uppercase tracking-wide">
                                {div.title}
                              </h3>
                              <p className="text-xs text-slate-400 leading-relaxed font-semibold line-clamp-3">
                                {div.desc}
                              </p>
                            </div>

                            <div className="flex gap-4 border-t border-slate-100 pt-4">
                              <div className="space-y-0.5">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Core Services</span>
                                <span className="text-xs font-sans font-black text-slate-700">{div.bulletPoints?.length || 0} Cards</span>
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Machine Assets</span>
                                <span className="text-xs font-sans font-black text-[#002b5c]">{div.machines?.length || 0} Equipped</span>
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Icon Class</span>
                                <span className="text-xs font-mono font-bold text-slate-500">{div.icon}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
                            <button
                              onClick={() => {
                                setEditingDivisionId(div.id);
                                setNewDivision({
                                  title: div.title || '',
                                  desc: div.desc || '',
                                  icon: div.icon || 'Settings',
                                  badge: div.badge || 'ISO-9001 COMPLIANT',
                                  color: div.color || 'from-blue-600 to-indigo-600',
                                  order: div.order || 1,
                                  bulletPoints: div.bulletPoints || [],
                                  machines: div.machines || []
                                });
                              }}
                              className="px-4 py-2 hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                            >
                              Edit Profile
                            </button>
                            <button
                              onClick={() => handleDeleteDivision(div.id)}
                              className="px-4 py-2 hover:bg-red-50 hover:border-red-200 border border-slate-200 text-red-500 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 9.8: RESEARCH & INNOVATION */}
        {activeTab === 'research' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Research & Innovation Cards</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Manage technical innovation focus areas, custom imagery, and graphic markers</p>
              </div>
              <div className="flex gap-3">
                {researchCards.length === 0 && (
                  <button 
                    onClick={seedResearchCards}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm cursor-pointer"
                  >
                    <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> Seed Defaults
                  </button>
                )}
                {!isAddingResearch && !editingResearchId && (
                  <button 
                    onClick={() => {
                      setIsAddingResearch(true);
                      setEditingResearchId(null);
                      setNewResearch({ title: '', desc: '', imageUrl: '', iconName: 'Cpu' });
                    }}
                    className="flex items-center gap-2 px-5 py-3 bg-[#002b5c] hover:bg-blue-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md cursor-pointer"
                  >
                    <Plus size={14} /> Add Focus Area
                  </button>
                )}
              </div>
            </header>

            {(isAddingResearch || editingResearchId) ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    {editingResearchId ? `Edit Focus Area: ${newResearch.title}` : 'Create Research Focus Area'}
                  </h3>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsAddingResearch(false);
                      setEditingResearchId(null);
                    }}
                    className="text-xs text-slate-400 hover:text-slate-600 font-bold uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveResearchCard} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Title</label>
                      <input 
                        type="text"
                        required
                        value={newResearch.title}
                        onChange={e => setNewResearch({ ...newResearch, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-xs font-bold text-slate-800 transition-all"
                        placeholder="e.g. AI Integrated Engineering Systems"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Marker Icon</label>
                      <select 
                        value={newResearch.iconName}
                        onChange={e => setNewResearch({ ...newResearch, iconName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-xs font-bold text-slate-800 transition-all"
                      >
                        <option value="Cpu">Cpu (AI / Tech)</option>
                        <option value="Compass">Compass (Navigation / UAV)</option>
                        <option value="Shield">Shield (Defense / Security)</option>
                        <option value="Radio">Radio (IoT / Telemetry)</option>
                        <option value="Activity">Activity (Diagnostics / Sensors)</option>
                        <option value="Sparkles">Sparkles (AI / Innovation)</option>
                        <option value="Layers">Layers (Aerospace / Material)</option>
                        <option value="HardDrive">HardDrive (Infrastructure)</option>
                        <option value="Network">Network (Smart Grids)</option>
                        <option value="FlaskConical">FlaskConical (Lab Science)</option>
                        <option value="Hammer">Hammer (Manufacturing)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Background Image URL</label>
                    <input 
                      type="url"
                      required
                      value={newResearch.imageUrl}
                      onChange={e => setNewResearch({ ...newResearch, imageUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-xs font-bold text-slate-800 transition-all"
                      placeholder="e.g. https://images.unsplash.com/photo-..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Detailed Description</label>
                    <textarea 
                      required
                      rows={4}
                      value={newResearch.desc}
                      onChange={e => setNewResearch({ ...newResearch, desc: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#002b5c] focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-xs font-bold text-slate-800 transition-all"
                      placeholder="Describe the research direction, outcomes, and computational savings..."
                    />
                  </div>

                  <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingResearch(false);
                        setEditingResearchId(null);
                      }}
                      className="px-5 py-3 hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-3 bg-[#002b5c] hover:bg-blue-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" /> Writing...
                        </>
                      ) : (
                        <>
                          <Save size={14} /> Commit Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {researchCards.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center max-w-xl mx-auto space-y-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto">
                      <FlaskConical size={28} />
                    </div>
                    <h3 className="text-base font-black text-slate-800 uppercase tracking-tight">Empty Database</h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                      There are no custom research focus areas in the database. Use seed defaults to populate immediately or click Add Focus Area.
                    </p>
                    <div className="pt-2">
                      <button 
                        onClick={seedResearchCards}
                        disabled={isLoading}
                        className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
                      >
                        <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> Seed Focus Areas
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {researchCards.map((card: any) => {
                      return (
                        <div key={card.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-all">
                          <div className="space-y-4">
                            <div className="h-32 rounded-2xl overflow-hidden relative">
                              <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
                              <div className="absolute top-3 left-3 px-3 py-1.5 bg-[#002b5c] text-white rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                                <span>{card.iconName}</span>
                              </div>
                            </div>
                            <h4 className="text-sm font-black text-[#002b5c] uppercase tracking-tight">{card.title}</h4>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-3">{card.desc}</p>
                          </div>

                          <div className="flex justify-end gap-2 border-t border-slate-50 pt-4 mt-6">
                            <button
                              onClick={() => {
                                setEditingResearchId(card.id);
                                setNewResearch({
                                  title: card.title || '',
                                  desc: card.desc || '',
                                  imageUrl: card.imageUrl || '',
                                  iconName: card.iconName || 'Cpu'
                                });
                              }}
                              className="px-3 py-2 hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                            >
                              Edit Info
                            </button>
                            <button
                              onClick={() => handleDeleteResearchCard(card.id, card.title)}
                              className="px-3 py-2 hover:bg-red-50 hover:border-red-200 border border-slate-200 text-red-500 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 10: SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">PLATFORM CONFIGURATION</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Calibrate operational support parameters and contact nodes</p>
            </header>

            <form onSubmit={handleSaveSiteConfig} className="max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Support Nodes</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Direct communication channels</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Primary Hotline</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input 
                        type="text" 
                        value={siteConfig.contactPhone}
                        onChange={e => setSiteConfig({...siteConfig, contactPhone: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm text-slate-800 font-bold focus:border-blue-500 focus:bg-white transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Official Registry Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input 
                        type="text" 
                        value={siteConfig.contactEmail}
                        onChange={e => setSiteConfig({...siteConfig, contactEmail: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm text-slate-800 font-bold focus:border-blue-500 focus:bg-white transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">WhatsApp Integration Number</label>
                    <div className="relative group">
                      <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input 
                        type="text" 
                        value={siteConfig.whatsappNumber}
                        onChange={e => setSiteConfig({...siteConfig, whatsappNumber: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm text-slate-800 font-bold focus:border-blue-500 focus:bg-white transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Balanagar Hub</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Physical facility location</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Operational Address (Long Form)</label>
                    <textarea 
                      rows={3}
                      value={siteConfig.contactAddress}
                      onChange={e => setSiteConfig({...siteConfig, contactAddress: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm text-slate-800 font-bold focus:border-blue-500 focus:bg-white transition-all outline-none resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Display Location (Short)</label>
                    <input 
                      type="text" 
                      value={siteConfig.contactAddressShort}
                      onChange={e => setSiteConfig({...siteConfig, contactAddressShort: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm text-slate-800 font-bold focus:border-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="e.g. Balanagar, Hyderabad"
                    />
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-[#002b5c] text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      {isLoading ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
                      Update Registry
                    </button>
                  </div>
                </div>
              </section>
            </form>
          </div>
        )}
      </div>
    </div>
  </main>
</div>
  );
}

