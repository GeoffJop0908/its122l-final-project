import React from 'react';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import ReactLenis from 'lenis/react';

export default function RootLayout() {
  return (
    <ReactLenis root options={{ lerp: 0.05 }}>
      <Nav />
      <Outlet />
    </ReactLenis>
  );
}
