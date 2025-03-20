import React from 'react';
import db from '../../assets/databases';
import { Query } from 'appwrite';
import { useEffect, useState } from 'react';
import FeedbackForm from '../../components/FeedbackForm';

function FeedbackUser() {
  const [feedbackCard, setFeedbackCard] = useState([]);

  useEffect(() => {
    init();
  }, [feedbackCard]);

  const init = async () => {
    const result = await db.feedback.list([Query.orderDesc('$createdAt')]);
    setFeedbackCard(result.documents);
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
        <div className="text-5xl font-bold text-white pb-5">
          Welcome to Feedback Page
        </div>
        <div className="text-2xl font-bold text-white">
          Generate feedback to help us improve
        </div>
        <br className="mt-4" />
        <br className="mt-4" />
        <br className="mt-4" />
        <br className="mt-4" />
      </div>
      <div className="container pt-10 mx-auto p-4">
        {/* CRUD for users to Feedback */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          {/* Input Add */}
          <div className="flex flex-col p-4 border border-gray-200 rounded-2xl ">
            <FeedbackForm setFeedbackCard={setFeedbackCard} />
          </div>
        </div>
        <br className="my-4" />

        {/* Displaying Feedbacks - this div will serve as the Feedback container and will contain all of the Feedbacks in view */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="text-2xl pt-4 mb-4">GCF Feedback</div>
          {/* This div will load the announcements inside the container */}
          <div className="mb-2 pb-2 border-b border-gray-300 px-4 flex flex-row justify-between ">
            <div>Title</div>
            <div>Content</div>
            <div>Date</div>
          </div>
          {feedbackCard.map((feedbackCard) => (
            <div
              key={feedbackCard.$id}
              className="mb-4 p-4 border-b border-gray-200 flex flex-row justify-between "
            >
              <div>{feedbackCard.feedbackTitle}</div>
              <div>{feedbackCard.feedbackBody}</div>
              <div>{feedbackCard.$createdAt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeedbackUser;
