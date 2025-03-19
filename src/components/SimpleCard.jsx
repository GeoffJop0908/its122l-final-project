import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export default function SimpleCard({ children, className }) {
  return (
    <motion.div
      initial={{ y: 500 }}
      animate={{ y: 0 }}
      className="flex items-center justify-center h-[90vh] text-white"
    >
      <div
        className={cn(
          'bg-jungle-green-500 w-3/5 h-3/5 flex items-center justify-center rounded-xl text-4xl flex-col gap-5',
          className
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
