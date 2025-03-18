import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './pages/Home.jsx';
import Nav from './components/Nav.jsx';
import { Outlet } from 'react-router-dom';
import Announcement from './pages/Announcement.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout.jsx';
import Appointment from './pages/Appointment.jsx';
import Feedback from './pages/Feedback.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [{ index: true, element: <Home /> },
      { path: 'Announcement', element: <Announcement /> },
      { path: 'Appointment', element: <Appointment /> },
      { path: 'Feedback', element: <Feedback /> },
      
    ],
    
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
