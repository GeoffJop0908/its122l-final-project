import React from 'react';
import db from '../../assets/databases';
import { Query } from 'appwrite';
import { useEffect, useState } from 'react';
import AppointmentForm from '../../components/AppointmentForm';
import { formatDate } from '../../lib/convertTimeDash';

function AppointmentUser() {
  const [appointmentCard, setAppointmentCard] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const result = await db.appointment.list([Query.orderDesc('$createdAt')]);
    setAppointmentCard(result.documents);
  };

  return (
    <div className="pt-10 p-30 bg-stone-200">
      <div className="text-stone-950">
        <div className="text-4xl">Appointments</div>
        <div className="text-lg">Schedule an Appointment</div>
      </div>
      <div className="pt-10">
        {/* CRUD for users to appoint */}
        <div className="bg-jungle-green-800 shadow-md rounded-2xl p-6">
          <div className="text-2xl mb-4">Schedule your appointment</div>
          {/* Input Add */}
          <AppointmentForm setAppointmentCard={setAppointmentCard} />
        </div>
        <br className="my-4" />

        {/* Displaying appointments - this div will serve as the appointment container and will contain all of the appointments in view */}
        <div className="bg-jungle-green-800 shadow-md rounded-lg p-6">
          <div className="text-2xl pt-4 mb-4">GCF Appointments</div>
          {/* daisyui table */}
          <div
            className="overflow-x-auto rounded-box border border-base-content/5 max-h-[50vh]"
            data-lenis-prevent
          >
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Purpose</th>
                  <th>Description</th>
                  <th>User</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {appointmentCard.length > 0 ? (
                  appointmentCard.map((appointment, i) => (
                    <tr key={appointment.$id}>
                      <th>{appointmentCard.length - i - 1}</th>
                      <td>{appointment.purpose}</td>
                      <td>
                        {appointment.description ? (
                          appointment.description
                        ) : (
                          <span className="italic text-slate-300">
                            No description
                          </span>
                        )}
                      </td>
                      <td>{appointment.user}</td>
                      <td>{formatDate(appointment.date)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      <span className="italic text-slate-300">
                        No items in the database.
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentUser;
