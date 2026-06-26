import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface SiteConfig {
  whatsappNumber: string;
  whatsappMessage: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  contactAddressShort: string;
}

const DEFAULT_CONFIG: SiteConfig = {
  whatsappNumber: '8187044238',
  whatsappMessage: 'Hello, I am looking to schedule an industrial engineering consultation with HASANTH ENGINEERING. Please connect me with a designer.',
  contactPhone: '8187044238',
  contactEmail: 'hasanthengg@gmail.com',
  contactAddress: 'H NO 3-3-8/4, KUKATPALLY, Vivekanandanagar Colony, Balanagar, Hyderabad-500072, Telangana.',
  contactAddressShort: 'Kukatpally, Hyderabad'
};

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'site_config', 'global'), (snapshot) => {
      if (snapshot.exists()) {
        setConfig({ ...DEFAULT_CONFIG, ...snapshot.data() });
      }
      setLoading(false);
    }, (error) => {
      console.error("Site config fetch failed: ", error);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { config, loading };
}
