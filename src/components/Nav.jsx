import { Link } from 'react-router-dom';
import React from 'react';

export default function Nav() {
  return (
    <div className="navbar bg-emerald-700 shadow-sm fixed p-3 px-12 z-[100]">
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
  );
}
