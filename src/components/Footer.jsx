import React from 'react';
import FooterSection from './FooterSection';
import FooterFirst from './FooterFirst';

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-12 pb-8 px-4 md:px-8 static">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Church Information */}
        <FooterFirst
          header="Greenhills Christian Fellowship"
          items={[
            {
              text: 'Ruby corner Garnet Roads, Ortigas Center, Pasig City, Philippines',
              link: '#',
            },
            {
              text: '+63 2 8632-1354 to 56',
              link: '#',
            },
            {
              text: 'email@gcf.org.ph',
              link: '#',
            },
          ]}
        />
        {/* Videos Section */}
        <FooterSection
          header="Videos"
          items={[
            { text: 'Watch Online', link: '#' },
            { text: 'Sermons', link: '#' },
            { text: 'All Videos', link: '#' },
          ]}
        />

        {/* I'm New Section */}
        <FooterSection
          header="I'm New"
          items={[
            { text: 'About GCF', link: '#' },
            { text: 'Growth Groups', link: '#' },
          ]}
        />

        {/* Combined Right Sections
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
        {/* Be Involved Section */}
        <FooterSection
          header="Be Involved"
          items={[
            { text: 'Give', link: '#' },
            { text: 'Life Journey', link: '#' },
          ]}
        />

        {/* Get in Touch Section */}
        <FooterSection
          header="Get in Touch"
          items={[
            { text: 'Contact Us', link: '#' },
            { text: 'Need Prayer?', link: '#' },
          ]}
        />
      </div>
      {/* </div> */}
    </footer>
  );
}
