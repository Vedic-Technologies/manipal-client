import income_today from '../infocard/icons/money-today.png';
import new_patient from '../infocard/icons/new_patient.png';
import patient_today from '../infocard/icons/patient_today.png';
import staff_available from '../infocard/icons/staff_available.png';

export type InfoData = {
    title: string,
    count: number,
    icon: string,
    buttonText: string,
    cardUrl: string
}

export const data : InfoData[] = [
    {
      title: "Patients Today",
      count: 10,
      icon:patient_today ,
      buttonText: "View Notifications",
      cardUrl: "/notifications"
    },
    {
      title: "New Patients",
      count: 5,
      icon: new_patient,
      buttonText: "View Messages",
      cardUrl: "/messages"
    },
    {
      title: "Staff Available",
      count: 8,
      icon: staff_available,
      buttonText: "View Tasks",
      cardUrl: "/tasks"
    },
    {
      title: "Income Today",
      count: 3,
      icon: income_today,
      buttonText: "View Reminders",
      cardUrl: "/reminders"
    }
  ];

