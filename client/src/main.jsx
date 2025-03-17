import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Announcement from './pages/Announcement.jsx';
import Appointment from './pages/Appointment.jsx';
import Feedback from './pages/Feedback.jsx';
import RootLayout from './components/RootLayout.jsx';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Admin from './pages/Admin.jsx';
import Users from './pages/Users.jsx';
import PersistLogin from './components/PersistLogin.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About />},
      { path: 'announcement', element: <Announcement />},
      { path: 'appointment', element: <Appointment/>},
      { path: 'feedback', element: <Feedback />},
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Registration /> },
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuth allowedRoles={['admin']} />,
            children: [
              { path: 'dashboard', element: <Dashboard /> },
              { path: 'admin', element: <Admin /> },
              { path: 'users', element: <Users /> },
            ],
          },
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
