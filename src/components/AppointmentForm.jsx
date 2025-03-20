import React, { useState } from 'react';
import db from '../assets/databases';
import Calendar from './Calendar';
import { useAuth } from '../utils/AuthContext';
import useAlertStore from '../store/useAlertStore';

function AppointmentForm({ setAppointmentCard }) {
  const [purpose, setPurpose] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('Pick a Date');
  const { user } = useAuth();
  const addMessage = useAlertStore((state) => state.addMessage);

  const isPastDate = (dateString) => {
    const selected = new Date(dateString);
    const today = new Date();

    // Reset time to midnight for accurate date-only comparison
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    return selected < today;
  };

  const handleAddApp = async (e) => {
    e.preventDefault();

    if (
      purpose === '' ||
      description === '' ||
      selectedDate === 'Pick a Date'
    ) {
      addMessage('One of the inputs is missing.', 'error');
    } else if (selectedDate !== 'Pick a Date' && isPastDate(selectedDate)) {
      addMessage('The selected date is in the past.', 'error');
    } else {
      try {
        const payload = {
          purpose,
          description,
          date: selectedDate,
          user: user.name,
        };
        const response = await db.appointment.create(payload);
        setAppointmentCard((prevState) => [response, ...prevState]);

        addMessage(`Your appointment '${purpose}' has been sent`, 'success');
        setPurpose('');
        setDescription('');
        setSelectedDate('Pick a Date');
      } catch (error) {
        console.error(error);
        addMessage(error, 'error');
      }
    }
  };

  return (
    <form
      onSubmit={handleAddApp}
      id="appoint-form"
      className="my-4 flex flex-col items-center"
    >
      <div className="flex flex-col items-center">
        <div className="container flex flex-col justify-between items-center">
          <Section
            header="Purpose of Appointment"
            placeholder="Enter purpose of appointment"
            value={purpose}
            setChange={setPurpose}
          />
          <Section
            header="Description"
            placeholder="Enter the description"
            value={description}
            setChange={setDescription}
          />
          <div className="w-full">
            <Header text="Date" />
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>

        <div className="mb-2">
          <button
            type="submit"
            className="py-4 focus:outline-2 focus:outline-offset-2 focus:outline-white px-7 shadow-md rounded-full bg-jungle-green-900 text-white hover:text-white active:text-white hover:bg-jungle-green-700 active:bg-jungle-green-600 cursor-pointer transition-all ease-in-out"
          >
            Submit and Create an Appointment
          </button>
        </div>
      </div>
    </form>
  );
}

function Header({ text }) {
  return <div className="mb-4 text-xl font-bold">{text}</div>;
}

function Section({ header, placeholder, value, setChange }) {
  return (
    <div>
      <Header text={header} />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className="mb-2 py-2 w-md mr-6 px-5 border border-gray-300 rounded-full"
        onChange={(e) => setChange(e.target.value)}
      />
    </div>
  );
}

export default AppointmentForm;
