import React, { useState } from 'react';
import db from '../assets/databases';

function FeedbackForm({ setFeedbackCard }) {
    const handleAddFeed = async (e) => {
        e.preventDefault();
    
        const feedbackTitle = e.target.feedTitle.value;
        const feedbackBody = e.target.feedName.value;

        if (feedbackTitle === "" || feedbackBody ==="") return;
    
        try {
          const payload = { feedbackTitle, feedbackBody};
          const response = await db.feedback.create(payload);
          setFeedbackCard((prevState) => [response, ...prevState]);
    
          e.target.reset();
    
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <form onSubmit={handleAddFeed} id="feed-form" className="my-4 flex flex-col items-center">
            <div className="flex flex-col items-center">
            
                <div className="container flex flex-col justify-between items-center">
                <div className="mb-2">
                    <div className="mb-4 text-xl font-bold">
                        Feedback Title
                    </div>
                    <input
                    type="text"
                    name="feedTitle"
                    placeholder="Enter title"
                    className="mb-2 py-2 w-2xl mr-6 px-5 border border-gray-300 rounded-full"
                    />
                </div>
                <div className="mb-2">
                    <div className="mb-4 text-xl font-bold">
                        Feedback Content
                    </div>
                    <input
                    type="text"
                    name="feedName"
                    placeholder="Enter your feedback"
                    className="mb-2 py-2 w-2xl mr-6 px-5 border border-gray-300 rounded-full"
                    />
                </div>

                <div className="mb-2">
                    <button
                    type="submit"
                    className="py-4 focus:outline-2 focus:outline-offset-2 focus:outline-green-500 px-7 text-black border border-green-800 rounded-full bg-green-300 text-black hover:text-white active:text-white hover:bg-green-500 active:bg-green-700"
                    >
                    Submit and Generate Feedback
                    </button>
                </div>

                </div>
            
            </div>
        </form>
    );
}

export default FeedbackForm;