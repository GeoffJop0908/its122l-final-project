import { useEffect, useState } from 'react';
import AnnouncementForm from '../../components/AnnouncementForm';
import AnnounceCard from '../../components/AnnounceCard';
import init from '../../appwrite/announcements';
import { useLenis } from 'lenis/react';

function AnnouncementsEdit() {
  const [announcementCard, setAnnouncementCard] = useState([]);
  const lenis = useLenis();

  useEffect(() => {
    init(setAnnouncementCard);
    if (lenis) {
      lenis.resize();
      lenis.start();
    }
  }, [announcementCard, lenis]);

  return (
    <div className="pt-10 p-30 bg-stone-200">
      <div className="text-stone-950 pb-10">
        <div className="text-4xl">Announcements</div>
        <div className="text-lg">Edit announcements</div>
      </div>
      <div className="container pt-10 mx-auto p-4 bg-jungle-green-950">
        {/* CRUD for admin */}
        <div className="shadow-md rounded-2xl p-6 bg-jungle-green-800">
          {/* Input Add */}
          <div className="flex flex-col p-4 border border-gray-200 rounded-2xl ">
            <AnnouncementForm setAnnouncementCard={setAnnouncementCard} />
            {/* CRUD announcement container */}
            <div>
              {announcementCard.map((announcementCard, index) => (
                <div
                  key={announcementCard.$id}
                  setAnnoCard={setAnnouncementCard}
                  className={`mb-4 p-4 border-b border-gray-200`}
                >
                  <AnnounceCard
                    key={announcementCard.$id}
                    announcementData={announcementCard}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <br className="my-4" />

        {/* Displaying announcements - this div will serve as the announcement container and will contain all of the announcements */}
        <div className="bg-jungle-green-800 shadow-md rounded-lg p-6">
          <div className="text-2xl pt-4 mb-4">GCF Announcements</div>
          {/* This div will load the announcements inside the container */}
          {announcementCard.map(
            (announcementCard) =>
              announcementCard.isDisplayed && (
                <div
                  key={announcementCard.$id}
                  className="mb-4 p-4 border-b border-gray-200"
                >
                  {announcementCard.AnnouncementString}
                  <br className="my-4" />
                  {announcementCard.AnnouncementBody}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default AnnouncementsEdit;
