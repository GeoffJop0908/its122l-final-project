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
       <div className="flex flex-col items-center justify-start h-[90vh]">
        {/*Navigation Bar Color/Background*/}

        {/* Main Content Pane */}
        <div className="w-full flex flex-col items-center py-20">
          {/* Form Container */}
          <div className="max-w-6xl w-full flex flex-row justify-between">
            {/* Left Section */}
            <div className="w-5/12">
              <h1 className="text-5xl font-bold text-black mb-8">
                Send us a Feedback
              </h1>
              <div className="w-120 h-30 bg-gray-300 flex items-center justify-center mb-7">
                <span className="text-gray-500">Image Placeholder</span>
              </div>
              <p className="text-lg text-justify text-black mb-10 leading-relaxed">
              We’d love to hear from you! Share your thoughts, suggestions, 
              or experiences with us—your feedback helps us improve. Send us a message today!
              </p>
            </div>

            {/* Right Section */}
            <div className="w-5/12 justify-center">
              <fieldset className="fieldset mt-2">
                <legend className="fieldset-legend text-lg">
                  Username / Email:
                </legend>
                <input type="text" name="feedTitle" className="input w-full" />
              </fieldset>

              <fieldset className="fieldset mt-3">
                <legend className="fieldset-legend text-lg">Feedback:</legend>
                <textarea className="textarea w-full resize-none h-30" name="feedName"></textarea>
              </fieldset>

              <div className="flex justify-center w-full pt-5">
                <button className="bg-black text-white py-3 px-10 rounded text-lg hover:bg-green-500 active:bg-gray-500" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </form>
    );
}

export default FeedbackForm;