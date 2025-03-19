import React from 'react';
import FooterSection from './FooterSection';
import FooterFirst from './FooterFirst';

export default function Footer() {
  return (
    <footer className="bg-stone-300 pt-12 pb-8 px-4 md:px-8 static">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
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
            {
              text: 'Watch Online',
              link: 'https://www.youtube.com/channel/UCKX3r7aHgnn2jtw2CKVWpeQ',
            },
            {
              text: 'Sermons',
              link: 'https://www.youtube.com/@GreenhillsChristianFellowship/playlists',
            },
            {
              text: 'All Videos',
              link: 'https://www.youtube.com/@GreenhillsChristianFellowship/videos',
            },
          ]}
        />

        {/* I'm New Section */}
        <FooterSection
          header="I'm New"
          items={[{ text: 'About GCF', link: '#' }]}
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
