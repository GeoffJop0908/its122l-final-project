import icon from '../assets/horn.svg';
import { useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';
import init from '../appwrite/announcements';
import { ImBullhorn } from 'react-icons/im';

function Announcement() {
  const [announcementCard, setAnnouncementCard] = useState([]);
  const lenis = useLenis();

  useEffect(() => {
    init(setAnnouncementCard);
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
        <div className=" h-screen bg-gray-200 w-full flex flex-col items-center">
          <h1 className="text-5xl font-bold text-black pb-10">Announcements</h1>

          <ul
            className="list bg-base-100 rounded-box shadow-md max-w-[70%] w-full max-h-[50%] overflow-y-auto"
            data-lenis-prevent
          >
            {announcementCard.map(
              (announcementCard) =>
                announcementCard.isDisplayed && (
                  <li
                    key={announcementCard.$id}
                    className="list-row gap-8 gap-y-4 p-4 border-b border-gray-200 rounded-none"
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
                    <p className="list-col-wrap text-sm">
                      {announcementCard.AnnouncementBody}
                    </p>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Announcement;
