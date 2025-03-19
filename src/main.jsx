import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './pages/Home.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext.jsx';
import About from './pages/About.jsx';
import Appointment from './pages/Appointment.jsx';
import Announcement from './pages/Announcements.jsx';
import Feedback from './pages/Feedback.jsx';
import RootLayout from './components/RootLayout.jsx';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import Dashboard from './pages/protected/Dashboard.jsx';
import Admin from './pages/protected/Admin.jsx';
import Users from './pages/protected/Users.jsx';
import AnnouncementsEdit from './pages/protected/AnnouncementsEdit.jsx';
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
        path: '/user',
        element: <PrivateRoute />,
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'appointment', element: <Appointment /> },
          { path: 'feedback', element: <Feedback /> },
        ],
      },
      {
        path: '/admin',
        element: <PrivateRoute roles={['admin', 'editor']} />,
        children: [{ path: 'announcement', element: <AnnouncementsEdit /> }],
      },
      {
        path: '/admin',
        element: <PrivateRoute roles={['admin']} />,
        children: [
          { index: true, element: <Admin /> },
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
