import React, { useState } from 'react';

const DoctorsForm = () => {
  const [patient, setPatient] = useState({
    HOPI: '',
    familyHistory: '',
    environmentalHistory: '',
    HR: '',
    BP: '',
    RR: '',
    examination: '',
    spine: '',
    specialTest: '',
    deformity: '',
    respiratoryType: '',
    breathSound: '',
    examinationExtremity: {
      sensory: { left: '', right: '' },
      motor: { left: '', right: '' },
    },
    gaitEvaluation: '',
    functionalAssessment: '',
    disability: '',
    treatmentGoal: '',
    tendonJerks: {
      Knee: '',
      ankle: '',
      planter: '',
      biceps: '',
      triceps: '',
      BR: '',
      babinski: '',
      clonus: '',
    },
  });

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    if (dataset.parent) {
      setPatient((prevPatient) => ({
        ...prevPatient,
        [dataset.parent]: {
          ...prevPatient[dataset.parent],
          [name]: value,
        },
      }));
    } else {
      setPatient((prevPatient) => ({
        ...prevPatient,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(patient);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-200">
      <h2 className="text-lg font-bold mb-4">Patient Details</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block">HOPI:</label>
          <input
            type="text"
            name="HOPI"
            value={patient.HOPI}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Family History:</label>
          <input
            type="text"
            name="familyHistory"
            value={patient.familyHistory}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Environmental History:</label>
          <input
            type="text"
            name="environmentalHistory"
            value={patient.environmentalHistory}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">HR:</label>
          <input
            type="text"
            name="HR"
            value={patient.HR}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">BP:</label>
          <input
            type="text"
            name="BP"
            value={patient.BP}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">RR:</label>
          <input
            type="text"
            name="RR"
            value={patient.RR}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Examination:</label>
          <input
            type="text"
            name="examination"
            value={patient.examination}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Spine:</label>
          <input
            type="text"
            name="spine"
            value={patient.spine}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Special Test:</label>
          <input
            type="text"
            name="specialTest"
            value={patient.specialTest}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Deformity:</label>
          <input
            type="text"
            name="deformity"
            value={patient.deformity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Respiratory Type:</label>
          <input
            type="text"
            name="respiratoryType"
            value={patient.respiratoryType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Breath Sound:</label>
          <input
            type="text"
            name="breathSound"
            value={patient.breathSound}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Sensory Left:</label>
          <input
            type="text"
            name="left"
            value={patient.examinationExtremity.sensory.left}
            onChange={handleChange}
            data-parent="examinationExtremity.sensory"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Sensory Right:</label>
          <input
            type="text"
            name="right"
            value={patient.examinationExtremity.sensory.right}
            onChange={handleChange}
            data-parent="examinationExtremity.sensory"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Motor Left:</label>
          <input
            type="text"
            name="left"
            value={patient.examinationExtremity.motor.left}
            onChange={handleChange}
            data-parent="examinationExtremity.motor"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Motor Right:</label>
          <input
            type="text"
            name="right"
            value={patient.examinationExtremity.motor.right}
            onChange={handleChange}
            data-parent="examinationExtremity.motor"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Gait Evaluation:</label>
          <input
            type="text"
            name="gaitEvaluation"
            value={patient.gaitEvaluation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Functional Assessment:</label>
          <input
            type="text"
            name="functionalAssessment"
            value={patient.functionalAssessment}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Disability:</label>
          <input
            type="text"
            name="disability"
            value={patient.disability}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Treatment Goal:</label>
          <input
            type="text"
            name="treatmentGoal"
            value={patient.treatmentGoal}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* Tendon Jerks Fields */}
        <div>
          <label className="block">Tendon Jerks - Knee:</label>
          <input
            type="text"
            name="Knee"
            value={patient.tendonJerks.Knee}
            onChange={handleChange}
            data-parent="tendonJerks"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Tendon Jerks - Ankle:</label>
          <input
            type="text"
            name="ankle"
            value={patient.tendonJerks.ankle}
            onChange={handleChange}
            data-parent="tendonJerks"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Tendon Jerks - Planter:</label>
          <input
            type="text"
            name="planter"
            value={patient.tendonJerks.planter}
            onChange={handleChange}
            data-parent="tendonJerks"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Tendon Jerks - Biceps:</label>
          <input
            type="text"
            name="biceps"
            value={patient.tendonJerks.biceps}
            onChange={handleChange}
            data-parent="tendonJerks"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Tendon Jerks - Triceps:</label>
          <input
            type="text"
            name="triceps"
            value={patient.tendonJerks.triceps}
            onChange={handleChange}
            data-parent="tendonJerks"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Tendon Jerks - BR:</label>
          <input
            type="text"
            name="BR"
            value={patient.tendonJerks.BR}
            onChange={handleChange}
            data-parent="tendonJerks"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Tendon Jerks - Babinski:</label>
          <input
            type="text"
            name="babinski"
            value={patient.tendonJerks.babinski}
            onChange={handleChange}
            data-parent="tendonJerks"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Tendon Jerks - Clonus:</label>
          <input
            type="text"
            name="clonus"
            value={patient.tendonJerks.clonus}
            onChange={handleChange}
            data-parent="tendonJerks"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default DoctorsForm;
 