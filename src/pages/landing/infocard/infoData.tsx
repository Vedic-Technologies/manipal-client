import { useEffect, useState } from 'react';
import income_today from '../infocard/icons/money-today.png';
import new_patient from '../infocard/icons/new_patient.png';
import patient_today from '../infocard/icons/patient_today.png';
import staff_available from '../infocard/icons/staff_available.png';
import { useGetAllPatientsQuery, useGetAllUsersQuery, useGetAllPaymentsQuery } from '../../../API/API';
import formatDate from '../../../util/TimeFormate';
export type InfoData = {
    title: string,
    count: number,
    icon: string,
    buttonText: string,
    cardUrl: string
}

export const initialData: InfoData[] = [
    {
      title: "Patients Today",
      count: 0,
      icon: patient_today,
      buttonText: "View Notifications",
      cardUrl: "/notifications"
    },
    {
      title: "New Patients",
      count: 0,
      icon: new_patient,
      buttonText: "View Messages",
      cardUrl: "/messages"
    },
    // {
    //   title: "Staff Available",
    //   count: 0,
    //   icon: staff_available,
    //   buttonText: "View Tasks",
    //   cardUrl: "/tasks"
    // },
    {
      title: "Income Today",
      count: 0,
      icon: income_today,
      buttonText: "View Reminders",
      cardUrl: "/reminders"
    }
];

export const useInfoData = () => {
    const [data, setData] = useState(initialData);
const {data:patientData} = useGetAllPatientsQuery("")
const{data:userData}= useGetAllUsersQuery("")
const {data:incomeData}= useGetAllPaymentsQuery("")
const today = formatDate(new Date());

    useEffect(() => {
        if (patientData) {
            setData(prevData => prevData.map(info => {
                if (info.title === "Patients Today") {
                 
                  const patientToday = patientData?.filter(patient => formatDate(new Date(patient?.createdAt)) === today).length;
                  console.log("patienttoday length:", patientToday)
                   console.log("today from code",today)  
                   console.log("today from data", formatDate(new Date(patientData[patientData.length - 1]?.createdAt)));
                  return { ...info, count: patientToday };

                }
                return info;
            }));
        }
        if (patientData) {
            setData(prevData => prevData.map(info => {
                if (info.title === "New Patients") {
                  const newPatient = patientData?.filter((patient) => patient?.checkUp_status === false)?.length;
                    console.log("new patient length",newPatient)
                  return { ...info, count: newPatient };
                }
                return info;
            }));
        }
        if (userData) {
            setData(prevData => prevData?.map(info => {
                if (info.title === "Staff Available") {
                  const numOfStaff = userData?.filter((user) => user?.userType === "staff")?.length;
                    return { ...info, count: numOfStaff };
                }
                return info;
            }));
        }
        if (incomeData && incomeData.length > 0) {
          setData(prevData => prevData?.map(info => {
              if (info.title === "Income Today") {
                  const incomeToday = incomeData
                      .filter(income => formatDate(new Date(income?.paymentDate)) === today)
                      .reduce((total, income) => total + income?.amount, 0);
                      console.log("income today", incomeToday)
                  return { ...info, count: incomeToday };
              }
              return info;
          }));
        }
    }, [ patientData, userData,incomeData]);

    return { data };
};