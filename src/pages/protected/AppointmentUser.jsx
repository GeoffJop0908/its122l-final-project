import React from 'react';
import db from '../../assets/databases';
import { Query } from 'appwrite';
import { useEffect, useState } from 'react';
import AppointmentForm from '../../components/AppointmentForm';
import { formatDate } from '../../lib/convertTimeDash';
import { useAuth } from '../../utils/AuthContext';
import useAlertStore from '../../store/useAlertStore';
import { AiOutlineEdit } from 'react-icons/ai';
import Alerts from '../../components/Alerts';
import { RiDeleteBin5Line } from 'react-icons/ri';

function AppointmentUser() {
  const [appointmentCard, setAppointmentCard] = useState([]);
  const { user } = useAuth();
  const addMessage = useAlertStore((state) => state.addMessage);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const result = await db.appointment.list([Query.orderDesc('$createdAt')]);
    setAppointmentCard(result.documents);
  };

  const roles = ['admin', 'editor'];

  const isAllowed = roles.some((role) => user.labels.includes(role));

  const handleDelete = async (id, message) => {
    const result = await db.appointment.delete(id);

    if (result) {
      init();
      addMessage(`${message} was deleted`, 'success');
    } else {
      addMessage('Failed to delete the announcement', 'error');
    }
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
        {isAllowed && (
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {appointmentCard.length > 0 ? (
                    appointmentCard.map((appointment, i) => (
                      <tr key={appointment.$id}>
                        <th>{appointmentCard.length - i - 1}</th>
                        <EditableCell
                          initialValue={appointment.purpose}
                          id={appointment.$id}
                          type="purpose"
                          fetchData={init}
                        />
                        <EditableCell
                          initialValue={appointment.description}
                          id={appointment.$id}
                          type="description"
                          fetchData={init}
                        />
                        <td>{appointment.user}</td>
                        <td>{formatDate(appointment.date)}</td>
                        <td className="text-center">
                          <button
                            className="size-7 border-none bg-transparent text-red-400 hover:text-stone-300 active:text-stone-400 transition-all ease-in-out duration-300 cursor-pointer"
                            onClick={() =>
                              handleDelete(appointment.$id, appointment.purpose)
                            }
                          >
                            <RiDeleteBin5Line className="size-full" />
                          </button>
                        </td>
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
        )}
      </div>
      <Alerts />
    </div>
  );
}

function EditableCell({ initialValue, id, type, fetchData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const addMessage = useAlertStore((state) => state.addMessage);

  const handleSave = async (newValue) => {
    try {
      let result;
      switch (type) {
        case 'purpose':
          result = await db.appointment.update(id, {
            purpose: newValue,
          });
          break;
        case 'description':
          result = await db.appointment.update(id, {
            description: newValue,
          });
          break;
        case 'date':
          result = await db.appointment.update(id, {
            date: newValue,
          });
          break;
        default:
          return;
      }

      if (result) {
        setValue(newValue);
        addMessage(
          `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } updated successfully`,
          'success'
        );
        fetchData();
      } else {
        setValue(initialValue);
        addMessage(`Failed to update ${type}`, 'error');
      }
    } catch (error) {
      setValue(initialValue);
      addMessage(`Failed to update ${type}`, 'error');
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    setValue(initialValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave(value);
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setValue(initialValue);
    }
  };

  return (
    <td className="relative group cursor-pointer">
      {isEditing ? (
        <textarea
          className="textarea textarea-ghost !bg-transparent h-full w-full p-1 border rounded focus:outline-none resize-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div
          className="flex items-center justify-between w-full"
          onClick={() => setIsEditing(true)}
        >
          <span className="flex-1">
            {value || (
              <span className="italic text-slate-300">
                No information available
              </span>
            )}
          </span>
          <AiOutlineEdit className="size-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      )}
    </td>
  );
}

export default AppointmentUser;
