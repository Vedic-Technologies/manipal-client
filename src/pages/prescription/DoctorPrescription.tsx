import React, { useState } from 'react';

const DoctorPrescription = () => {
    const [notifications, setNotifications] = useState([
        // Sample notification data
        { name: "John Doe", sex: "Male", email: "john.doe@example.com" }
    ]);

    const [showDetails, setShowDetails] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleNotificationClick = (notification) => {
        setSelectedPatient(notification);
        setShowDetails(true);
    };

    const handleButtonClick = () => {
        if (notifications.length > 0) {
            setSelectedPatient(notifications[0]);
            setShowDetails(true);
        }
    };

    return (
        <div className='w-fit ml-20 mt-5 flex gap-5'>
            <div className="relative inline-block">
                <span className="absolute -top-2.5 -right-2.5 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                    {notifications.length}
                </span>
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-2xl border-none bg-none"
                >
                    🛎️
                </button>
            </div>

            {showDetails && (
                <div>
                    <button
                        onClick={handleButtonClick}
                        className="text-sm font-semibold bg-blue-200 rounded-sm cursor-pointer p-2"
                    >
                        There's A New Patient <p>Click To Open</p>
                    </button>
                </div>
            )}

            {selectedPatient && (
                <div className='ml-4 w-2/3 border p-4 bg-gray-100 rounded'>
                    <h2 className="text-lg font-semibold">Name: {selectedPatient.name}</h2>
                    <p className="text-lg font-semibold">Sex: {selectedPatient.sex}</p>
                    <p className="text-lg font-semibold">Email: {selectedPatient.email}</p>
                    <div className='mt-4 '>
                        <input
                            type="text"
                            placeholder='Describe The Issues'
                            className='w-full p-2 border rounded h-[400px] w-[200px]'
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorPrescription;
