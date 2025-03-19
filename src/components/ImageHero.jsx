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
      className={cn('hero bg-stone-200 p-12 text-jungle-green-950 h-[90vh]', className)}
      id="scroll-here"
    >
      <div
        className={cn('hero-content flex-col gap-10', {
          'lg:flex-row-reverse': right,
          'lg:flex-row': !right,
        })}
      >
        <img src={image} class="w-sm rounded-lg shadow-2xl" />
        <div className="w-xl">
          <h1 className="text-5xl font-bold">{header}</h1>
          <p className="py-6">{text}</p>
          {button && (
            <button className="btn bg-jungle-green-500 border-none">
              {button}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
