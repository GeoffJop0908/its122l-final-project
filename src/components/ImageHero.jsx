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
          src="gcf.jpg"
          class="w-sm rounded-lg shadow-2xl"
        />
        <div className="w-xl">
          <h1 className="text-5xl font-bold">We're glad you're here!</h1>
          <p className="py-6">
            GCF San Fernando Pampanga started in 1998, but was formally launched on January 10, 1999 thru the collective efforts of missionary couple Pastor Love and Sister Racquel Tira; and pioneer members Brother Cesar Ocampo, and the couple Brother Mario and Sister Liz Dabu. In a formal inaugural service conducted at Days Hotel, attended by the leaders of the Conservative Baptist Association of the Philippines (CBAP), GCF-Ortigas, and its then senior pastor Dr. Luis Pantoja, Jr., GCF San Fernando was officially established to be a beacon of the gospel in Central Luzon with a primary goal: to “KNOW CHRIST AND MAKE HIM KNOWN.”
          </p>
          <button className="btn bg-jungle-green-500 border-none">
            Worship with us!
          </button>
        </div>
      </div>
    </div>
  );
}
