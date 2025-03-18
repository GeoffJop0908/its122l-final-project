import React, { useState } from 'react';
import db from '../assets/databases';

function AnnouncementForm({ setAnnouncementCard }) {
  const [showFields, setShowFields] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();

    const AnnouncementString = e.target.announceText.value;
    const AnnouncementBody = e.target.announceTBody.value;

    if (AnnouncementString === "" || AnnouncementBody ==="") return;

    try {
      const payload = { AnnouncementString, AnnouncementBody };
      const response = await db.announcement.create(payload);
      setAnnouncementCard((prevState) => [response, ...prevState]);

      e.target.reset();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleAdd} id="announce-form" className="my-4 flex flex-col items-center">


      <div className="flex flex-col items-center">

        <button
          type="button"
          onClick={() => setShowFields(!showFields)}
          className="py-4 px-5 text-black rounded-full bg-green-300 text-black hover:text-white active:text-white hover:bg-green-500 active:bg-green-700 my-4"
        >
          {showFields ? "Hide Create Announcement Fields" : "Show Create Announcement Fields"}
        </button>

        {showFields && (
          <div className="container flex flex-col justify-between items-center">
            <div className="mb-2">
              <div className="mb-4 text-xl font-bold">
              Title
              </div>

              <input
                type="text"
                name="announceText"
                placeholder="Enter announcement title"
                className="mb-2 py-2 w-2xl mr-6 px-5 border border-gray-300 rounded-full"
              />
            </div>
            <div className="mb-2">
              <div className="mb-4 text-xl font-bold">
              Announcement Body
              </div>
              <input
                type="text"
                name="announceTBody"
                placeholder="Enter your announcement"
                className="mb-2 py-2 w-2xl mr-6 px-5 border border-gray-300 rounded-full"
              />
            </div>



            <div className="mb-2">
              <button
              type="submit"
              className="py-4 focus:outline-2 focus:outline-offset-2 focus:outline-green-500 px-7 text-black border border-green-800 rounded-full bg-green-300 text-black hover:text-white active:text-white hover:bg-green-500 active:bg-green-700"
              >
              Submit and Create Announcements
              </button>
            </div>

          </div>
        )}
      </div>
    </form>
  );
}

export default AnnouncementForm;

