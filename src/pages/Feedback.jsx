import React from 'react';
import db from "../assets/databases";
import { Query } from "appwrite";

import { useEffect, useState } from "react";
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
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '100vh',
        width: '100%',
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <FeedbackForm setFeedbackCard={setFeedbackCard} />
      </div>
    </div>
  );
}

export default Feedback;
