import React, { createContext, useState } from 'react';

export const PatientIdContext = createContext(null);

export const PatientIdProvider = ({ children }) => {
    const [idOfPatient, setIdOfPatient] = useState(null);

    const handleUpdateId = (newId) => setIdOfPatient(newId);

    return (
        <PatientIdContext.Provider value={{ idOfPatient, handleUpdateId }}>
            {children}
        </PatientIdContext.Provider>
    );
};
