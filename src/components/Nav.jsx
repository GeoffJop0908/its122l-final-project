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
  console.log(isScrolled || !scrollTrigger);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = scrollY.get();
      setIsScrolled(currentScrollY >= 200);
    };

    const unsubscribe = scrollY.onChange(handleScroll);

    // Cleanup function to unsubscribe from the scroll event
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
        className="w-full bg-jungle-green-500 fixed top-0 z-[99]"
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ type: 'easeInOut' }}
      ></motion.div>
      <div
        className={cn(
          'navbar none fixed p-3 pt-7 px-12 z-[100] shadow-none transition-all ease-in-out',
          {
            'pt-2': isScrolled || !scrollTrigger,
          }
        )}
      >
        <div className="flex-1">
          <Link to="/">
            <img src="/gcf_logo.png" className="w-9" />
          </Link>
        </div>
        <div className="flex-none">
          <ul
            className="menu menu-horizontal px-1 flex items-center gap-8 text-white font-bold font-sans uppercase tracking-wide"
            style={{
              '--menu-active-bg': '#00000022',
              '--color-base-content': 'none',
            }}
          >
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/announcement">Announcements</Link>
            </li>
            <li>
              <Link to="/appointment">Appointment</Link>
            </li>
            <li>
              <Link to="/feedback">Feedback</Link>
            </li>
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
