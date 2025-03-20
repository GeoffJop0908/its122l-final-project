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
    <>
      <FeedbackForm setFeedbackCard={setFeedbackCard} />
    </>
  );
}

export default Feedback;
