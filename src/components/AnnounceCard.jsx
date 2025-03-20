import React from 'react';
import { useState } from 'react';
import db from '../assets/databases';

function AnnounceCard({ setAnnoCard, announcementData }) {
  const [annCard, setAnnCard] = useState(announcementData);
  const [bodyCard, setBodyCard] = useState(false);
  const [bodyUpdateCard, setBodyUpdateCard] = useState();
  const [editPressed, setEditPressed] = useState(false);

  const handleUpdate = async () => {
    const isDisplayed = !annCard.isDisplayed;
    db.announcement.update(annCard.$id, { isDisplayed });
    setAnnCard({ ...annCard, isDisplayed: isDisplayed });
  };

  const showEdit = async () => {
    if (bodyCard === true) toggleBodyCard(false);
    setEditPressed(!editPressed);
  };

  const handleEdit = async (e) => {
    const AnnouncementBody = e.target.announceTBody.value;
    if (annCard.AnnouncementBody == AnnouncementBody) return;

    try {
      db.announcement.update(annCard.$id, { AnnouncementBody });
      setBodyUpdateCard({ ...annCard, AnnouncementBody: AnnouncementBody });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    db.announcement.delete(annCard.$id);
    setAnnoCard((prevState) => prevState.filter((i) => i.$id !== annCard.$id));
  };

  const toggleBodyCard = () => {
    setBodyCard(!bodyCard);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex</div>-row">
        <div className="flex w-2/3" onClick={toggleBodyCard}>
          <input type="checkbox" checked={annCard.isDisplayed} readOnly />
          <span className="p-3 w-5/6 "> {annCard.AnnouncementString}</span>
        </div>
        <div className="flex w-1/3">
          <button
            className={`px-4 h-12 w-38 mx-2 border-none rounded-full ${
              annCard.isDisplayed ? 'bg-gray-300' : 'bg-gray-400'
            } text-black hover:bg-green-500 active:bg-green-700`}
            onClick={handleUpdate}
          >
            {annCard.isDisplayed ? 'Hide' : 'Show'}
          </button>
          <div className="mx-2" />
          <button
            className="px-4 h-12 w-38 mx-2  border-none rounded-full bg-jungle-green-200 text-black hover:text-white active:text-white hover:bg-green-500 active:bg-gray-700"
            onClick={showEdit}
          >
            Edit
          </button>
          <button
            className="px-4 h-12 w-38 mx-2  border-none rounded-full bg-red-200 text-black hover:text-white active:text-white hover:bg-red-500 active:bg-red-700"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div className={`${bodyCard ? 'my-3' : 'my-0'}`}>
        {!bodyCard && editPressed && (
          <div>
            <div>
              <input
                type="text"
                name="announceTBody"
                value={annCard.AnnouncementBody}
                className="mb-2 py-2 w-2xl mr-6 px-5 border border-gray-300 rounded-full w-full my-7"
              />
            </div>
            <div>
              <button
                className="px-4 my-5 h-12 w-38 mx-2  border-none rounded-full bg-green-200 text-black hover:text-white active:text-white hover:bg-green-500 active:bg-green-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}
              >
                Confirm Edit
              </button>
            </div>
          </div>
        )}

        {bodyCard && (
          <div className="p-4 bg-jungle-green-600 rounded-lg">
            <p>{annCard.AnnouncementBody}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnnounceCard;
