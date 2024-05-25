import { trimText } from '../../util/General';
import { motion } from 'framer-motion';
import { useGetAllPatientsQuery, useGetPatientByIdQuery } from '../../API/API';
import { useState } from 'react';
import PatientDetailCardDoctor from '../patient/PatientDetailCardDoctor';
import PeriarthritisShoulderForm from './PeriarthritisShoulderForm';
import KidsForm from './KidsForm';
import AdultForm from './AdultForm';
import OldAgeForm from './OldAgeForm';

const DoctorPrescription = () => {
    const [showPatientForm, setShowPatientForm] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const TypeOfForm = ["soulder", "kids", "adult", "old age"];

    const { data: patients = [], error: patientsError, isLoading: isPatientsLoading, refetch } = useGetAllPatientsQuery("");
    const { data: patient, error: patientError, isLoading: isPatientLoading } = useGetPatientByIdQuery(selectedPatientId, {
        skip: !selectedPatientId,
    });

    const inactivePatients = patients.filter(patient => !patient.active);

    const showPatientInfo = (id) => {
        setSelectedPatientId(id);
        setShowPatientForm(true);
        console.log(id)
    };

    const renderForm = () => {
        switch (selectedForm) {
            case "soulder":
                return <PeriarthritisShoulderForm patientID={patient._id} />;
            case "kids":
                return <KidsForm patientID={patient._id} />;
            case "adult":
                return <AdultForm patientID={patient._id} />;
            case "old age":
                return <OldAgeForm patientID={patient._id} />;
            default:
                return <p>Select a form to display</p>;
        }
    };

    return (
        <div className="mt-10 pl-8 lg:pl-12 w-full">
            {isPatientsLoading ? (
                <p>Loading patients...</p>
            ) : patientsError ? (
                <p>Error loading patients: {patientsError.message}</p>
            ) : (
                <>
                    <div className="w-full pr-4 center">
                        <div className="flex gap-5 overflow-x-auto md:w-[600px] lg:w-[900px] xl:w-[1050px] 2xl:min-w-[1200px]">
                            {inactivePatients.map((item) => (
                                <div
                                    key={item._id}
                                    className="cursor-pointer shadow-md min-w-72 flex gap-5 p-2 border border-gray-300 rounded-xl"
                                    onClick={() => showPatientInfo(item._id)}
                                >
                                    <div>
                                        <img src={item.image} alt="" className="w-20 h-20 rounded-lg" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-semibold">{item.patientName}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full mt-10">
                        {showPatientForm && (
                            <div className="m-auto">
                                {isPatientLoading ? (
                                    <p>Loading patient details...</p>
                                ) : patientError ? (
                                    <p>Error fetching patient details: {patientError.message}</p>
                                ) : patient ? (
                                    <>
                                        <PatientDetailCardDoctor patient={patient} />
                                        <div className="p-4">
                                            <div className="flex space-x-2 mb-4">
                                                {TypeOfForm.map((formType) => (
                                                    <button
                                                        key={formType}
                                                        onClick={() => setSelectedForm(formType)}
                                                        className={`px-4 py-2 rounded-full ${selectedForm === formType ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                                                    >
                                                        {formType}
                                                    </button>
                                                ))}
                                            </div>
                                            <div>
                                                {renderForm()}
                                            </div>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default DoctorPrescription;
