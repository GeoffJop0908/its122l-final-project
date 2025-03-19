import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useScroll } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { cn } from '../lib/utils';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import SignUpButton from './SignUpButton';
import LoginButton from './LoginButton';
import AccountButton from './AccountButton';

export default function Nav() {
  const location = useLocation();
  const scrollTrigger = location.pathname === '/' ? true : false;
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = scrollY.get();
      setIsScrolled(currentScrollY >= 200);
    };

    const unsubscribe = scrollY.onChange(handleScroll);

    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    if (isScrolled || !scrollTrigger) {
      controls.start({ opacity: 1, height: '5rem' });
    } else {
      controls.start({ opacity: 0, height: '7rem' });
    }
  }, [isScrolled, scrollTrigger, controls]);

  return (
    <>
      <motion.div
        className="w-full bg-gradient-to-r from-jungle-green-600 to-jungle-green-500 fixed top-0 z-[99] shadow-lg"
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ type: 'easeInOut' }}
      ></motion.div>
      <div
        className={cn(
          'navbar fixed px-12 z-[100] transition-all duration-300 ease-in-out',
          {
            'py-2': isScrolled || !scrollTrigger,
            'py-4': !isScrolled && scrollTrigger,
          }
        )}
      >
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2">
            <img src="/gcf_logo.png" className="w-10 transition-transform hover:scale-110" />
            <span className="text-white font-bold text-xl hidden md:block">GCF</span>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 flex items-center gap-6 text-white font-medium">
            {[
              { to: '/about', label: 'About' },
              { to: '/announcement', label: 'Announcements' },
              { to: '/appointment', label: 'Appointment' },
              { to: '/feedback', label: 'Feedback' },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    'relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10',
                    'after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5',
                    'after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0',
                    location.pathname === item.to && 'bg-white/10 after:w-full after:left-0'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user ? (
              <li>
                <AccountButton />
              </li>
            ) : (
              <>
                <li>
                  <SignUpButton />
                </li>
                <li>
                  <LoginButton />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}