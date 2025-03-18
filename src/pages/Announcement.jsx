import { useEffect, useState } from 'react';
import db from '../assets/databases';
import AnnouncementForm from '../components/AnnouncementForm';
import { Query } from 'appwrite';
import AnnounceCard from '../components/AnnounceCard';

function Announcement() {
  const [announcementCard, setAnnouncementCard] = useState([]);

  useEffect(() => {
    init();
  }, [announcementCard]);

  const init = async () => {
    const result = await db.announcement.list([Query.orderDesc('$createdAt')]);
    setAnnouncementCard(result.documents);
  };

  return (
    <div className="pt-10 mx-auto p-5" style={{ backgroundColor: '#42614f' }}>
      <br className="my-[10rem]" />
      <br className="my-[10rem]" />
      <br className="my-[10rem]" />
      <br className="my-[10rem]" />
      <br className="my-[10rem]" />
      <br className="my-[10rem]" />
      <div className="text-center">
        <div className="text-4xl text-white">Welcome to Announcements</div>
        <div className="text-lg text-white">Find the latest news</div>
        <br className="mt-4" />
        <br className="mt-4" />
        <br className="mt-4" />
        <br className="mt-4" />
      </div>
      <div className="container pt-10 mx-auto p-4">
        {/* CRUD for admin */}
        <div className="bg-white shadow-md rounded-2xl p-6">
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
        <div className="bg-white shadow-md rounded-lg p-6">
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

export default Announcement;
