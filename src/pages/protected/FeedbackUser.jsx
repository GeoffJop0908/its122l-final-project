import React from 'react';
import db from '../../assets/databases';
import { Query } from 'appwrite';
import { useEffect, useState } from 'react';
import FeedbackForm from '../../components/FeedbackForm';
import Alerts from '../../components/Alerts';
import useAlertStore from '../../store/useAlertStore';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useAuth } from '../../utils/AuthContext';

function FeedbackUser() {
  const addMessage = useAlertStore((state) => state.addMessage);
  const [feedbackCard, setFeedbackCard] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const result = await db.feedback.list([Query.orderDesc('$createdAt')]);
    setFeedbackCard(result.documents);
  };

  const handleDelete = async (id, message) => {
    const result = await db.feedback.delete(id);

    if (result) {
      init();
      addMessage(`${message} was deleted`, 'success');
    } else {
      addMessage('Failed to delete the feedback', 'error');
    }
  };

  const roles = ['admin', 'editor'];

  const isAllowed = roles.some((role) => user.labels.includes(role));

  return (
    <div className="pt-10 p-30 bg-stone-200">
      <div className="text-stone-950">
        <div className="text-4xl">Feedback</div>
        <div className="text-lg">Give us a Feedback</div>
      </div>
      <div className="container pt-10 mx-auto p-4">
        {/* CRUD for users to Feedback */}
        <div className="bg-jungle-green-800 shadow-md rounded-2xl p-6 flex flex-col gap-10 items-center text-white">
          <div className="flex flex-col justify-between items-center w-1/2">
            {/* Left Section */}
            <h1 className="text-5xl font-bold  mb-8">Send us a Feedback</h1>
            <div className="w-120 h-80 bg-gray-300 flex items-center justify-center mb-7 border rounded-full">
              <img
                src="/pic5.png"
                alt="Feedback"
                className="w-full rounded-3xl h-full object-cover"
              />
            </div>
            <p className="text-lg text-justify mb-10 leading-relaxed">
              We’d love to hear from you! Share your thoughts, suggestions, or
              experiences with us—your feedback helps us improve. Send us a
              message today!
            </p>
          </div>
          <FeedbackForm setFeedbackCard={setFeedbackCard} />
        </div>
        <br className="my-4" />

        {/* Displaying Feedbacks - this div will serve as the Feedback container and will contain all of the Feedbacks in view */}
        {isAllowed && (
          <div className="bg-jungle-green-800 shadow-md rounded-lg p-6 text-stone-50">
            <div className="text-2xl pt-4 mb-4">GCF Feedbacks</div>
            {/* This div will load the announcements inside the container */}
            <div className="overflow-x-auto">
              <table className="table ">
                {/* head */}
                <thead>
                  <tr className="text-stone-50">
                    <th></th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbackCard.map((feedback, i) => (
                    <tr key={feedback.$id}>
                      <th>{feedbackCard.length - i}</th>
                      <EditableCell
                        initialValue={feedback.feedbackTitle}
                        id={feedback.$id}
                        type="title"
                        fetchData={init}
                      />
                      <EditableCell
                        initialValue={feedback.feedbackBody}
                        id={feedback.$id}
                        type="content"
                        fetchData={init}
                      />
                      <td>{feedback.$createdAt}</td>
                      <td className="text-center">
                        <button
                          className="size-7 border-none bg-transparent text-red-400 hover:text-stone-50 active:text-stone-400 transition-all ease-in-out duration-300 cursor-pointer"
                          onClick={() =>
                            handleDelete(feedback.$id, feedback.feedbackTitle)
                          }
                        >
                          <RiDeleteBin5Line className="size-full" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Alerts />
    </div>
  );
}

function EditableCell({ initialValue, id, type, fetchData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const addMessage = useAlertStore((state) => state.addMessage);

  const handleSave = async (newValue) => {
    try {
      let result;
      switch (type) {
        case 'title':
          result = await db.feedback.update(id, {
            feedbackTitle: newValue,
          });
          break;
        case 'content':
          result = await db.feedback.update(id, {
            feedbackBody: newValue,
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

export default FeedbackUser;
