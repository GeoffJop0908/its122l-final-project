import React from 'react';
import db from '../assets/databases';
import { Query } from 'appwrite';
import Alerts from '../components/Alerts';

import { useEffect, useState } from 'react';
import FeedbackForm from '../components/FeedbackForm';

function Feedback() {
  const [feedbackCard, setFeedbackCard] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const result = await db.feedback.list([Query.orderDesc('$createdAt')]);
    setFeedbackCard(result.documents);
  };

  return (
    <div
      className="h-full bg-fixed bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
      }}
    >
      <div className="py-30 flex items-center justify-center bg-white/85">
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
      </div>
      <Alerts />
    </div>
  );
}

export default Feedback;
