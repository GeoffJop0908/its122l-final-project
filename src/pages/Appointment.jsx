import 'cally';
import { useState, useRef, useEffect } from 'react';

function Appointment() {
  const [selectedDate, setSelectedDate] = useState('Pick a Date');
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const buttonRef = useRef(null);

  // Function to handle date change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    // Close the popover after selecting a date
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [calendarRef, buttonRef]);

  return (
    <>
      <div className="flex flex-col items-center justify-start h-[90vh] text-stone-950">
        {/*Navigation Bar Color/Background*/}

        {/* Main Content Pane */}
        <div className="w-full flex flex-col items-center py-15">
          <div className="w-full max-w-4xl mx-auto px-8">
            <h1 className="text-5xl font-bold  pb-10">Book an Appointment</h1>

            <p className="text-lg text-justify  mb-10 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. "Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>

            {/* Form Container */}
            <div className="flex flex-col md:flex-row pl-[8%]">
              {/* Left Column */}
              <div className="flex-1">
                <div className="mb-2 text-jungle-green-950">
                  Appointment Type:
                </div>
                <div className="mb-6">
                  <select
                    defaultValue="Appointment Type"
                    className="select bg-stone-700 text-stone-100 cursor-pointer"
                  >
                    <option disabled={true}>Appointment Type</option>
                    <option>Wedding Ceremony</option>
                    <option>Christening/Baptism</option>
                    <option>Confirmation</option>
                    <option>Funeral Service</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1">
                <div className="mb-2 text-jungle-green-950">Date:</div>
                <div className="relative mb-6">
                  <button
                    ref={buttonRef}
                    onClick={toggleCalendar}
                    className="input bg-stone-700 cursor-pointer text-stone-100"
                  >
                    {selectedDate}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="text-stone-100"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                      </svg>
                    </div>
                  </button>

                  {showCalendar && (
                    <div
                      ref={calendarRef}
                      className="absolute left-0 mt-1 bg-stone-500 text-stone-100 rounded shadow-lg z-10"
                    >
                      <calendar-date
                        className="cally"
                        onchange={handleDateChange}
                      >
                        <svg
                          aria-label="Previous"
                          className="fill-current w-4 h-4"
                          slot="previous"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                        </svg>
                        <svg
                          aria-label="Next"
                          className="fill-current w-4 h-4"
                          slot="next"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                        </svg>
                        <calendar-month></calendar-month>
                      </calendar-date>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Book Appointment Button - Centered */}
            <div className="flex justify-center mt-8">
              <button className="bg-stone-700 text-white py-3 px-20 rounded cursor-pointer">
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
