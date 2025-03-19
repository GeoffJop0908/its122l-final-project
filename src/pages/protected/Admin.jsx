import React from 'react';
import SimpleCard from '../../components/SimpleCard';
import { useNavigate } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import { MdEditCalendar, MdTableChart } from 'react-icons/md';
import { MdOutlineChat } from 'react-icons/md';
import { motion } from 'motion/react';
import { ImBullhorn } from 'react-icons/im';

export default function Admin() {
  return (
    <SimpleCard className="p-10">
      <h1>Admin's Page</h1>
      <div className="w-full h-full grid grid-cols-3 gap-5">
        <Item text="Home" icon={<IoHome />} link="/" />
        <Item text="Users" icon={<MdTableChart />} link="/admin/users" />
        <Item
          text="Announce"
          icon={<ImBullhorn />}
          link="/admin/announcement"
        />
      </div>
    </SimpleCard>
  );
}

function Item({ text, icon, link }) {
  const navigate = useNavigate();

  return (
    <motion.p
      initial={{ y: 0 }}
      whileHover={{ y: -10 }}
      className="flex flex-col gap-3 items-center justify-center rounded-lg bg-jungle-green-600 border-jungle-green-950/10 border shadow-lg text-2xl cursor-pointer"
      onClick={() => navigate(link)}
    >
      <span className="size-15 [&_svg]:size-full">{icon}</span>
      {text}
    </motion.p>
  );
}
