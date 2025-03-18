import { cn } from '../lib/utils';
import { useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';
import init from '../appwrite/announcements';
import { ImBullhorn } from 'react-icons/im';
import { motion } from 'motion/react';

function Announcement() {
  const [announcementCard, setAnnouncementCard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    init(setAnnouncementCard, setIsLoading);
    if (lenis) {
      lenis.resize();
      lenis.start();
    }
  }, [announcementCard, lenis]);

  function convertTime(time) {
    const date = new Date(time);

    // Define options for date and time formatting
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };

    // Convert to human-readable format
    const humanReadableDate = date.toLocaleDateString(undefined, dateOptions);
    const humanReadableTime = date.toLocaleTimeString(undefined, timeOptions);

    return `${humanReadableDate}, ${humanReadableTime}`;
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-start">
        <div className=" h-screen  w-full flex flex-col items-center">
          <h1 className="text-5xl font-bold text-jungle-green-950 pb-10">
            Announcements
          </h1>
          {isLoading ? (
            <div className="list bg-jungle-green-900 rounded-box shadow-md max-w-[70%] w-full max-h-[50%] h-full overflow-y-auto animate-pulse" />
          ) : (
            <motion.ul
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className="list bg-jungle-green-900 rounded-box shadow-md max-w-[70%] w-full max-h-[50%] overflow-y-auto"
              data-lenis-prevent
            >
              {announcementCard.map(
                (announcementCard, index) =>
                  announcementCard.isDisplayed && (
                    <li
                      key={announcementCard.$id}
                      className={cn(
                        'list-row gap-8 gap-y-4 p-4 border-none rounded-none text-stone-100',
                        { 'bg-jungle-green-800': index % 2 == 0 }
                      )}
                    >
                      <div>
                        <ImBullhorn className="size-10" />
                      </div>
                      <div>
                        <h1 className="font-bold text-2xl">
                          {announcementCard.AnnouncementString}
                        </h1>
                        <div className="text-xs uppercase font-semibold opacity-60">
                          {convertTime(announcementCard.$createdAt)}
                        </div>
                      </div>
                      <p className="list-col-wrap text-sm line-clamp-1">
                        {announcementCard.AnnouncementBody}
                      </p>
                    </li>
                  )
              )}
            </motion.ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Announcement;
