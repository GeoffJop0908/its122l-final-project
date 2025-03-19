import React from 'react';
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-dom';
import { MdSpaceDashboard } from 'react-icons/md';
import { RiAdminLine } from 'react-icons/ri';
import { MdTableChart } from 'react-icons/md';
import { ImBullhorn } from 'react-icons/im';
import { MdLogout } from 'react-icons/md';

export default function AccountButton() {
  return (
    <>
      <button
        className="avatar p-0"
        popoverTarget="popover-1"
        style={{ anchorName: '--anchor-1' } /* as React.CSSProperties */}
      >
        <div className="w-10 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </button>
      <ul
        className="dropdown dropdown-end menu w-60 rounded-box bg-jungle-green-950 shadow-sm text-stone-100 font-normal"
        popover="auto"
        id="popover-1"
        style={{ positionAnchor: '--anchor-1' } /* as React.CSSProperties */}
      >
        <Item
          icon={<MdSpaceDashboard />}
          text="Dashboard"
          link="user/dashboard"
        />
        <Item icon={<RiAdminLine />} text="Admin" link="/admin" />
        <Item icon={<MdTableChart />} text="Users" link="/admin/users" />
        <Item
          icon={<ImBullhorn />}
          text="Annonunce"
          link="/admin/announcement"
        />
        <LogoutButton />
      </ul>
    </>
  );
}

function LogoutButton() {
  const { logoutUser } = useAuth();

  return (
    <li>
      <a
        className="text-red-400 text-base hover:text-stone-100 capitalize"
        onClick={logoutUser}
      >
        <span className="size-6 [&_svg]:size-full">
          <MdLogout />
        </span>
        Log Out
      </a>
    </li>
  );
}

function Item({ icon, text, link }) {
  return (
    <li>
      <Link
        to={link}
        className="text-base hover:text-jungle-green-500 capitalize"
      >
        <span className="size-6 [&_svg]:size-full">{icon}</span>
        {text}
      </Link>
    </li>
  );
}
