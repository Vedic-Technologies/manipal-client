import React, { createContext, useState, useCallback } from 'react';

export const PatientIdContext = createContext(null);

export const PatientIdProvider = ({ children }) => {
  const [idOfPatient, setIdOfPatient] = useState(null);

  const handleUpdateId = (newId) => setIdOfPatient(newId);

  // Function to refetch patient data
  const refetchPatientOnUpdate = useCallback(async () => {
    try {
      // Logic to refetch patient data from API or wherever it's stored
      const updatedPatient = await fetchUpdatedPatient(); // Replace with actual data-fetching logic
      // Handle updating of patient data as needed

      console.log('Patient data updated successfully:', updatedPatient);
    } catch (error) {
      console.error('Error fetching updated patient data:', error);
      // Handle error
    }
  }, []);

  return (
    <PatientIdContext.Provider value={{ idOfPatient, handleUpdateId, refetchPatientOnUpdate }}>
      {children}
    </PatientIdContext.Provider>
  );
};
