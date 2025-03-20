import React from 'react';
import db from '../assets/databases';
import useAlertStore from '../store/useAlertStore';

function FeedbackForm({ setFeedbackCard }) {
  const addMessage = useAlertStore((state) => state.addMessage);

  const handleAddFeed = async (e) => {
    e.preventDefault();

    const feedbackTitle = e.target.feedTitle.value;
    const feedbackBody = e.target.feedName.value;

    if (feedbackTitle == '' || feedbackBody == '') {
      addMessage('One of the inputs are empty', 'error');
    } else {
      try {
        const payload = { feedbackTitle, feedbackBody };
        const response = await db.feedback.create(payload);
        setFeedbackCard((prevState) => [response, ...prevState]);

        addMessage('Your feedback was sent', 'success');
        e.target.reset();
      } catch (error) {
        addMessage(error, 'error');
      }
    }
  };

  return (
    <div className="grow w-1/2">
      <form
        onSubmit={handleAddFeed}
        id="feed-form"
        className="flex flex-col items-center justify-center h-full w-full text-white"
      >
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-lg  ">Title</legend>
          <input
            type="text"
            placeholder="Insert a title"
            className="input bg-jungle-green-950 w-full"
            name="feedTitle"
          />
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-lg">Feedback</legend>
          <textarea
            className="textarea w-full resize-none h-30 bg-jungle-green-950"
            placeholder="Insert your feedback"
            name="feedName"
          ></textarea>
        </fieldset>
        <div className="flex justify-center w-full pt-5">
          <button
            className="bg-jungle-green-950 text-white py-3 px-10 rounded text-lg hover:bg-jungle-green-700 active:bg-jungle-green-500 cursor-pointer transition-all ease-in-out duration-300"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
