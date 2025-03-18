import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './pages/Home.jsx';
import Nav from './components/Nav.jsx';
import { Outlet } from 'react-router-dom';
import Announcement from './pages/Announcement.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext.jsx';
import About from './pages/About.jsx';
import Appointment from './pages/Appointment.jsx';
import Feedback from './pages/Feedback.jsx';
import RootLayout from './components/RootLayout.jsx';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Admin from './pages/Admin.jsx';
import Users from './pages/Users.jsx';
import PrivateRoute from './utils/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'announcement', element: <Announcement /> },
      { path: 'appointment', element: <Appointment /> },
      { path: 'feedback', element: <Feedback /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Registration /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'admin', element: <Admin /> },
          { path: 'users', element: <Users /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
