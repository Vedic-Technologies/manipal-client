export type PatientType = {
    patientName: string;
    gender: string;
    age: string;
    image: string | null;
    dob: string;
    contact: string;
    email: string;
    idProof: string;
    weight: string;
    height: string;
    complaint: string;
    bloodGroup: string;
    referredTo: string;
    address: {
      state: string;
      village: string;
      pincode: string;
    };
  };

 