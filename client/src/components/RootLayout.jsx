import React from 'react';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import ReactLenis from 'lenis/react';

export default function RootLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
