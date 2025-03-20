import React from 'react';
import { cn } from '../lib/utils';

export default function ImageHero({
  right = false,
  header,
  image,
  text,
  button,
  className,
}) {
  return (
    <div
      className={cn('hero relative h-[90vh] overflow-hidden', className)}
      id="scroll-here"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.25
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full bg-white/80">
        <div
          className={cn('hero-content flex-col gap-10 h-full max-w-7xl mx-auto', {
            'lg:flex-row-reverse': right,
            'lg:flex-row': !right,
          })}
        >
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <img src={image} className="w-full max-w-lg rounded-lg shadow-2xl" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 text-center lg:text-left">
            <h1 className="text-5xl font-bold text-jungle-green-800 mb-6">{header}</h1>
            <div className="text-lg text-gray-700 leading-relaxed max-w-xl">
              {text}
            </div>
            {button && (
              <button className="btn bg-jungle-green-600 text-white border-none mt-8 hover:bg-jungle-green-700 transition-colors">
                {button}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
