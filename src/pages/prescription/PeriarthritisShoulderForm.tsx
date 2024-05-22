import React, { useState } from 'react'

const PeriarthritisShoulderForm = () => {
  const [selectedShoulder, setSelectedShoulder] = useState('right');
  const [durationPain, setDurationPain] = useState({ years: '', months: '', weeks: '', days: '' });
  const [natureOfPain, setNatureOfPain] = useState('continuous');
  const [symptoms, setSymptoms] = useState('improving');
  const [onset, setOnset] = useState('gradual');
  const [injury, setInjury] = useState('no');
  const [typeOfInjury, setTypeOfInjury] = useState('fall');
  const [aggravatingFactor, setAggravatingFactor] = useState('movement');
  const [relievingFactor, setRelievingFactor] = useState('rest');
  const [intensityOfPainAtNight, setIntensityOfPainAtNight] = useState('increased');
  const [sleepDisturbance, setSleepDisturbance] = useState('no');
  const [HTN, setHTN] = useState({ status: 'no', medication: '' });
  const [DM2, setDM2] = useState({ status: 'no', medication: '' });
  const [hypothyroidism, setHypothyroidism] = useState({ status: 'no', medication: '' });
  const [rxHistory, setRxHistory] = useState('');
  const [selectedShoulder1, setSelectedShoulder1] = useState('right');
  const [swelling, setSwelling] = useState('no');
  const [muscleWasting, setMuscleWasting] = useState('no');
  const [neurologicalDeficit, setNeurologicalDeficit] = useState('no');
  const [neurologicalType, setNeurologicalType] = useState('');
  const [capsularPattern, setCapsularPattern] = useState('no');
  const [muscleTightness, setMuscleTightness] = useState('no');
  const [musclesName, setMusclesName] = useState([]);
  const [tenderness, setTenderness] = useState([]);
  const [rom, setRom] = useState('left');
  const [musclePower, setMusclePower] = useState('fine');
  const [gripPinch, setGripPinch] = useState('strong');
  const [tone, setTone] = useState('normal');
  const [coordination, setCoordination] = useState('good');
  const [thumbDropTest, setThumbDropTest] = useState('');
  const [painfulArcTest, setPainfulArcTest] = useState('');
  const [adl, setAdl] = useState('');
  const [difficulty, setDifficulty] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [exercises, setExercises] = useState([]);

  const handleToggleExercise = (exercise) => {
    if (exercises.includes(exercise)) {
      setExercises(exercises.filter((item) => item !== exercise));
    } else {
      setExercises([...exercises, exercise]);
    }
  };

  //   const handleToggle = (setState, value) => setState(value);

  //   const handleToggleMultiple = (state, setState, value) => {
  //     if (state.includes(value)) {
  //       setState(state.filter((item) => item !== value));
  //     } else {
  //       setState([...state, value]);
  //     }
  //   };

  const handleToggle = (setState, value) => setState(value);

  const handleToggleMultiple = (state, setState, value) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleMedicationChange = (condition, value) => {
    switch (condition) {
      case 'HTN':
        setHTN({ ...HTN, medication: value });
        break;
      case 'DM2':
        setDM2({ ...DM2, medication: value });
        break;
      case 'Hypothyroidism':
        setHypothyroidism({ ...hypothyroidism, medication: value });
        break;
      default:
        break;
    }
  };


  return (
    <div className=' w-screen-4/5'>
      <form className="rounded shadow-md  mt-10">
        <div className='bg-slate-100 px-3 py-2 rounded'>
          <h2 className="text-2xl font-bold mb-4">Shoulder Pain & Stiffness</h2>
          <div className='flex gap-2 flex-wrap'>
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">C/C – Pain & Stiffness in Shoulder Joint</label>
              <div className="mt-2 flex space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedShoulder('right')}
                  className={`px-4 py-2 rounded-full border ${selectedShoulder === 'right' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Right
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedShoulder('left')}
                  className={`px-4 py-2 rounded-full border ${selectedShoulder === 'left' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Left
                </button>
              </div>
            </div>

            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <div className="mt-2 flex gap-2">
                <input
                  type="number"
                  placeholder="Years"
                  className="p-2 border border-gray-300 rounded w-20"
                />
                <input
                  type="number"
                  placeholder="Months"
                  className="p-2 border border-gray-300 rounded w-20"
                />
                <input
                  type="number"
                  placeholder="Weeks"
                  className="p-2 border border-gray-300 rounded w-20"
                />
                <input
                  type="number"
                  placeholder="Days"
                  className="p-2 border border-gray-300 rounded w-20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* HOPI */}
        <div className='mt-2 bg-slate-100 px-3 py-2 rounded'>
          <h2 className="text-2xl font-bold mb-4">HOPI Form</h2>
          <div className='flex gap-2 flex-wrap'>
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Duration of Pain Aggravation</label>
              <div className="mt-1 flex gap-2 ">
                <input
                  type="number"
                  placeholder="Years"
                  value={durationPain.years}
                  onChange={(e) => setDurationPain({ ...durationPain, years: e.target.value })}
                  className="p-2 border border-gray-300 rounded  w-20"
                />
                <input
                  type="number"
                  placeholder="Months"
                  value={durationPain.months}
                  onChange={(e) => setDurationPain({ ...durationPain, months: e.target.value })}
                  className="p-2 border border-gray-300 rounded  w-20"
                />
                <input
                  type="number"
                  placeholder="Weeks"
                  value={durationPain.weeks}
                  onChange={(e) => setDurationPain({ ...durationPain, weeks: e.target.value })}
                  className="p-2 border border-gray-300 rounded  w-20"
                />
                <input
                  type="number"
                  placeholder="Days"
                  value={durationPain.days}
                  onChange={(e) => setDurationPain({ ...durationPain, days: e.target.value })}
                  className="p-2 border border-gray-300 rounded  w-20"
                />
              </div>
            </div>

            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Nature of Pain</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => setNatureOfPain('continuous')}
                  className={`px-4 py-2 rounded-full border ${natureOfPain === 'continuous' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Continuous
                </button>
                <button
                  type="button"
                  onClick={() => setNatureOfPain('onActivity')}
                  className={`px-4 py-2 rounded-full border ${natureOfPain === 'onActivity' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  On Activity
                </button>
              </div>
            </div>

            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Symptoms</label>
              <div className="mt-1 flex gap-1">
                <button
                  type="button"
                  onClick={() => setSymptoms('improving')}
                  className={`px-4 py-2 rounded-full border ${symptoms === 'improving' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Improving
                </button>
                <button
                  type="button"
                  onClick={() => setSymptoms('worsening')}
                  className={`px-4 py-2 rounded-full border ${symptoms === 'worsening' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Worsening
                </button>
                <button
                  type="button"
                  onClick={() => setSymptoms('remainSame')}
                  className={`px-4 py-2 rounded-full border ${symptoms === 'remainSame' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Remain Same
                </button>
              </div>
            </div>

            <div className="mb-4  bg-slate-200 p-3 rounded w-96 center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Onset</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => setOnset('gradual')}
                  className={`px-4 py-2 rounded-full border ${onset === 'gradual' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Gradual
                </button>
                <button
                  type="button"
                  onClick={() => setOnset('sudden')}
                  className={`px-4 py-2 rounded-full border ${onset === 'sudden' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Sudden
                </button>
              </div>
            </div>

            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Injury</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => setInjury('yes')}
                  className={`px-4 py-2 rounded-full border ${injury === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setInjury('no')}
                  className={`px-4 py-2 rounded-full border ${injury === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </button>
              </div>
            </div>
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Relieving Factor</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => setRelievingFactor('rest')}
                  className={`px-4 py-2 rounded-full border ${relievingFactor === 'rest' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Rest
                </button>
                <button
                  type="button"
                  onClick={() => setRelievingFactor('medication')}
                  className={`px-4 py-2 rounded-full border ${relievingFactor === 'medication' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Medication
                </button>
              </div>
            </div>
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Type of Injury</label>
              <div className="mt-1 grid grid-cols-4 gap-2">
                {['fall', 'RTA', 'throwing', 'lifting'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTypeOfInjury(type)}
                    className={`px-4 py-2 rounded-full border ${typeOfInjury === type ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Aggravating Factor</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => setAggravatingFactor('movement')}
                  className={`px-4 py-2 rounded-full border ${aggravatingFactor === 'movement' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Any Movement of Shoulder Joint
                </button>
              </div>
            </div>



            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Intensity of Pain at Night</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIntensityOfPainAtNight('increased')}
                  className={`px-4 py-2 rounded-full border ${intensityOfPainAtNight === 'increased' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Increased
                </button>
                <button
                  type="button"
                  onClick={() => setIntensityOfPainAtNight('decreased')}
                  className={`px-4 py-2 rounded-full border ${intensityOfPainAtNight === 'decreased' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Decreased
                </button>
              </div>
            </div>
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Sleep Disturbance</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => setSleepDisturbance('yes')}
                  className={`px-4 py-2 rounded-full border ${sleepDisturbance === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setSleepDisturbance('no')}
                  className={`px-4 py-2 rounded-full border ${sleepDisturbance === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* PAST HISTORY */}

        <div className='mt-1 bg-slate-100 px-3 py-2 rounded'>
          <h2 className="text-2xl font-bold mb-4">Past History Form</h2>
          <div className='flex gap-2 flex-wrap'>
            {/* HTN */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 relative h-52">
              <label className="block text-sm font-medium text-gray-700 absolute top-5">HTN</label>
              <div className="mt-1 flex space-x-4 absolute top-12">
                <button
                  type="button"
                  onClick={() => setHTN({ ...HTN, status: 'yes' })}
                  className={`px-4 py-2 rounded-full border ${HTN.status === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setHTN({ ...HTN, status: 'no' })}
                  className={`px-4 py-2 rounded-full border ${HTN.status === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </button>
              </div>
              {HTN.status === 'yes' && (

                <div className="mt-4 flex flex-col gap-2 absolute bottom-2">
                  <button
                    type="button"
                    onClick={() => handleMedicationChange('HTN', 'regular')}
                    className={`px-4 py-2 rounded-full border ${HTN.medication === 'regular' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Regular Medications
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMedicationChange('HTN', 'irregular')}
                    className={`px-4 py-2 rounded-full border ${HTN.medication === 'irregular' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Irregular Medications
                  </button>
                </div>

              )}
            </div>

            {/* DM2 */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 relative h-52 ">
              <label className="block text-sm font-medium text-gray-700 absolute top-5">DM2</label>
              <div className="mt-1 flex space-x-4 absolute top-12">
                <button
                  type="button"
                  onClick={() => setDM2({ ...DM2, status: 'yes' })}
                  className={`px-4 py-2 rounded-full border ${DM2.status === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setDM2({ ...DM2, status: 'no' })}
                  className={`px-4 py-2 rounded-full border ${DM2.status === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </button>
              </div>
              {DM2.status === 'yes' && (
                <div className="mt-4 flex flex-col gap-2 absolute bottom-2">
                  <button
                    type="button"
                    onClick={() => handleMedicationChange('DM2', 'regular')}
                    className={`px-4 py-2 rounded-full border ${DM2.medication === 'regular' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Regular Medications
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMedicationChange('DM2', 'irregular')}
                    className={`px-4 py-2 rounded-full border ${DM2.medication === 'irregular' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Irregular Medications
                  </button>
                </div>
              )}
            </div>

            {/* Hypothyroidism */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 relative h-52 ">
              <label className="block text-sm font-medium text-gray-700 absolute top-5">Hypothyroidism</label>
              <div className="mt-1 flex space-x-4 absolute top-12">
                <button
                  type="button"
                  onClick={() => setHypothyroidism({ ...hypothyroidism, status: 'yes' })}
                  className={`px-4 py-2 rounded-full border ${hypothyroidism.status === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setHypothyroidism({ ...hypothyroidism, status: 'no' })}
                  className={`px-4 py-2 rounded-full border ${hypothyroidism.status === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </button>
              </div>
              {hypothyroidism.status === 'yes' && (
                <div className="mt-4 flex flex-col gap-2 absolute bottom-2">
                  <button
                    type="button"
                    onClick={() => handleMedicationChange('Hypothyroidism', 'regular')}
                    className={`px-4 py-2 rounded-full border ${hypothyroidism.medication === 'regular' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Regular Medications
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMedicationChange('Hypothyroidism', 'irregular')}
                    className={`px-4 py-2 rounded-full border ${hypothyroidism.medication === 'irregular' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Irregular Medications
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Rx History */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Rx History</label>
            <textarea
              value={rxHistory}
              onChange={(e) => setRxHistory(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="If any"
            />
          </div>
        </div>

        {/* ON EXAMINATION  */}

        <div className='mt-2 bg-slate-100 px-3 py-2 rounded'>
          <h2 className="text-2xl font-bold mb-4">On Examination Form</h2>
          <div className='flex gap-2 flex-wrap'>
            {/* Right / Left Shoulder */}

            <div className="mb-4  bg-slate-200 p-3 rounded w-96 center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Shoulder</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleToggle(setSelectedShoulder1, 'right')}
                  className={`px-4 py-2 rounded-full border ${selectedShoulder1 === 'right' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Right
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setSelectedShoulder1, 'left')}
                  className={`px-4 py-2 rounded-full border ${selectedShoulder1 === 'left' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Left
                </button>
              </div>
            </div>

            {/* Swelling */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Swelling</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleToggle(setSwelling, 'yes')}
                  className={`px-4 py-2 rounded-full border ${swelling === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setSwelling, 'no')}
                  className={`px-4 py-2 rounded-full border ${swelling === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Muscle Wasting */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Muscle Wasting</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleToggle(setMuscleWasting, 'yes')}
                  className={`px-4 py-2 rounded-full border ${muscleWasting === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setMuscleWasting, 'no')}
                  className={`px-4 py-2 rounded-full border ${muscleWasting === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </button>
              </div>
            </div>
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 relative h-44">
              <label className="block text-sm font-medium text-gray-700 absolute top-5">Neurological Deficit</label>
              <div className="mt-1 flex space-x-4 absolute top-12">
                <button
                  type="button"
                  onClick={() => handleToggle(setNeurologicalDeficit, 'yes')}
                  className={`px-4 py-2 rounded-full border ${neurologicalDeficit === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setNeurologicalDeficit, 'no')}
                  className={`px-4 py-2 rounded-full border ${neurologicalDeficit === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </button>
              </div>
              {neurologicalDeficit === 'yes' && (
                <div className="mt-4 flex space-x-4 absolute top-24">
                  <button
                    type="button"
                    onClick={() => handleToggle(setNeurologicalType, 'motor')}
                    className={`px-4 py-2 rounded-full border ${neurologicalType === 'motor' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    Motor
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggle(setNeurologicalType, 'sensory')}
                    className={`px-4 py-2 rounded-full border ${neurologicalType === 'sensory' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    Sensory
                  </button>
                </div>
              )}
            </div>

            {/* Capsular Pattern Altered */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 h-44">
              <label className="block text-sm font-medium text-gray-700">Capsular Pattern Altered</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleToggle(setCapsularPattern, 'yes')}
                  className={`px-4 py-2 rounded-full border ${capsularPattern === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setCapsularPattern, 'no')}
                  className={`px-4 py-2 rounded-full border ${capsularPattern === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Muscles Tightness */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 h-44">
              <label className="block text-sm font-medium text-gray-700">Muscles Tightness</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleToggle(setMuscleTightness, 'yes')}
                  className={`px-4 py-2 rounded-full border ${muscleTightness === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setMuscleTightness, 'no')}
                  className={`px-4 py-2 rounded-full border ${muscleTightness === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </button>
              </div>
            </div>
            <div className="mb-4 bg-slate-200 p-3 rounded w-[520px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Muscles Name</label>
              <div className="mt-1 grid grid-cols-3 gap-4">
                {['Supraspinatus', 'Infraspinatus', 'Subscapularis', 'Teres Minor', 'Deltoid', 'Pectoral'].map((muscle) => (
                  <button
                    type="button"
                    key={muscle}
                    onClick={() => handleToggleMultiple(musclesName, setMusclesName, muscle)}
                    className={`px-4 py-2 rounded-full border ${musclesName.includes(muscle) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    {muscle}
                  </button>
                ))}
              </div>
            </div>

            {/* Tenderness on */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[640px] center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Tenderness on</label>
              <div className="mt-1 grid grid-cols-3 gap-4">
                {['Supraspinatus Tendon', 'Deltoid Insertion', 'AC Joint'].map((tendernessPoint) => (
                  <button
                    type="button"
                    key={tendernessPoint}
                    onClick={() => handleToggleMultiple(tenderness, setTenderness, tendernessPoint)}
                    className={`px-4 py-2 rounded-full border ${tenderness.includes(tendernessPoint) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    {tendernessPoint}
                  </button>
                ))}
              </div>
            </div>
            {/* ROM */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">ROM</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleToggle(setRom, 'left')}
                  className={`px-4 py-2 rounded-full border ${rom === 'left' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Left Shoulder
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setRom, 'right')}
                  className={`px-4 py-2 rounded-full border ${rom === 'right' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Right Shoulder
                </button>
              </div>
            </div>

            {/* Muscle Power */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Muscle Power</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleToggle(setMusclePower, 'fine')}
                  className={`px-4 py-2 rounded-full border ${musclePower === 'fine' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  It's Fine
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setMusclePower, 'decreased')}
                  className={`px-4 py-2 rounded-full border ${musclePower === 'decreased' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Decreased due to pain
                </button>
              </div>
            </div>

            {/* Grip & Pinch */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Grip & Pinch</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleToggle(setGripPinch, 'strong')}
                  className={`px-4 py-2 rounded-full border ${gripPinch === 'strong' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Strong
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setGripPinch, 'weak')}
                  className={`px-4 py-2 rounded-full border ${gripPinch === 'weak' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Weak
                </button>
              </div>
            </div>
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Tone</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleToggle(setTone, 'normal')}
                  className={`px-4 py-2 rounded-full border ${tone === 'normal' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setTone, 'hypertonic')}
                  className={`px-4 py-2 rounded-full border ${tone === 'hypertonic' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Hypertonic
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setTone, 'hypotonic')}
                  className={`px-4 py-2 rounded-full border ${tone === 'hypotonic' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Hypotonic
                </button>
              </div>
            </div>

            {/* Coordination */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Coordination</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleToggle(setCoordination, 'good')}
                  className={`px-4 py-2 rounded-full border ${coordination === 'good' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Good
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setCoordination, 'moderate')}
                  className={`px-4 py-2 rounded-full border ${coordination === 'moderate' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Moderate
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setCoordination, 'poor')}
                  className={`px-4 py-2 rounded-full border ${coordination === 'poor' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Poor
                </button>
              </div>
            </div>
          </div>
          </div>
    
        {/* OTHERS CHATGPT 3.5 */}
        <div className='mt-2 bg-slate-100 px-3 py-2 rounded'>
          <h2 className="text-2xl font-bold mb-4">Physiotherapy Management Form</h2>
          <div className='flex gap-2 flex-wrap'>
            {/* Thumb Drop Test */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Thumb Drop Test</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleToggle(setThumbDropTest, 'positive')}
                  className={`px-4 py-2 rounded-full border ${thumbDropTest === 'positive' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Positive
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setThumbDropTest, 'negative')}
                  className={`px-4 py-2 rounded-full border ${thumbDropTest === 'negative' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Negative
                </button>
              </div>
            </div>

            {/* Painful Arc Test */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Painful Arc Test</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleToggle(setPainfulArcTest, 'positive')}
                  className={`px-4 py-2 rounded-full border ${painfulArcTest === 'positive' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Positive
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setPainfulArcTest, 'negative')}
                  className={`px-4 py-2 rounded-full border ${painfulArcTest === 'negative' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Negative
                </button>
              </div>
            </div>

            {/* Functional Assessment */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-96 center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Functional Assessment (ADL)</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleToggle(setAdl, 'dependent')}
                  className={`px-4 py-2 rounded-full border ${adl === 'dependent' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Dependent
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(setAdl, 'independent')}
                  className={`px-4 py-2 rounded-full border ${adl === 'independent' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Independent
                </button>
              </div>
            </div>
          </div>

          <div className='flex gap-2'>
            {/* Difficulty */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[575px] center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Difficulty in</label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                {['Clothing', 'Combing', 'Lifting Objects', 'Overhead activities', 'Grip & Pinch'].map((activity) => (
                  <button
                    type="button"
                    key={activity}
                    onClick={() => handleToggleMultiple(difficulty, setDifficulty, activity)}
                    className={`px-4 py-2 rounded-full border ${difficulty.includes(activity) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            {/* Physiotherapy Management Plan */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[585px] center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Physiotherapy Management Plan (Modalities)</label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                {[
                  'Moist Heat',
                  'SWD',
                  'Shock Wave',
                  'Combination Therapy',
                  'LASER',
                  'TENS',
                  'IFT',
                  'US',
                ].map((modality) => (
                  <button
                    type="button"
                    key={modality}
                    onClick={() => handleToggleMultiple(modalities, setModalities, modality)}
                    className={`px-4 py-2 rounded-full border ${modalities.includes(modality) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    {modality}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* EXERCISE PLAN */}
        <div className='mt-2 bg-slate-100 px-3 py-2 rounded'>

          <h2 className="text-2xl font-bold mb-4">Exercises Plan</h2>

          <div className="mb-4 bg-slate-200 p-3 rounded w-[800px] center flex-col gap-2 flex-wrap">
            <label className="block text-sm font-medium text-gray-700">Select Exercises</label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              {[
                'Graded Mobilization',
                'Capsular Stretching Exercises',
                'Strengthening of Rotator Cuff Muscles',
                'Avoid Jerky Movements',
                'Home Program Given',
                'Prognosis Well Explained in Patients Words',
              ].map((exercise) => (
                <button
                  type="button"
                  key={exercise}
                  onClick={() => handleToggleExercise(exercise)}
                  className={`px-4 py-2 rounded-full border ${exercises.includes(exercise) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  {exercise}
                </button>
              ))}
            </div>
          </div>



          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PeriarthritisShoulderForm