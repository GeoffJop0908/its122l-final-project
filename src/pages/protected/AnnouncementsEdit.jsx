import { useEffect, useState } from 'react';
import AnnouncementForm from '../../components/AnnouncementForm';
import init from '../../appwrite/announcements';
import { useLenis } from 'lenis/react';
import db from '../../assets/databases';
import useAlertStore from '../../store/useAlertStore';
import { AiOutlineEdit } from 'react-icons/ai';
import Alerts from '../../components/Alerts';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { convertTime } from '../../lib/convertTime';

function AnnouncementsEdit() {
  const [announcementCard, setAnnouncementCard] = useState([]);
  const lenis = useLenis();
  const messages = useAlertStore((state) => state.messages);
  const addMessage = useAlertStore((state) => state.addMessage);

  useEffect(() => {
    init(setAnnouncementCard);
    if (lenis) {
      lenis.resize();
      lenis.start();
    }
  }, [lenis]);

  const showAnnouncement = async (annId, isDisplayed) => {
    const result = await db.announcement.update(annId, {
      isDisplayed: !isDisplayed,
    });
    if (result) {
      addMessage(
        `Visbility set to ${!isDisplayed ? 'visible' : 'hidden'}`,
        'success'
      );
    } else {
      addMessage('Visibility was not updated due to an error.', 'error');
    }
  };

  const handleDelete = async (id, message) => {
    const result = db.announcement.delete(id);

    if (result) {
      init(setAnnouncementCard);
      addMessage(`${message} was deleted`, 'success');
    } else {
      addMessage('Failed to delete the announcement', 'error');
    }
  };

  return (
    <div className="pt-10 p-30 bg-stone-200">
      <div className="text-stone-950 pb-10">
        <div className="text-4xl">Announcements</div>
        <div className="text-lg">Edit announcements</div>
      </div>
      {/* CRUD for admin */}
      <div className="flex flex-col gap-5">
        {/* Input Add */}
        <div
          className="flex flex-col p-4 border border-gray-200 rounded-2xl bg-jungle-green-800 max-h-[80vh]"
          data-lenis-prevent
        >
          <AnnouncementForm setAnnouncementCard={setAnnouncementCard} />
          <div className="overflow-auto max-h-1/2">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Body</th>
                  <th>Created at</th>
                  <th>Modified at</th>
                  <th>Visibility</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcementCard.length > 0 ? (
                  announcementCard.map((announcement, index) => (
                    <tr key={announcement.$id}>
                      <th>{announcementCard.length - index - 1}</th>
                      <EditableCell
                        initialValue={announcement.AnnouncementString}
                        annId={announcement.$id}
                        type="title"
                        fetchData={() => init(setAnnouncementCard)}
                      />
                      <EditableCell
                        initialValue={announcement.AnnouncementBody}
                        annId={announcement.$id}
                        type="body"
                        fetchData={() => init(setAnnouncementCard)}
                      />
                      <td>{convertTime(announcement.$createdAt)}</td>
                      <td>{convertTime(announcement.$updatedAt)}</td>
                      <td>{announcement.isDisplayed ? 'Visible' : 'Hidden'}</td>
                      <td className="flex gap-2 items-center">
                        <button
                          className="size-7 border-none bg-transparent text-stone-300 hover:text-jungle-green-500 active:text-jungle-green-300 transition-all ease-in-out duration-300 cursor-pointer"
                          onClick={() =>
                            showAnnouncement(
                              announcement.$id,
                              announcement.isDisplayed
                            )
                          }
                        >
                          {announcement.isDisplayed ? (
                            <FaRegEye className="size-full" />
                          ) : (
                            <FaRegEyeSlash className="size-full" />
                          )}
                        </button>
                        <button
                          className="size-7 border-none bg-transparent text-red-300 hover:text-stone-300 active:text-stone-400 transition-all ease-in-out duration-300 cursor-pointer"
                          onClick={() =>
                            handleDelete(
                              announcement.$id,
                              announcement.AnnouncementString
                            )
                          }
                        >
                          <RiDeleteBin5Line className="size-full" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      <span className="italic text-slate-300">
                        No announcements in the database.
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Alerts />
    </div>
  );
}

function EditableCell({ initialValue, annId, type, fetchData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const addMessage = useAlertStore((state) => state.addMessage);

  const handleSave = async (newValue) => {
    try {
      let result;
      switch (type) {
        case 'title':
          result = await db.announcement.update(annId, {
            AnnouncementString: newValue,
          });
          break;
        case 'body':
          result = await db.announcement.update(annId, {
            AnnouncementBody: newValue,
          });
          break;
        default:
          return;
      }

      if (result) {
        setValue(newValue);
        addMessage(
          `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } updated successfully`,
          'success'
        );
        fetchData();
      } else {
        setValue(initialValue);
        addMessage(`Failed to update ${type}`, 'error');
      }
    } catch (error) {
      setValue(initialValue);
      addMessage(`Failed to update ${type}`, 'error');
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    setValue(initialValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave(value);
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setValue(initialValue);
    }
  };

  return (
    <td className="relative group cursor-pointer">
      {isEditing ? (
        <input
          type="text"
          className="w-full p-1 border rounded focus:outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div
          className="flex items-center justify-between w-full"
          onClick={() => setIsEditing(true)}
        >
          <span>{value || 'N/A'}</span>
          <AiOutlineEdit className="size-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      )}
    </td>
  );
}

export default AnnouncementsEdit;
