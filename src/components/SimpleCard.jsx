import React from 'react';
import { cn } from '../lib/utils';

export default function SimpleCard({ children, className }) {
  return (
    <div className="flex items-center justify-center h-[90vh] text-white">
      <div
        className={cn(
          'bg-jungle-green-500 w-3/5 h-3/5 flex items-center justify-center rounded-xl text-4xl flex-col gap-5',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
