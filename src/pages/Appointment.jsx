import 'cally';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Appointment() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-start h-[90vh] text-stone-950">
        {/*Navigation Bar Color/Background*/}

        {/* Main Content Pane */}
        <div className="w-full flex flex-col items-center py-15">
          <div className="w-full max-w-4xl mx-auto px-8">
            <h1 className="text-5xl font-bold  pb-10">Book an Appointment</h1>

            <p className="text-lg text-justify  mb-10 leading-relaxed">
              Schedule your appointment with ease. Choose a date and time that
              works for you, and let us take care of the rest. Book now to get
              started!
            </p>
            {/* Book Appointment Button - Centered */}
            <div className="flex justify-center mt-8">
              <button
                className="bg-stone-700 text-white py-3 px-20 rounded cursor-pointer"
                onClick={() => navigate('/user/appointment')}
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointment;
