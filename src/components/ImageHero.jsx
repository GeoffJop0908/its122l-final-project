import React from 'react';
import { cn } from '../lib/utils';

export default function ImageHero({ right = false, className }) {
  return (
    <div
      className={cn('hero bg-stone-200 p-12 text-jungle-green-950', className)}
      id="scroll-here"
    >
      <div
        className={cn('hero-content flex-col gap-10', {
          'lg:flex-row-reverse': right,
          'lg:flex-row': !right,
        })}
      >
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          class="w-sm rounded-lg shadow-2xl"
        />
        <div className="w-xl">
          <h1 className="text-5xl font-bold">We're glad you're here!</h1>
          <p className="py-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non id
            corporis ducimus voluptatum libero culpa molestias fugit blanditiis
            doloremque eius, quo explicabo dignissimos adipisci unde saepe fuga
            soluta porro laudantium.
          </p>
          <button className="btn bg-jungle-green-500 border-none">
            Worship with us!
          </button>
        </div>
      </div>
    </div>
  );
}
