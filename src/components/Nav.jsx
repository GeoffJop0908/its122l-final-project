import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useScroll } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { cn } from '../lib/utils';

export default function Nav() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = scrollY.get();
      setIsScrolled(currentScrollY >= 300);
    };

    const unsubscribe = scrollY.onChange(handleScroll);

    // Cleanup function to unsubscribe from the scroll event
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    if (isScrolled) {
      controls.start({ y: '0px' });
    } else {
      controls.start({ y: '-100px' });
    }
  }, [isScrolled, controls]);

  return (
    <>
      <motion.div
        className="h-20 w-full bg-emerald-700 fixed top-0 z-[99]"
        initial={{ y: '-100px' }}
        animate={controls}
        transition={{ type: 'easeInOut' }}
      ></motion.div>
      <div
        className={cn(
          'navbar none fixed p-3 px-12 z-[100] shadow-none transition-all ease-in-out',
          {
            'px-16': isScrolled,
          }
        )}
      >
        <div className="flex-1">
          {/* <div className="size-5"> */}
          <Link to="/">
            <img src="gcf_logo.png" className="w-9" />
          </Link>
          {/* </div> */}
        </div>
        <div className="flex-none">
          <ul
            className="menu menu-horizontal px-1 flex items-center gap-4"
            style={{
              '--menu-active-bg': '#00000022',
              '--color-base-content': 'none',
            }}
          >
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Announcements</a>
            </li>
            <li>
              <a>Appointment</a>
            </li>
            <li>
              <a>Feedback</a>
            </li>
            <li>
              <a className="btn bg-white text-black border-black shadow-none">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
