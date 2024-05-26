import React, { useState } from 'react'
import {useSubmitShoulderProblemInDoctorPrescriptionMutation} from "../../API/API"
import { Button } from '../../components/ui/button';
import axios from 'axios';

const PeriarthritisShoulderForm = ({ patientID }) => {
  // Declare all necessary state variables
  const [painAndStiffnessSide, setPainAndStiffnessSide] = useState('Right');
  const [duration, setDuration] = useState({ years: 0, months: 0, weeks: 0, days: 0 });
  // const [patientId, setPatientId] = useState(patientID);
  const [durationOfPain, setDurationOfPain] = useState({ years: 0, months: 0, weeks: 0, days: 0 });
  const [natureOfPain, setNatureOfPain] = useState('Continuous');
  const [symptoms, setSymptoms] = useState('Improving');
  const [onset, setOnset] = useState('Gradual');
  const [injury, setInjury] = useState(true);
  const [relievingFactor, setRelievingFactor] = useState('Rest');
  const [injuryType, setInjuryType] = useState([]);
  const [aggravatingFactor, setAggravatingFactor] = useState('');
  const [intensityOfPainAtNight, setIntensityOfPainAtNight] = useState('Increased');
  const [sleepDisturbance, setSleepDisturbance] = useState(true);
  const [pastHistoryHTN, setPastHistoryHTN] = useState({ present: true, medication: '' });
  const [pastHistoryDM2, setPastHistoryDM2] = useState({ present: true, medication: 'On Regular Medications' });
  const [pastHistoryHypothyroidism, setPastHistoryHypothyroidism] = useState({ present: true });
  const [rxHistory, setRxHistory] = useState('');
  const [shoulderSide, setShoulderSide] = useState('Right');
  const [neurologicalDeficit, setNeurologicalDeficit] = useState({ present: true, type: 'Motor' });
  const [swelling, setSwelling] = useState(true);
  const [muscleWasting, setMuscleWasting] = useState(true);
  const [capsularPattern, setCapsularPattern] = useState(true);
  const [muscleTightness, setMuscleTightness] = useState(true);
  const [musclesName, setMusclesName] = useState([]);
  const [tenderness, setTenderness] = useState([]);
  const [rom, setRom] = useState('');
  const [tone, setTone] = useState('');
  const [musclePower, setMusclePower] = useState('');
  const [coordination, setCoordination] = useState('');
  const [gripPinch, setGripPinch] = useState('');
  const [thumbDropTest, setThumbDropTest] = useState('Positive');
  const [painfulArcTest, setPainfulArcTest] = useState('Positive');
  const [adl, setAdl] = useState('Dependent');
  const [difficulty, setDifficulty] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [exercises, setExercises] = useState([]);

  // Toggle functions for handling button state
  const handleToggle = (setStateFunction, value) => {
    setStateFunction(value);
  };

  const handleToggleMultiple = (stateArray, setStateFunction, value) => {
    const newStateArray = stateArray.includes(value) 
      ? stateArray.filter(item => item !== value) 
      : [...stateArray, value];
    setStateFunction(newStateArray);
  };

  const handleToggleExercise = (value) => {
    const newStateArray = exercises.includes(value) 
      ? exercises.filter(item => item !== value) 
      : [...exercises, value];
    setExercises(newStateArray);
  };

  const handleMedicationChange = (condition, medicationType) => {
    if (condition === 'HTN') {
      setPastHistoryHTN({ ...pastHistoryHTN, medication: medicationType });
    } else if (condition === 'DM2') {
      setPastHistoryDM2({ ...pastHistoryDM2, medication: medicationType });
    } else if (condition === 'NeurologicalDeficit') {
      setNeurologicalDeficit({ ...neurologicalDeficit, type: medicationType });
    }
  };

  // const handleIssueType=(condition)
  

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(patientID)
    const formData = {
      painAndStiffness: {
        side: painAndStiffnessSide,
        duration
      },
      patientId:patientID,
      Hopi: {
        durationOfPain,
        natureOfPain,
        symptoms,
        onset,
        injury,
        relievingFactor,
        injuryType,
        aggravatingFactor,
        intensityOfPainAtNight,
        sleepDisturbance
      },
      pastHistory: {
        HTN: pastHistoryHTN,
        DM2: pastHistoryDM2,
        hypothyroidism: pastHistoryHypothyroidism,
        rxHistory
      },
      onExamination: {
        shoulderSide,
        neurologicalDeficit,
        swelling,
        muscleWasting,
        capsularPatternAltered: capsularPattern,
        musclesTightness: muscleTightness,
        muscles: musclesName.map(name => ({
          name,
          tenderness: true
        })),
        ROM: {
          side: rom
        },
        tone,
        musclePower,
        coordination,
        gripAndPinch: gripPinch
      },
      physiotherapyManagement: {
        thumbDropTest,
        painfulArcTest,
        functionalAssessment: adl,
        difficultyIn: difficulty.map(activity => ({ activity })),
        modalities: modalities.map(modality => ({ modality }))
      },
      exercisesPlan: {
        gradedMobilization: exercises.includes('Graded Mobilization'),
        strengtheningOfRotatorCuffMuscles: exercises.includes('Strengthening of Rotator Cuff Muscles'),
        capsularStretchingExercises: exercises.includes('Capsular Stretching Exercises'),
        avoidJerkyMovements: exercises.includes('Avoid Jerky Movements'),
        homeProgramGiven: exercises.includes('Home Program Given'),
        prognosisWellExplainedInPatientsWords: exercises.includes('Prognosis Well Explained in Patients Words')
      }
    };

  
try {
  const response = await axios.post('https://manipal-server.onrender.com/api/patient/shoulder/register_problem', formData, {
  
  });
  console.log(formData)

  if (response.status === 200) {
    console.log('Form submitted successfully');
    
  } else {
    console.error('Form submission failed');
  }
} catch (error) {
  console.error('Error:', error);
}

  };

  // const handleHi = async (event) => {
  //   event.preventDefault();
  //   console.log(patientID)
  
    
  // const formData = {
  //   patientId: patientID,
  //   painAndStiffness: {
  //     side: "Left",
  //     duration: {
  //       years: 0,
  //       months: 1,
  //       weeks: 2,
  //       days: 3,
  //     },
  //   },
  //   Hopi: {
  //     durationOfPain: {
  //       years: 0,
  //       months: 1,
  //       weeks: 2,
  //       days: 3,
  //     },
  //     natureOfPain: "Continuous",
  //     symptoms: "Improving",
  //     onset: "Gradual",
  //     injury: true,
  //     relievingFactor: "Rest",
  //     injuryType: "Fall",
  //     aggravatingFactor: "Movement",
  //     intensityOfPainAtNight: "Increased",
  //     sleepDisturbance: true,
  //   },
  //   pastHistory: {
  //     HTN: {
  //       present: true,
  //       medication: "Amlodipine",
  //     },
  //     DM2: {
  //       present: true,
  //       medication: "On Regular Medications",
  //     },
  //     hypothyroidism: {
  //       present: false,
  //     },
  //     rxHistory: "None",
  //   },
  //   onExamination: {
  //     shoulderSide: "Right",
  //     neurologicalDeficit: {
  //       present: false,
  //       type: "",
  //     },
  //     swelling: true,
  //     muscleWasting: false,
  //     capsularPatternAltered: true,
  //     musclesTightness: true,
  //     muscles: [
  //       {
  //         name: "Supraspinatus",
  //         tenderness: true,
  //       },
  //       {
  //         name: "Deltoid",
  //         tenderness: false,
  //       },
  //     ],
  //     ROM: {
  //       side: "Right",
  //     },
  //     tone: "Normal",
  //     musclePower: "4/5",
  //     coordination: "Intact",
  //     gripAndPinch: "Strong",
  //   },
  //   physiotherapyManagement: {
  //     thumbDropTest: "Positive",
  //     painfulArcTest: "Negative",
  //     functionalAssessment: "Independent",
  //     difficultyIn: [
  //       { activity: "Lifting Objects" },
  //       { activity: "Overhead activities" },
  //     ],
  //     modalities: [
  //       { modality: "Moist Heat" },
  //       { modality: "TENS" },
  //     ],
  //   },
  //   exercisesPlan: {
  //     gradedMobilization: true,
  //     strengtheningOfRotatorCuffMuscles: true,
  //     capsularStretchingExercises: false,
  //     avoidJerkyMovements: true,
  //     homeProgramGiven: false,
  //     prognosisWellExplainedInPatientsWords: true,
  //   },
  // };
  
  //   try {
  //     console.log(formData)
  //     const response = await axios.post('https://manipal-server.onrender.com/api/patient/shoulder/register_problem', formData);
  // console.log(response)
  //     if (response.status === 200) {
  //       console.log('Form submitted successfully');
  //     } else {
  //       console.error('Form submission failed');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  return (
    <div className=' w-screen-4/5'>
      <form onSubmit={handleSubmit}  className="rounded shadow-md  mt-10">
        {/* <button onClick={handleHi}>HIIIII</button> */}
        <div className='bg-slate-100 px-3 py-2 rounded'>
          <h2 className="text-2xl font-bold mb-4">Shoulder Pain & Stiffness</h2>
          <div className='flex gap-2 flex-wrap'>
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">C/C – Pain & Stiffness in Shoulder Joint</label>
              <div className="mt-2 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setPainAndStiffnessSide('Right')}
                  className={`px-4 py-2 rounded-full border ${painAndStiffnessSide === 'Right' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Right
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setPainAndStiffnessSide('Left')}
                  className={`px-4 py-2 rounded-full border ${painAndStiffnessSide === 'Left' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
      value={duration.years}
      onChange={(e) => setDuration({ ...duration, years: e.target.value })}
      className="p-2 border border-gray-300 rounded w-20"
    />
    <input
      type="number"
      placeholder="Months"
      value={duration.months}
      onChange={(e) => setDuration({ ...duration, months: e.target.value })}
      className="p-2 border border-gray-300 rounded w-20"
    />
    <input
      type="number"
      placeholder="Weeks"
      value={duration.weeks}
      onChange={(e) => setDuration({ ...duration, weeks: e.target.value })}
      className="p-2 border border-gray-300 rounded w-20"
    />
    <input
      type="number"
      placeholder="Days"
      value={duration.days}
      onChange={(e) => setDuration({ ...duration, days: e.target.value })}
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
                  value={durationOfPain.years}
                  onChange={(e) => setDurationOfPain({ ...durationOfPain, years: e.target.value })}
                  className="p-2 border border-gray-300 rounded  w-20"
                />
                <input
                  type="number"
                  placeholder="Months"
                  value={durationOfPain.months}
                  onChange={(e) => setDurationOfPain({ ...durationOfPain, months: e.target.value })}
                  className="p-2 border border-gray-300 rounded  w-20"
                />
                <input
                  type="number"
                  placeholder="Weeks"
                  value={durationOfPain.weeks}
                  onChange={(e) => setDurationOfPain({ ...durationOfPain, weeks: e.target.value })}
                  className="p-2 border border-gray-300 rounded  w-20"
                />
                <input
                  type="number"
                  placeholder="Days"
                  value={durationOfPain.days}
                  onChange={(e) => setDurationOfPain({ ...durationOfPain, days: e.target.value })}
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
                  onClick={() => setNatureOfPain('Continuous')}
                  className={`px-4 py-2 rounded-full border ${natureOfPain === 'Continuous' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Continuous
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setNatureOfPain('On Activity')}
                  className={`px-4 py-2 rounded-full border ${natureOfPain === 'On Activity' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => setSymptoms('Improving')}
                  className={`px-4 py-2 rounded-full border ${symptoms === 'Improving' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Improving
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setSymptoms('Worsening')}
                  className={`px-4 py-2 rounded-full border ${symptoms === 'Worsening' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Worsening
                </Button>
                <Button
                variant={'avgSizeBtn'}                  type="button"
                  onClick={() => setSymptoms('Remain Same')}
                  className={`px-4 py-2 rounded-full border ${symptoms === 'Remain Same' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => setOnset('Gradual')}
                  className={`px-4 py-2 rounded-full border ${onset === 'Gradual' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Gradual
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setOnset('Sudden')}
                  className={`px-4 py-2 rounded-full border ${onset === 'Sudden' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => setInjury(true)}
                  className={`px-4 py-2 rounded-full border ${injury? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setInjury(false)}
                  className={`px-4 py-2 rounded-full border ${!injury  ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => setRelievingFactor('Rest')}
                  className={`px-4 py-2 rounded-full border ${relievingFactor === 'Rest' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Rest
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setRelievingFactor('Medication')}
                  className={`px-4 py-2 rounded-full border ${relievingFactor === 'Medication' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Medication
                </Button>
              </div>
            </div>
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2 ">
              <label className="block text-sm font-medium text-gray-700">Type of Injury</label>
              <div className="mt-1 center gap-2 flex-wrap ">
                {['Fall', 'RTA', 'Throwing', 'Lifting'].map((type) => (
                  <Button
                  variant={'avgSizeBtn'}
                    key={type}
                    type="button"
                    onClick={() => setInjuryType(type)}
                    className={`px-4 py-2 rounded-full border ${injuryType === type ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => setIntensityOfPainAtNight('Increased')}
                  className={`px-4 py-2 rounded-full border ${intensityOfPainAtNight === 'Increased' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Increased
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => setIntensityOfPainAtNight('Decreased')}
                  className={`px-4 py-2 rounded-full border ${intensityOfPainAtNight === 'Decreased' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => setSleepDisturbance(true)}
                  className={`px-4 py-2 rounded-full border ${sleepDisturbance  ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setSleepDisturbance(false)}
                  className={`px-4 py-2 rounded-full border ${!sleepDisturbance ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => setPastHistoryHTN({ ...pastHistoryHTN, present: true })}
                  className={`px-4 py-2 rounded-full border ${pastHistoryHTN.present ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setPastHistoryHTN({ ...pastHistoryHTN, present: false })}
                  className={`px-4 py-2 rounded-full border ${! pastHistoryHTN.present ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </Button>
              </div>
              {pastHistoryHTN.present && (

                <div className="mt-4 flex flex-col gap-2 absolute bottom-2">
                  <Button
                  variant={'badaSizeBtn'}
                    type="button"
                    onClick={() => handleMedicationChange('HTN', 'On Regular Medications')}
                    className={`px-4 py-2 rounded-full border ${pastHistoryHTN.medication === 'On Regular Medications' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Regular Medications
                  </Button>
                  <Button
                  variant={'badaSizeBtn'}
                    type="button"
                    onClick={() => handleMedicationChange('HTN', 'On Irregular Medications')}
                    className={`px-4 py-2 rounded-full border ${pastHistoryHTN.medication === 'On Irregular Medications' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => setPastHistoryDM2({ ...pastHistoryDM2, present:true })}
                  className={`px-4 py-2 rounded-full border ${pastHistoryDM2.present ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setPastHistoryDM2({ ...pastHistoryDM2, present: false })}
                  className={`px-4 py-2 rounded-full border ${!pastHistoryDM2.present  ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </Button>
              </div>
              {pastHistoryDM2.present && (
                <div className="mt-4 flex flex-col gap-2 absolute bottom-2">
                  <Button
                  variant={'badaSizeBtn'}
                    type="button"
                    onClick={() => handleMedicationChange('DM2', 'On Regular Medications')}
                    className={`px-4 py-2 rounded-full border ${pastHistoryDM2.medication === 'On Regular Medications' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Regular Medications
                  </Button>
                  <Button
                  variant={'badaSizeBtn'}
                    type="button"
                    onClick={() => handleMedicationChange('DM2', 'On Irregular Medications')}
                    className={`px-4 py-2 rounded-full border ${pastHistoryDM2.medication === 'On Irregular Medications' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => setPastHistoryHypothyroidism({ ...pastHistoryHypothyroidism, present: true })}
                  className={`px-4 py-2 rounded-full border ${pastHistoryHypothyroidism.present ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setPastHistoryHypothyroidism({ ...pastHistoryHypothyroidism, present: false })}
                  className={`px-4 py-2 rounded-full border ${!pastHistoryHypothyroidism.present  ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </Button>
              </div>
              {/* {pastHistoryHypothyroidism.present  && (
                <div className="mt-4 flex flex-col gap-2 absolute bottom-2">
                  <Button
                  variant={'badaSizeBtn'}
                                      type="button"
                    onClick={() => handleMedicationChange('Hypothyroidism', 'regular')}
                    className={`px-4 py-2 rounded-full border ${pastHistoryHypothyroidism.medication === 'regular' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Regular Medications
                  </Button>
                  <Button
                  variant={'badaSizeBtn'}
                    type="button"
                    onClick={() => handleMedicationChange('Hypothyroidism', 'irregular')}
                    className={`px-4 py-2 rounded-full border ${pastHistoryHypothyroidism.medication === 'irregular' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    On Irregular Medications
                  </Button>
                </div>
              )} */}
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
                  onClick={() => handleToggle(setShoulderSide, 'Right')}
                  className={`px-4 py-2 rounded-full border ${shoulderSide === 'Right' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Right
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setShoulderSide, 'Left')}
                  className={`px-4 py-2 rounded-full border ${shoulderSide === 'Left' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => handleToggle(setSwelling, true)}
                  className={`px-4 py-2 rounded-full border ${swelling ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => handleToggle(setSwelling, false)}
                  className={`px-4 py-2 rounded-full border ${!swelling  ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => handleToggle(setMuscleWasting, true)}
                  className={`px-4 py-2 rounded-full border ${muscleWasting  ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => handleToggle(setMuscleWasting, false)}
                  className={`px-4 py-2 rounded-full border ${!muscleWasting  ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => setNeurologicalDeficit({ ...neurologicalDeficit, present: true })}
                  className={`px-4 py-2 rounded-full border ${neurologicalDeficit.present ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => setNeurologicalDeficit({ ...neurologicalDeficit, present: false })}
                  className={`px-4 py-2 rounded-full border ${!neurologicalDeficit.present ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  No
                </Button>
              </div>
              {neurologicalDeficit.present  && (
                <div className="mt-4 flex gap-2 absolute top-24">
                  <Button
                  variant={'avgSizeBtn'}
                    type="button"
                    onClick={() => handleMedicationChange('NeurologicalDeficit', 'Motor')}
                    className={`px-4 py-2 rounded-full border ${neurologicalDeficit.type === 'Motor' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                  >
                    Motor
                  </Button>
                  <Button
                  variant={'avgSizeBtn'}
                    type="button"
                    onClick={() => handleMedicationChange('NeurologicalDeficit', 'Sensory')}
                    className={`px-4 py-2 rounded-full border ${neurologicalDeficit.type === 'Sensory' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => handleToggle(setCapsularPattern, true)}
                  className={`px-4 py-2 rounded-full border ${capsularPattern ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => handleToggle(setCapsularPattern, false)}
                  className={`px-4 py-2 rounded-full border ${!capsularPattern  ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => handleToggle(setMuscleTightness, true)}
                  className={`px-4 py-2 rounded-full border ${muscleTightness ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Yes
                </Button>
                <Button
                variant={'yesNoBtn'}
                  type="button"
                  onClick={() => handleToggle(setMuscleTightness, false)}
                  className={`px-4 py-2 rounded-full border ${!muscleTightness ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
            {/* <div className="mb-4 bg-slate-200 p-3 rounded w-[550px] center flex-col gap-2">
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
            </div> */}
            {/* ROM */}
            <div className="mb-4 bg-slate-200 p-3 rounded w-[500px] center flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">ROM</label>
              <div className="mt-1 flex space-x-4">
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setRom, 'Left')}
                  className={`px-4 py-2 rounded-full border ${rom === 'Left' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Left Shoulder
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setRom, 'Right')}
                  className={`px-4 py-2 rounded-full border ${rom === 'Right' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => handleToggle(setMusclePower, 'Decreased')}
                  className={`px-4 py-2 rounded-full border ${musclePower === 'Decreased' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => handleToggle(setThumbDropTest, 'Positive')}
                  className={`px-4 py-2 rounded-full border ${thumbDropTest === 'Positive' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Positive
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setThumbDropTest, 'Negative')}
                  className={`px-4 py-2 rounded-full border ${thumbDropTest === 'Negative' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => handleToggle(setPainfulArcTest, 'Positive')}
                  className={`px-4 py-2 rounded-full border ${painfulArcTest === 'Positive' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Positive
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setPainfulArcTest, 'Negative')}
                  className={`px-4 py-2 rounded-full border ${painfulArcTest === 'Negative' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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
                  onClick={() => handleToggle(setAdl, 'Dependent')}
                  className={`px-4 py-2 rounded-full border ${adl === 'Dependent' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                >
                  Dependent
                </Button>
                <Button
                variant={'avgSizeBtn'}
                  type="button"
                  onClick={() => handleToggle(setAdl, 'Independent')}
                  className={`px-4 py-2 rounded-full border ${adl === 'Independent' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
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