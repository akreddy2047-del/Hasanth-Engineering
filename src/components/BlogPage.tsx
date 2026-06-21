import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Calendar, User, ArrowRight, ArrowLeft, Share2, Link, Check, Twitter, Linkedin, PenTool, Radio, CheckCircle2, Clock } from 'lucide-react';
import SEO from './SEO';
import { InteractiveCard } from './InteractiveCard';
import { ScrollEntrance, StaggerContainer, StaggerItem } from './ScrollEntrance';
import { useToast } from '../hooks/useToast';
import { pingGoogleSearchConsole } from '../utils/searchConsolePing';
import { db } from '../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

const INITIAL_POSTS = [
  {
    id: '1',
    title: 'Optimal Thermal Vias Placement for High-Density Multilayer PCBs',
    date: 'June 12, 2026',
    author: 'Systems Architect Desk',
    excerpt: 'How to correctly position copper thermal relief barrels under heavy power FETs to prevent thermal throttling without compromising high-speed SPI signaling path.',
    category: 'Electronics Engineering',
    readingTime: '8 min read',
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
    id: '2',
    title: 'PID Parameters Calibration Loops for High-Stability UAV Systems',
    date: 'May 28, 2026',
    author: 'UAV Autopilot Team',
    excerpt: 'A practical, bench-calibrated guide to tuning Proportional, Integral, and Derivative loops on drone custom airframes for heavy payloads.',
    category: 'UAV & Aerospace',
    readingTime: '12 min read',
    bgUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    content: `Tuning heavy drone platforms carrying high-spec surveillance camera gimbals requires cautious calibration of primary flight logs. Standard auto-tuning algorithms often overshoot when managing dynamic, off-axis loads.
We recommend a systematic three-stage manual tuning procedure:
- Rate Proportional (P): Increase the P gain incrementally until high-frequency oscillations appear along the roll axis. Then, reduce the value by 15-20% to establish a baseline.
- Rate Derivative (D): Increase the D gain to counter rotational inertia and filter out the remaining roll oscillations. Keep D minimal to avoid heating up ESC motors.
- Rate Integral (I): Increase I until the UAV perfectly maintains altitude coordinates under heavy diagonal winds.

This manual feedback cascade ensures the autopilot behaves predictably in high-vibration defense scenarios.`
  },
  {
    id: '3',
    title: 'MEMS Micro-Valves and Gating for Digital AromaCode Scent Technology',
    date: 'May 05, 2026',
    author: 'Research & Innovation Desk',
    excerpt: 'An inside look at how our AromaCode scent technology translates binary logic into fine, real-time physical scent diffusion.',
    category: 'Research & Innovation',
    readingTime: '6 min read',
    bgUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    content: `AromaCode bridges digital processing with delicate organic molecular release. Standard electronic vaporizers trigger slow, uncontrolled heat resulting in molecular decay and slow startup delays.
To bypass this limitation, Hasanth R&D engineered custom silicon Micro-Electro-Mechanical System (MEMS) microvalves.
When microvolts pulse across our structured piezoceramic gates, the valve plates fold by sub-micron distances within 150 milliseconds. 
This ultra-fast feedback permits accurate dispensation of micro-dose aroma liquids, delivering rich layered scent profiles without heat degradation.`
  },
  {
    id: '4',
    title: 'Structural CAD Optimization for AS9100 Aerospace Brackets',
    date: 'April 14, 2026',
    author: 'Mechanical Division',
    excerpt: 'Utilizing finite-element shear analysis to reduce aerospace brackets weight while guaranteeing safety margins.',
    category: 'Mechanical Engineering',
    readingTime: '10 min read',
    bgUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    content: `Aircraft structures dictate strict lightweight targets. Yet, safety remains non-negotiable. 
By compiling linear FEA stress models into parametric CAD assemblies, we pinpoint low-shear density regions.
These low-shear zones are subsequently hollowed to reduce overall weight. 
By optimizing the model using multi-axis pocket milling instead of generic brackets, weight reduces by up to 32% while keeping safety stress margins above 2.5.`
  }
];

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const { showToast } = useToast();

  // Author Mode state variables
  const [isAuthorPanelOpen, setIsAuthorPanelOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Electronics Engineering');
  const [newReadingTime, setNewReadingTime] = useState('5 min read');
  const [adminKey, setAdminKey] = useState('');
  const [isPinging, setIsPinging] = useState(false);

  // Scroll Progress Implementation
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Merge with initial posts if db is empty or just use db
      if (blogsData.length === 0) {
        setPosts(INITIAL_POSTS);
      } else {
        setPosts(blogsData);
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePublishPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newExcerpt.trim() || !newContent.trim()) {
      showToast('Validation Error', 'All fields are required to compile the journal entry.', 'warning');
      return;
    }

    if (adminKey !== 'HASANTH2026') {
      showToast('Auth Failure', 'Incorrect administrator access key. Entry rejected.', 'warning');
      return;
    }

    setIsPinging(true);
    showToast('Compiling Entry', 'Logging new aerospace brief to catalog database schema...', 'info');

    try {
      await addDoc(collection(db, 'blogs'), {
        title: newTitle,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
        author: 'Systems Engineering division',
        excerpt: newExcerpt,
        category: newCategory,
        readingTime: newReadingTime,
        bgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        content: newContent,
        timestamp: serverTimestamp()
      });

      // Trigger instant Search Console sitemap ping
      const result = await pingGoogleSearchConsole();
      
      if (result.success) {
        showToast(
          'Crawled & Indexed', 
          'Google Search Console sitemap crawler successfully pinged. New post added to sitemap schema recrawl queue.', 
          'success'
        );
      } else {
        showToast('Published', 'New blog post successfully deployed.', 'success');
      }

      // Reset inputs
      setNewTitle('');
      setNewExcerpt('');
      setNewContent('');
      setAdminKey('');
      setNewReadingTime('5 min read');
      setIsAuthorPanelOpen(false);
    } catch (err) {
      console.error("Failed to publish blog:", err);
      showToast('Publish Error', 'Database rejection. Check system permissions.', 'warning');
    } finally {
      setIsPinging(false);
    }
  };

  const handleCopyLink = (index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `https://www.hasanthengineering.co.in/#blog?post=${index}`;
    navigator.clipboard.writeText(url);
    if (index === -1) {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } else {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    }
  };

  const handleShareSocial = (platform: 'twitter' | 'linkedin' | 'whatsapp', index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const post = posts[index === -1 ? (selectedPost || 0) : index];
    const url = `https://www.hasanthengineering.co.in/#blog?post=${index === -1 ? selectedPost : index}`;
    const text = `Read "${post.title}" by Hasanth Engineering:`;
    
    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}&hashtags=Engineering,Innovation`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

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
        {selectedPost === null && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
            <div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest block">ADMINISTRATIVE AUTHORING</span>
              <h2 className="text-2xl sm:text-3xl font-sans font-black text-[#002b5c] uppercase tracking-tight">Technical Publications Office</h2>
            </div>
            <button
              onClick={() => setIsAuthorPanelOpen(!isAuthorPanelOpen)}
              className="px-5 py-2.5 bg-[#002b5c] text-white font-mono text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-900 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
            >
              <PenTool size={14} />
              <span>{isAuthorPanelOpen ? 'Close Composer' : 'Compose Technical Digest'}</span>
            </button>
          </div>
        )}

        <AnimatePresence>
          {selectedPost === null && isAuthorPanelOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-10"
            >
              <form onSubmit={handlePublishPost} className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Paper Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Finite-Element Design"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#002b5c]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Category *</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full bg-white border border-slate-200 h-[38px] rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-850 font-semibold focus:outline-none focus:border-[#002b5c]"
                      >
                        <option value="Electronics Engineering">Electronics Engineering</option>
                        <option value="UAV & Aerospace">UAV & Aerospace</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Research & Innovation">Research & Innovation</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Reading Time *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 5 min read"
                        value={newReadingTime}
                        onChange={(e) => setNewReadingTime(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#002b5c]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Abstract / Summary Excerpt *</label>
                      <input
                        type="text"
                        required
                        placeholder="Brief description of findings..."
                        value={newExcerpt}
                        onChange={(e) => setNewExcerpt(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#002b5c]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">ADMIN ACCESS KEY (Secure) *</label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={adminKey}
                        onChange={(e) => setAdminKey(e.target.value)}
                        className="w-full bg-white border-2 border-amber-100 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 font-mono focus:outline-none focus:border-[#002b5c]"
                      />
                    </div>
                  </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Complete Technical Report Body *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write detailed formulas, experimental parameters, and hardware specifications..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-850 font-semibold focus:outline-none focus:border-[#002b5c]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPinging}
                  className="px-6 py-3 bg-[#002b5c] disabled:bg-slate-300 text-white font-mono text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-900 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
                >
                  {isPinging ? (
                    <>
                      <Radio size={12} className="animate-pulse duration-700 text-blue-300" />
                      <span>Broadcasting Sitemap crawl ping...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={12} />
                      <span>Compile & Trigger Search Console crawling</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

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
                    <div className="flex items-center gap-2">
                      <Clock size={10} className="text-slate-400" />
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">{post.date} • {post.readingTime || '5 min read'}</span>
                    </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-sans font-black uppercase tracking-tight text-[#002b5c] group-hover:text-blue-900 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed font-semibold line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Card actions + mini index list individual post share bar */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs font-mono font-bold text-[#002b5c] uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => setSelectedPost(idx)}
                        className="flex items-center gap-1.5 cursor-pointer text-[#002b5c] hover:text-blue-800"
                        title="Read full article"
                      >
                        <span>Read Paper</span>
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 font-medium normal-case self-start sm:self-auto">
                      <span className="text-[10px] font-mono font-bold text-slate-350 uppercase">Share:</span>
                      <button
                        onClick={(e) => handleCopyLink(idx, e)}
                        className="p-1 px-2 hover:bg-slate-100 rounded text-slate-500 transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                        title="Copy article link"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check size={11} className="text-emerald-500 animate-pulse" />
                            <span className="text-emerald-600 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Link size={11} />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={(e) => handleShareSocial('linkedin', idx, e)}
                        className="p-1 hover:text-blue-600 rounded transition-colors cursor-pointer"
                        title="Share on LinkedIn"
                      >
                        <Linkedin size={12} />
                      </button>

                      <button
                        onClick={(e) => handleShareSocial('twitter', idx, e)}
                        className="p-1 hover:text-slate-900 rounded transition-colors cursor-pointer"
                        title="Share on Twitter"
                      >
                        <Twitter size={12} />
                      </button>
                    </div>
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
            className="bg-slate-50 border-2 border-slate-100 p-8 sm:p-12 rounded-[32px] space-y-8 relative"
          >
            {/* Reading progress bar fixed at top of post container */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1.5 bg-[#002b5c] origin-left rounded-t-[32px]"
              style={{ scaleX }}
            />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button 
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#002b5c] uppercase tracking-wider hover:underline cursor-pointer animate-fade-in"
              >
                <ArrowLeft size={13} />
                <span>Back to Journal index</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Share article:</span>
                <button
                  onClick={() => handleCopyLink(selectedPost, undefined)}
                  className="p-1.5 px-3 bg-white border border-slate-200 text-slate-600 text-xs font-mono font-semibold rounded-lg hover:border-slate-350 transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                >
                  {copiedIndex === selectedPost ? (
                    <>
                      <Check size={12} className="text-emerald-500 animate-pulse" />
                      <span className="text-emerald-600 font-bold">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Link size={12} />
                      <span>Copy link</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleShareSocial('linkedin', selectedPost, undefined)}
                  className="p-1.5 bg-white border border-slate-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  title="Share on LinkedIn"
                >
                  <Linkedin size={14} />
                </button>
                <button
                  onClick={() => handleShareSocial('twitter', selectedPost, undefined)}
                  className="p-1.5 bg-white border border-slate-200 text-slate-800 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  title="Share on Twitter/X"
                >
                  <Twitter size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="text-[#002b5c] font-bold bg-blue-50 px-2.5 py-1 rounded">
                  {posts[selectedPost].category}
                </span>
                <span>•</span>
                <Clock size={12} className="inline" />
                <span className="font-bold">{posts[selectedPost].readingTime || '5 min read'}</span>
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

            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 font-medium">Interested in sharing this paper?</span>
                <button
                  onClick={() => handleShareSocial('linkedin', selectedPost, undefined)}
                  className="text-xs font-mono font-bold text-blue-700 hover:underline cursor-pointer"
                >
                  LinkedIn
                </button>
                <span className="text-slate-355">•</span>
                <button
                  onClick={() => handleShareSocial('twitter', selectedPost, undefined)}
                  className="text-xs font-mono font-bold text-slate-800 hover:underline cursor-pointer"
                >
                  Twitter/X
                </button>
                <span className="text-slate-355">•</span>
                <button
                  onClick={() => handleShareSocial('whatsapp', selectedPost, undefined)}
                  className="text-xs font-mono font-bold text-emerald-600 hover:underline cursor-pointer"
                >
                  WhatsApp
                </button>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="text-xs font-mono font-bold text-[#002b5c] hover:underline hover:text-blue-900 cursor-pointer"
              >
                Back to Journal index
              </button>
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

