import React from 'react';

export default function RightImageHero() {
  return (
    <div className="hero bg-none min-h-screen p-12">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
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
          <button className="btn btn-primary">Worship with us!</button>
        </div>
      </div>
    </div>
  );
}
