import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: (id: string) => void }) {
  const { id, title, message, type, duration = 4000 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  const typeConfig = {
    success: {
      bg: 'bg-white border-emerald-200 shadow-emerald-500/5',
      icon: <CheckCircle className="text-emerald-500 shrink-0" size={18} />,
      progressBg: 'bg-emerald-500',
    },
    info: {
      bg: 'bg-white border-blue-200 shadow-blue-500/5',
      icon: <Info className="text-blue-500 shrink-0" size={18} />,
      progressBg: 'bg-blue-500',
    },
    warning: {
      bg: 'bg-white border-amber-200 shadow-amber-500/5',
      icon: <AlertTriangle className="text-amber-500 shrink-0" size={18} />,
      progressBg: 'bg-amber-500',
    },
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className={`pointer-events-auto w-full border-2 rounded-2xl p-4 flex gap-3.5 shadow-2xl relative overflow-hidden ${config.bg}`}
    >
      {/* Icon */}
      <div className="pt-0.5">{config.icon}</div>

      {/* Content */}
      <div className="flex-1 space-y-1">
        <h5 className="font-sans font-black text-xs uppercase tracking-wider text-slate-800 leading-tight">
          {title}
        </h5>
        <p className="font-sans text-[11px] text-slate-500 font-semibold leading-relaxed">
          {message}
        </p>
      </div>

      {/* Close button */}
      <button
        onClick={() => onRemove(id)}
        className="text-slate-400 hover:text-slate-600 transition-colors self-start cursor-pointer p-0.5 rounded-lg hover:bg-slate-50"
      >
        <X size={14} />
      </button>

      {/* Progressive Line */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
        style={{ originX: 0 }}
        className={`absolute bottom-0 left-0 right-0 h-1 ${config.progressBg}`}
      />
    </motion.div>
  );
}
