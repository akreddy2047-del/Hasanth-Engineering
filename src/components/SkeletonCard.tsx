import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="h-full flex flex-col justify-between bg-white/70 p-6 rounded-[24px] border-2 border-slate-100 animate-pulse">
        <div className="space-y-6">
            <div className="flex justify-between items-start">
             <div className="w-12 h-12 bg-slate-200 rounded-2xl" />
             <div className="w-20 h-4 bg-slate-200 rounded-full" />
            </div>
            <div className="space-y-2">
                <div className="w-full h-6 bg-slate-200 rounded-md" />
                <div className="w-1/2 h-6 bg-slate-200 rounded-md" />
            </div>
            <div className="space-y-2 pt-4">
                <div className="w-full h-4 bg-slate-200 rounded-md" />
                <div className="w-full h-4 bg-slate-200 rounded-md" />
                <div className="w-2/3 h-4 bg-slate-200 rounded-md" />
            </div>
        </div>
    </div>
  );
};
