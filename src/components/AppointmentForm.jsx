import React, { useState } from 'react';
import db from '../assets/databases';

function AppointmentForm({ setAppointmentCard }) {
 

    const handleAddApp = async (e) => {
        e.preventDefault();
    
        const appointmentTitle = e.target.appTitle.value;
        const appointmentName = e.target.appName.value;
        const appointmentDate = e.target.appDate.value;

        if (appointmentTitle === "" || appointmentDate ==="" || appointmentName === "") return;
    
        try {
          const payload = { appointmentTitle, appointmentName, appointmentDate };
          const response = await db.appointment.create(payload);
          setAppointmentCard((prevState) => [response, ...prevState]);
    
          e.target.reset();
    
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <form onSubmit={handleAddApp} id="appoint-form" className="my-4 flex flex-col items-center">
            <div className="flex flex-col items-center">

            
                <div className="container flex flex-col justify-between items-center">
                <div className="mb-2">
                    <div className="mb-4 text-xl font-bold">
                    Purpose of Appointment
                    </div>

                    <input
                    type="text"
                    name="appTitle"
                    placeholder="Enter purpose of appointment"
                    className="mb-2 py-2 w-2xl mr-6 px-5 border border-gray-300 rounded-full"
                    />
                </div>
                <div className="mb-2">
                    <div className="mb-4 text-xl font-bold">
                    Name
                    </div>
                    <input
                    type="text"
                    name="appName"
                    placeholder="Enter your name"
                    className="mb-2 py-2 w-2xl mr-6 px-5 border border-gray-300 rounded-full"
                    />
                </div>

                <div className="mb-2">
                    <div className="mb-4 text-xl font-bold">
                    Date of Appointment
                    </div>
                    <input
                    type="text"
                    name="appDate"
                    placeholder="Enter your date of Appointment"
                    className="mb-2 py-2 w-2xl mr-6 px-5 border border-gray-300 rounded-full"
                    />
                </div>


                <div className="mb-2">
                    <button
                    type="submit"
                    className="py-4 focus:outline-2 focus:outline-offset-2 focus:outline-green-500 px-7 text-black border border-green-800 rounded-full bg-green-300 text-black hover:text-white active:text-white hover:bg-green-500 active:bg-green-700"
                    >
                    Submit and Create an Appointment
                    </button>
                </div>

                </div>
            
            </div>
        </form>
    );
}

export default AppointmentForm;