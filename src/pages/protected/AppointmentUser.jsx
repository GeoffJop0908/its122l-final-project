import React from 'react';
import db from '../../assets/databases';
import { Query } from 'appwrite';

import { useEffect, useState } from 'react';
import AppointmentForm from '../../components/AppointmentForm';

function AppointmentUser() {
  const [appointmentCard, setAppointmentCard] = useState([]);

  useEffect(() => {
    init();
  }, [appointmentCard]);

  const init = async () => {
    const result = await db.appointment.list([Query.orderDesc('$createdAt')]);
    setAppointmentCard(result.documents);
  };

  return (
    <div className="pt-10 mx-auto p-5" style={{ backgroundColor: '#42614f' }}>
      <br className="my-[10rem]" />
      <br className="my-[10rem]" />
      <br className="my-[10rem]" />
      <br className="my-[10rem]" />
      <br className="my-[10rem]" />
      <br className="my-[10rem]" />
      <div className="text-center">
        <div className="text-5xl font-bold text-white pb-5">Welcome to Appointments</div>
        <div className="text-2xl font-bold text-white">Schedule an Appointment</div>
        <br className="mt-4" />
        <br className="mt-4" />
        <br className="mt-4" />
        <br className="mt-4" />
      </div>
      <div className="container pt-10 mx-auto p-4">
        {/* CRUD for users to appoint */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          {/* Input Add */}
          <div className="flex flex-col p-4 border border-gray-200 rounded-2xl ">
            <AppointmentForm setAppointmentCard={setAppointmentCard} />
          </div>
        </div>
        <br className="my-4" />

        {/* Displaying appointments - this div will serve as the appointment container and will contain all of the appointments in view */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="text-2xl pt-4 mb-4">GCF Appointments</div>
          {/* This div will load the announcements inside the container */}
          <div className="mb-2 pb-2 border-b border-gray-300 px-4 flex flex-row justify-between ">
            <div>Title</div>
            <div>Name</div>
            <div>Date</div>
          </div>
          {appointmentCard.map((appointmentCard) => (
            <div
              key={appointmentCard.$id}
              className="mb-4 p-4 border-b border-gray-200 flex flex-row justify-between "
            >
              <div>{appointmentCard.appointmentTitle}</div>
              <div>{appointmentCard.appointmentName}</div>
              <div>{appointmentCard.appointmentDate}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppointmentUser;
