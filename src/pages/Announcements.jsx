import { cn } from '../lib/utils';
import { useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';
import { ImBullhorn } from 'react-icons/im';
import { motion } from 'motion/react';
import { convertTime } from '../lib/convertTime';
import db from '../assets/databases';
import { Query } from 'appwrite';

function Announcement() {
  const [announcementCard, setAnnouncementCard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    init(setAnnouncementCard);
    if (lenis) {
      lenis.resize();
      lenis.start();
    }
  }, [lenis]);

  const init = async (setAnnouncementCard) => {
    const result = await db.announcement.list([Query.orderDesc('$createdAt')]);
    setAnnouncementCard(result.documents);
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.15,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative">
            <h1 className="text-6xl font-bold text-jungle-green-800 mb-4 tracking-tight">
              Announcements
            </h1>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-jungle-green-600 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-700 mt-6 italic">
            Stay Updated With Our Latest News
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-4xl mx-auto px-4">
          {isLoading ? (
            <div className="bg-white/90 rounded-lg shadow-lg p-8 animate-pulse" />
          ) : (
            <motion.ul
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className="bg-white/90 rounded-lg shadow-lg overflow-hidden"
              data-lenis-prevent
            >
              {announcementCard.map(
                (announcementCard, index) =>
                  announcementCard.isDisplayed && (
                    <li
                      key={announcementCard.$id}
                      className={cn(
                        'flex items-center gap-8 p-6 border-b border-gray-200 last:border-b-0',
                        { 'bg-gray-50': index % 2 === 0 }
                      )}
                    >
                      <div className="flex-shrink-0">
                        <ImBullhorn className="size-10 text-jungle-green-600" />
                      </div>
                      <div className="flex-grow">
                        <h2 className="font-bold text-2xl text-gray-800 mb-2">
                          {announcementCard.AnnouncementString}
                        </h2>
                        <div className="text-sm text-gray-500 uppercase font-semibold">
                          {convertTime(announcementCard.$createdAt)}
                        </div>
                        <p className="text-gray-600">
                          {announcementCard.AnnouncementBody}
                        </p>
                      </div>
                    </li>
                  )
              )}
            </motion.ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Announcement;
