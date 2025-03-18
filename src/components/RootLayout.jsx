import React from 'react';
import Nav from './Nav';
import { Outlet, useLocation } from 'react-router-dom';
import ReactLenis, { useLenis } from 'lenis/react';
import { useEffect } from 'react';

export default function RootLayout() {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.resize(); // Recalculate height // Reset scroll position
    }
    if (lenis) {
      lenis.stop();
    }
    window.scrollTo(0, 0);
    if (lenis) {
      lenis.start();
    }
  }, [location.pathname, lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.05 }}>
      <Nav />
      <div className="pt-28 h-screen bg-gray-200" id="content">
        <Outlet />
      </div>
    </ReactLenis>
  );
}
