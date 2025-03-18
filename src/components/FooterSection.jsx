import React from 'react';

export default function FooterSection({ header, items }) {
  return (
    <div>
      <h3 className="text-lg font-medium text-jungle-green-800 mb-4">
        {header}
      </h3>
      <ul className="text-gray-600 space-y-2">
        {items.map((item, i) => (
          <li key={i}>
            <a
              href={item.link}
              className="hover:text-jungle-green-500 transition-all ease-in-out duration-250"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
