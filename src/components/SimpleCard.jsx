import React from 'react';

export default function SimpleCard({ children }) {
  return (
    <div className="flex items-center justify-center h-screen text-white">
      <div className="bg-emerald-500 w-3/5 h-3/5 flex items-center justify-center rounded-xl text-4xl flex-col gap-5">
        {children}
      </div>
    </div>
  );
}
