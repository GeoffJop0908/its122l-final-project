import React, { useState, useRef, useEffect } from 'react';
import { IoIosCalendar } from 'react-icons/io';
import { cn } from '../lib/utils';

export default function Calendar({ selectedDate, setSelectedDate }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const buttonRef = useRef(null);

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
    <div className="relative mb-6">
      <button
        ref={buttonRef}
        onClick={toggleCalendar}
        className={cn(
          'input cursor-pointer bg-transparent border border-gray-300 rounded-full text-slate-400 pl-5 w-md',
          { 'text-white': selectedDate !== 'Pick a Date' }
        )}
        name="appointmentDate"
        type="button"
      >
        {selectedDate}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <IoIosCalendar className="text-white size-6" />
        </div>
      </button>

      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute left-1/2 transform -translate-x-1/2 mt-1 bg-jungle-green-950 text-stone-100 rounded shadow-lg z-10"
        >
          <calendar-date className="cally" onchange={handleDateChange}>
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
  );
}
