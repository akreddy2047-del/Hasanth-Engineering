import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Shield, FileText, Lock, Scale, Activity, Globe, User, Loader2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

const IconMap: Record<string, React.ReactNode> = {
  Lock: <Lock size={18} className="text-blue-600" />,
  Shield: <Shield size={18} className="text-blue-600" />,
  Scale: <Scale size={18} className="text-blue-600" />,
  Activity: <Activity size={18} className="text-blue-600" />,
  Globe: <Globe size={18} className="text-blue-600" />,
  User: <User size={18} className="text-blue-600" />,
};

interface LegalContent {
  content: string;
  lastUpdated: any;
  sections: {
    title: string;
    body: string;
    icon: string;
  }[];
}

export default function LegalPage({ type }: LegalPageProps) {
  const [data, setData] = useState<LegalContent | null>(null);
  const [loading, setLoading] = useState(true);
  const isPrivacy = type === 'privacy';
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const docRef = doc(db, 'legal', type);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data() as LegalContent);
        }
      } catch (err) {
        console.error("Error fetching legal content:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [type]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
      >
        <div className="bg-[#002b5c] p-10 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
              {isPrivacy ? <Shield className="text-blue-400" size={32} /> : <FileText className="text-blue-400" size={32} />}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
              </h1>
              <p className="text-white/60 text-xs font-mono tracking-widest mt-1 uppercase">
                Last Updated: {data?.lastUpdated?.toDate ? data.lastUpdated.toDate().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'June 2026'} • HASANTH ENGINEERING
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-12 space-y-8 text-slate-700 leading-relaxed">
          {data?.content && (
            <section className="space-y-4">
              <p className="text-sm font-semibold">
                {data.content}
              </p>
            </section>
          )}

          {data?.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-lg font-black text-[#002b5c] flex items-center gap-2 uppercase tracking-wide">
                {IconMap[section.icon] || <Shield size={18} className="text-blue-600" />}
                {idx + 1}. {section.title}
              </h2>
              <p className="text-sm font-semibold whitespace-pre-wrap">
                {section.body}
              </p>
            </section>
          ))}

          {!data && (
            <div className="text-center py-12">
              <p className="text-slate-400 italic">No official documentation currently loaded on the system nodes.</p>
            </div>
          )}

          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-lg font-black text-[#002b5c] uppercase tracking-wide">
              Contact Information
            </h2>
            <p className="text-sm font-semibold">
              For any legal inquiries regarding these {isPrivacy ? 'policies' : 'terms'}, please contact our administrative office:
            </p>
            <div className="bg-[#f0f9ff] p-5 rounded-2xl border border-blue-100">
              <p className="text-xs font-bold text-[#002b5c]">Hasanth Engineering (OPC) Private Limited</p>
              <p className="text-[11px] text-[#002b5c]/70 font-bold mt-1">Balanagar Engineering Zone, Hyderabad, Telangana</p>
              <p className="text-[11px] text-blue-600 font-black mt-2">Email: legal@hasanth.com</p>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
