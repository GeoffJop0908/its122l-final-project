import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';

export default function FooterFirst({ header, items }) {
  return (
    <div>
      <h3 className="text-lg font-medium text-jungle-green-800 mb-4">
        {header}
      </h3>
      <ul className="text-gray-600 space-y-2 [&_a]:transition-all [&_a]:ease-in-out [&_a]:duration-250">
        {items.map((item, i) => (
          <li key={i}>
            <a href={item.link} className="hover:text-jungle-green-500">
              {item.text}
            </a>
          </li>
        ))}
        <li className="flex space-x-3 items-center *:text-gray-500 *:hover:text-jungle-green-500 *:*:size-6">
          <a href="#">
            <FaYoutube />
          </a>
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaWhatsapp />
          </a>
        </li>
      </ul>
    </div>
  );
}
