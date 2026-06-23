import { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export interface PageSection {
  id: string;
  heading: string;
  body: string;
  imageUrl?: string;
}

export interface PageData {
  pageId: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  sections: PageSection[];
}

export function usePageContent(pageId: string) {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'page_content', pageId), (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as PageData);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [pageId]);

  return { data, loading };
}
