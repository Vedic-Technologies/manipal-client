import React, { useState } from 'react'
import {useSubmitShoulderProblemInDoctorPrescriptionMutation} from "../../API/API"
import { Button } from '../../components/ui/button';
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

  const [submitShoulderProblemInDoctorPrescription]= useSubmitShoulderProblemInDoctorPrescriptionMutation()

  const handleToggleExercise = (exercise) => {
    if (exercises.includes(exercise)) {
      setExercises(exercises.filter((item) => item !== exercise));
    } else {
      setExercises([...exercises, exercise]);
    }
  };

  // console.log()
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      selectedShoulder,
      durationPain,
      natureOfPain,
      symptoms,
      onset,
      injury,
      typeOfInjury,
      aggravatingFactor,
      relievingFactor,
      intensityOfPainAtNight,
      sleepDisturbance,
      HTN,
      DM2,
      hypothyroidism,
      rxHistory,
      selectedShoulder1,
      swelling,
      muscleWasting,
      neurologicalDeficit,
      neurologicalType,
      capsularPattern,
      muscleTightness,
      musclesName,
      tenderness,
      rom,
      musclePower,
      gripPinch,
      tone,
      coordination,
      thumbDropTest,
      painfulArcTest,
      adl,
      difficulty,
      modalities,
      exercises,
    };

    try {
      await submitShoulderProblemInDoctorPrescription(formData).unwrap();
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Failed to submit form: ', error);
      alert('Failed to submit form');
    }
  };

  return (
    <div className=' w-screen-4/5'>
      <form onSubmit={handleSubmit} className="rounded shadow-md  mt-10">
        <div className='bg-slate-100 px-3 py-2 rounded'>
          <h2 className="text-2xl font-bold mb-4">Shoulder Pain & Stiffness</h2>
          <div className='flex gap-2 flex-wrap'>
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">C/C – Pain & Stiffness in Shoulder Joint</label>
              <div className="mt-2 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setSelectedShoulder('right')}
                  className={`px-4 py-2 rounded-full border ${selectedShoulder === 'right' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Right
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setSelectedShoulder('left')}
                  className={`px-4 py-2 rounded-full border ${selectedShoulder === 'left' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Left
                </Button>
              </div>
            </div>

            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 ">
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
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 ">
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

            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Nature of Pain</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setNatureOfPain('continuous')}
                  className={`px-4 py-2 rounded-full border ${natureOfPain === 'continuous' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Continuous
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setNatureOfPain('onActivity')}
                  className={`px-4 py-2 rounded-full border ${natureOfPain === 'onActivity' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  On Activity
                </Button>
              </div>
            </div>

            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Symptoms</label>
              <div className="mt-1 flex gap-1">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setSymptoms('improving')}
                  className={`px-4 py-2 rounded-full border ${symptoms === 'improving' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Improving
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setSymptoms('worsening')}
                  className={`px-4 py-2 rounded-full border ${symptoms === 'worsening' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Worsening
                </Button>
                <Button
                variant={'avgSizeBtn'}                  type="button"
                  onClick={() => setSymptoms('remainSame')}
                  className={`px-4 py-2 rounded-full border ${symptoms === 'remainSame' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Remain Same
                </Button>
              </div>
            </div>

            <div className="mb-4  bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Onset</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setOnset('gradual')}
                  className={`px-4 py-2 rounded-full border ${onset === 'gradual' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Gradual
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setOnset('sudden')}
                  className={`px-4 py-2 rounded-full border ${onset === 'sudden' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Sudden
                </Button>
              </div>
            </div>

            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Injury</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setInjury('yes')}
                  className={`px-4 py-2 rounded-full border ${injury === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setInjury('no')}
                  className={`px-4 py-2 rounded-full border ${injury === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </Button>
              </div>
            </div>
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Relieving Factor</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setRelievingFactor('rest')}
                  className={`px-4 py-2 rounded-full border ${relievingFactor === 'rest' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Rest
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setRelievingFactor('medication')}
                  className={`px-4 py-2 rounded-full border ${relievingFactor === 'medication' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Medication
                </Button>
              </div>
            </div>
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Type of Injury</label>
              <div className="mt-1 center gap-2 flex-wrap ">
                {['fall', 'RTA', 'throwing', 'lifting'].map((type) => (
                  <Button
                  variant={'avgSizeBtn'}
                    key={type}
                    type="button"
                    onClick={() => setTypeOfInjury(type)}
                    className={`px-4 py-2 rounded-full border ${typeOfInjury === type ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Aggravating Factor</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'badaSizeBtn'}
                  type="button"
                  onClick={() => setAggravatingFactor('movement')}
                  className={`px-4 py-2 rounded-full border ${aggravatingFactor === 'movement' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Any Movement of Shoulder Joint
                </Button>
              </div>
            </div>



            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Intensity of Pain at Night</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setIntensityOfPainAtNight('increased')}
                  className={`px-4 py-2 rounded-full border ${intensityOfPainAtNight === 'increased' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Increased
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setIntensityOfPainAtNight('decreased')}
                  className={`px-4 py-2 rounded-full border ${intensityOfPainAtNight === 'decreased' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Decreased
                </Button>
              </div>
            </div>
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Sleep Disturbance</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setSleepDisturbance('yes')}
                  className={`px-4 py-2 rounded-full border ${sleepDisturbance === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setSleepDisturbance('no')}
                  className={`px-4 py-2 rounded-full border ${sleepDisturbance === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        </div>


        {/* PAST HISTORY */}

        <div className='mt-1 bg-slate-100 px-3 py-2 rounded'>
          <h2 className="text-2xl font-bold mb-4">Past History Form</h2>
          <div className='flex gap-2 flex-wrap'>
            {/* HTN */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 relative h-52">
              <label className="block text-sm font-medium text-gray-700 absolute top-5">HTN</label>
              <div className="mt-1 flex space-x-4 absolute top-12">
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setHTN({ ...HTN, status: 'yes' })}
                  className={`px-4 py-2 rounded-full border ${HTN.status === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setHTN({ ...HTN, status: 'no' })}
                  className={`px-4 py-2 rounded-full border ${HTN.status === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </Button>
              </div>
              {HTN.status === 'yes' && (

                <div className="mt-4 flex flex-col gap-2 absolute bottom-2">
                  <Button
                  variant={'badaSizeBtn'}
                    type="button"
                    onClick={() => handleMedicationChange('HTN', 'regular')}
                    className={`px-4 py-2 rounded-full border ${HTN.medication === 'regular' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Regular Medications
                  </Button>
                  <Button
                  variant={'badaSizeBtn'}
                    type="button"
                    onClick={() => handleMedicationChange('HTN', 'irregular')}
                    className={`px-4 py-2 rounded-full border ${HTN.medication === 'irregular' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Irregular Medications
                  </Button>
                </div>

              )}
            </div>

            {/* DM2 */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 relative h-52 ">
              <label className="block text-sm font-medium text-gray-700 absolute top-5">DM2</label>
              <div className="mt-1 flex space-x-4 absolute top-12">
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setDM2({ ...DM2, status: 'yes' })}
                  className={`px-4 py-2 rounded-full border ${DM2.status === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setDM2({ ...DM2, status: 'no' })}
                  className={`px-4 py-2 rounded-full border ${DM2.status === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </Button>
              </div>
              {DM2.status === 'yes' && (
                <div className="mt-4 flex flex-col gap-2 absolute bottom-2">
                  <Button
                  variant={'badaSizeBtn'}
                    type="button"
                    onClick={() => handleMedicationChange('DM2', 'regular')}
                    className={`px-4 py-2 rounded-full border ${DM2.medication === 'regular' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Regular Medications
                  </Button>
                  <Button
                  variant={'badaSizeBtn'}
                    type="button"
                    onClick={() => handleMedicationChange('DM2', 'irregular')}
                    className={`px-4 py-2 rounded-full border ${DM2.medication === 'irregular' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Irregular Medications
                  </Button>
                </div>
              )}
            </div>

            {/* Hypothyroidism */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 relative h-52 ">
              <label className="block text-sm font-medium text-gray-700 absolute top-5">Hypothyroidism</label>
              <div className="mt-1 flex space-x-4 absolute top-12">
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setHypothyroidism({ ...hypothyroidism, status: 'yes' })}
                  className={`px-4 py-2 rounded-full border ${hypothyroidism.status === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setHypothyroidism({ ...hypothyroidism, status: 'no' })}
                  className={`px-4 py-2 rounded-full border ${hypothyroidism.status === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </Button>
              </div>
              {hypothyroidism.status === 'yes' && (
                <div className="mt-4 flex flex-col gap-2 absolute bottom-2">
                  <Button
                  variant={'badaSizeBtn'}
                                      type="button"
                    onClick={() => handleMedicationChange('Hypothyroidism', 'regular')}
                    className={`px-4 py-2 rounded-full border ${hypothyroidism.medication === 'regular' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Regular Medications
                  </Button>
                  <Button
                  variant={'badaSizeBtn'}
                    type="button"
                    onClick={() => handleMedicationChange('Hypothyroidism', 'irregular')}
                    className={`px-4 py-2 rounded-full border ${hypothyroidism.medication === 'irregular' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Irregular Medications
                  </Button>
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

            <div className="mb-4  bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Shoulder</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setSelectedShoulder1, 'right')}
                  className={`px-4 py-2 rounded-full border ${selectedShoulder1 === 'right' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Right
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setSelectedShoulder1, 'left')}
                  className={`px-4 py-2 rounded-full border ${selectedShoulder1 === 'left' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Left
                </Button>
              </div>
            </div>

            {/* Swelling */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Swelling</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => handleToggle(setSwelling, 'yes')}
                  className={`px-4 py-2 rounded-full border ${swelling === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => handleToggle(setSwelling, 'no')}
                  className={`px-4 py-2 rounded-full border ${swelling === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </Button>
              </div>
            </div>

            {/* Muscle Wasting */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Muscle Wasting</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => handleToggle(setMuscleWasting, 'yes')}
                  className={`px-4 py-2 rounded-full border ${muscleWasting === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => handleToggle(setMuscleWasting, 'no')}
                  className={`px-4 py-2 rounded-full border ${muscleWasting === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </Button>
              </div>
            </div>
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 relative h-44">
              <label className="block text-sm font-medium text-gray-700 absolute top-5">Neurological Deficit</label>
              <div className="mt-1 flex space-x-4 absolute top-12">
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => handleToggle(setNeurologicalDeficit, 'yes')}
                  className={`px-4 py-2 rounded-full border ${neurologicalDeficit === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => handleToggle(setNeurologicalDeficit, 'no')}
                  className={`px-4 py-2 rounded-full border ${neurologicalDeficit === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </Button>
              </div>
              {neurologicalDeficit === 'yes' && (
                <div className="mt-4 flex space-x-4 absolute top-24">
                  <Button
                  variant={'avgSizeBtn'}
                    type="button"
                    onClick={() => handleToggle(setNeurologicalType, 'motor')}
                    className={`px-4 py-2 rounded-full border ${neurologicalType === 'motor' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    Motor
                  </Button>
                  <Button
                  variant={'avgSizeBtn'}
                    type="button"
                    onClick={() => handleToggle(setNeurologicalType, 'sensory')}
                    className={`px-4 py-2 rounded-full border ${neurologicalType === 'sensory' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    Sensory
                  </Button>
                </div>
              )}
            </div>

            {/* Capsular Pattern Altered */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 h-44">
              <label className="block text-sm font-medium text-gray-700">Capsular Pattern Altered</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => handleToggle(setCapsularPattern, 'yes')}
                  className={`px-4 py-2 rounded-full border ${capsularPattern === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => handleToggle(setCapsularPattern, 'no')}
                  className={`px-4 py-2 rounded-full border ${capsularPattern === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </Button>
              </div>
            </div>

            {/* Muscles Tightness */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 h-44">
              <label className="block text-sm font-medium text-gray-700">Muscles Tightness</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => handleToggle(setMuscleTightness, 'yes')}
                  className={`px-4 py-2 rounded-full border ${muscleTightness === 'yes' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => handleToggle(setMuscleTightness, 'no')}
                  className={`px-4 py-2 rounded-full border ${muscleTightness === 'no' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </Button>
              </div>
            </div>
            <div className="mb-4 bg-slate-200 p-3 rounded w-[550px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Muscles Name</label>
              <div className="mt-1 grid grid-cols-3 gap-4">
                {['Supraspinatus', 'Infraspinatus', 'Subscapularis', 'Teres Minor', 'Deltoid', 'Pectoral'].map((muscle) => (
                  <Button
                  variant={'avgSizeBtn'}
                    type="button"
                    key={muscle}
                    onClick={() => handleToggleMultiple(musclesName, setMusclesName, muscle)}
                    className={`px-4 py-2 rounded-full border ${musclesName.includes(muscle) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    {muscle}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tenderness on */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[550px] center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Tenderness on</label>
              <div className="mt-1 grid grid-cols-3 gap-4">
                {['Supraspinatus Tendon', 'Deltoid Insertion', 'AC Joint'].map((tendernessPoint) => (
                  <Button
                  variant={'avgSizeBtn'}
                    type="button"
                    key={tendernessPoint}
                    onClick={() => handleToggleMultiple(tenderness, setTenderness, tendernessPoint)}
                    className={`px-4 py-2 rounded-full border ${tenderness.includes(tendernessPoint) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    {tendernessPoint}
                  </Button>
                ))}
              </div>
            </div>
            {/* ROM */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">ROM</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setRom, 'left')}
                  className={`px-4 py-2 rounded-full border ${rom === 'left' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Left Shoulder
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setRom, 'right')}
                  className={`px-4 py-2 rounded-full border ${rom === 'right' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Right Shoulder
                </Button>
              </div>
            </div>

            {/* Muscle Power */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Muscle Power</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setMusclePower, 'fine')}
                  className={`px-4 py-2 rounded-full border ${musclePower === 'fine' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  It's Fine
                </Button>
                <Button
                variant={'badaSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setMusclePower, 'decreased')}
                  className={`px-4 py-2 rounded-full border ${musclePower === 'decreased' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Decreased due to pain
                </Button>
              </div>
            </div>

            {/* Grip & Pinch */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Grip & Pinch</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setGripPinch, 'strong')}
                  className={`px-4 py-2 rounded-full border ${gripPinch === 'strong' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Strong
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setGripPinch, 'weak')}
                  className={`px-4 py-2 rounded-full border ${gripPinch === 'weak' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Weak
                </Button>
              </div>
            </div>
            <div className="mb-4 bg-slate-200 p-3 rounded w-[550px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Tone</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setTone, 'normal')}
                  className={`px-4 py-2 rounded-full border ${tone === 'normal' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Normal
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setTone, 'hypertonic')}
                  className={`px-4 py-2 rounded-full border ${tone === 'hypertonic' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Hypertonic
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setTone, 'hypotonic')}
                  className={`px-4 py-2 rounded-full border ${tone === 'hypotonic' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Hypotonic
                </Button>
              </div>
            </div>

            {/* Coordination */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[550px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Coordination</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setCoordination, 'good')}
                  className={`px-4 py-2 rounded-full border ${coordination === 'good' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Good
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setCoordination, 'moderate')}
                  className={`px-4 py-2 rounded-full border ${coordination === 'moderate' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Moderate
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setCoordination, 'poor')}
                  className={`px-4 py-2 rounded-full border ${coordination === 'poor' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Poor
                </Button>
              </div>
            </div>
          </div>
          </div>
    
        {/* OTHERS CHATGPT 3.5 */}
        <div className='mt-2 bg-slate-100 px-3 py-2 rounded'>
          <h2 className="text-2xl font-bold mb-4">Physiotherapy Management Form</h2>
          <div className='flex gap-2 flex-wrap'>
            {/* Thumb Drop Test */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Thumb Drop Test</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setThumbDropTest, 'positive')}
                  className={`px-4 py-2 rounded-full border ${thumbDropTest === 'positive' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Positive
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setThumbDropTest, 'negative')}
                  className={`px-4 py-2 rounded-full border ${thumbDropTest === 'negative' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Negative
                </Button>
              </div>
            </div>

            {/* Painful Arc Test */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Painful Arc Test</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setPainfulArcTest, 'positive')}
                  className={`px-4 py-2 rounded-full border ${painfulArcTest === 'positive' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Positive
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setPainfulArcTest, 'negative')}
                  className={`px-4 py-2 rounded-full border ${painfulArcTest === 'negative' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Negative
                </Button>
              </div>
            </div>

            {/* Functional Assessment */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Functional Assessment (ADL)</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setAdl, 'dependent')}
                  className={`px-4 py-2 rounded-full border ${adl === 'dependent' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Dependent
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setAdl, 'independent')}
                  className={`px-4 py-2 rounded-full border ${adl === 'independent' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Independent
                </Button>
              </div>
            </div>
          </div>

          <div className='flex gap-2'>
            {/* Difficulty */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[550px] center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Difficulty in</label>
              <div className="mt-1 center flex-wrap gap-2">
                {['Clothing', 'Combing', 'Lifting Objects', 'Overhead activities', 'Grip & Pinch'].map((activity) => (
                  <Button
                  variant={'avgSizeBtn'}
                    type="button"
                    key={activity}
                    onClick={() => handleToggleMultiple(difficulty, setDifficulty, activity)}
                    className={`px-4 py-2 rounded-full border ${difficulty.includes(activity) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    {activity}
                  </Button>
                ))}
              </div>
            </div>

            {/* Physiotherapy Management Plan */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[550px] center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Physiotherapy Management Plan (Modalities)</label>
              <div className="mt-1 center flex-wrap gap-2">
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
                  <Button
                  variant={'avgSizeBtn'}
                    type="button"
                    key={modality}
                    onClick={() => handleToggleMultiple(modalities, setModalities, modality)}
                    className={`px-4 py-2 rounded-full border ${modalities.includes(modality) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    {modality}
                  </Button>
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
                <Button
                variant={'badaSizeBtn'}
                  type="button"
                  key={exercise}
                  onClick={() => handleToggleExercise(exercise)}
                  className={`px-4 py-2 rounded-full border ${exercises.includes(exercise) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  {exercise}
                </Button>
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