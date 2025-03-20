import React from 'react';
import db from '../assets/databases';

function AnnouncementForm({ setAnnouncementCard }) {
  const handleAdd = async (e) => {
    e.preventDefault();

    const AnnouncementString = e.target.announceText.value;
    const AnnouncementBody = e.target.announceTBody.value;

    if (AnnouncementString === '' || AnnouncementBody === '') return;

    try {
      const payload = { AnnouncementString, AnnouncementBody };
      const response = await db.announcement.create(payload);
      setAnnouncementCard((prevState) => [response, ...prevState]);

      e.target.reset();
      document.getElementById('fields').close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleAdd}
      id="announce-form"
      className="my-4 flex flex-col items-center"
    >
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => {
            document.getElementById('fields').showModal();
          }}
          className="py-4 px-5 text-black rounded-full bg-jungle-green-300 hover:text-white active:text-white hover:bg-jungle-green-500 active:bg-jungle-green-700 my-4 cursor-pointer transition-all ease-in-out duration-300"
        >
          Create an Announcement
        </button>
        <dialog id="fields" className="modal">
          <div
            className="container flex flex-col justify-between items-center modal-box bg-jungle-green-800 w-3/5 max-h-3/5 overflow-auto"
            data-lenis-prevent
          >
            <div className="mb-2">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById('fields').close()}
              >
                ✕
              </button>
              <div className="mb-2 flex flex-col items-center">
                <div className="mb-4 text-xl font-bold">Title</div>
                <input
                  type="text"
                  name="announceText"
                  placeholder="Enter announcement title"
                  className="mb-2 py-2 w-2xl mr-6 px-5 border border-gray-300 rounded-full"
                />
                <div className="mb-4 text-xl font-bold">Announcement Body</div>
                <textarea
                  className="textarea w-full bg-transparent border-gray-300 rounded-xl mb-5"
                  name="announceTBody"
                  placeholder="Enter your announcement"
                ></textarea>
                <button
                  type="submit"
                  className="py-4 focus:outline-2 focus:outline-offset-2 focus:outline-green-500 px-7 text-black border border-jungle-green-800 rounded-full bg-jungle-green-300 hover:text-white active:text-white hover:bg-jungle-green-500 active:bg-green-700 cursor-pointer"
                  onSubmit={() => {
                    document.getElementById('fields').close();
                  }}
                >
                  Submit and Create Announcement
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </form>
  );
}

export default AnnouncementForm;
