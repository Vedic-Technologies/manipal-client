import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Function to dynamically prepare headers for each request
const prepareHeaders = (headers) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  } else {
    console.error("No token found, please log in.");
  }
  return headers;
};

// Create the API slice
export const API = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:8000/api/",
    baseUrl: "https://manipal-server.onrender.com/api/",
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getAllPatients: builder.query({
      query: () => "patient/all_patients",
    }),

    getPatientById: builder.query({
      query: (id) => ({
        url: `patient/${id}`,
        method: "GET",
      }),
    }),

    updatePatient: builder.mutation({
      query: ({ patientid, data }) => ({
        url: `patients/${patientid}`, // Adjust the URL according to your API endpoint
        method: "PATCH",
        body: data,
      }),
    }),

    deletePatient: builder.mutation({
      query: (patientId) => ({
        url: `patient/${patientId}`,
        method: "DELETE",
      }),
    }),

    updateActiveStatus: builder.mutation({
      query: ({ id, ...updatedStatus }) => ({
        url: `patient/${id}`,
        method: "PATCH",
        body: updatedStatus,
      }),
    }),

    addPayment: builder.mutation({
      query: (paymentData) => ({
        url: `payment/add_payment`,
        method: "POST",
        body: paymentData,
      }),
    }),

    getAllPayments: builder.query({
      query: () => "payment/all_payments",
    }),

    getPaymentById: builder.query({
      query: (id) => ({
        url: `payment/${id}`,
        method: "GET",
      }),
    }),

    deletePayment: builder.mutation({
      query: (selectedPatientId) => ({
        url: `payment/${selectedPatientId}`,
        method: "DELETE",
      }),
    }),

    updatePaymentById: builder.mutation({
      query: ({ paymentId, ...updatedAmount }) => ({
        url: `payment/${paymentId}`,
        method: "PATCH",
        body: updatedAmount,
      }),
    }),

    submitStaffPrescription: builder.mutation({
      query: ({ image: imageFile, ...patientData }) => ({
        url: `patient/patient_registration`,
        method: "POST",
        body: patientData,
      }),
    }),

    staffSignup: builder.mutation({
      query: (user) => ({
        url: `staffs/register`,
        method: "POST",
        body: user,
      }),
    }),

    getAllUsers: builder.query({
      query: () => "users",
    }),

    getAllStaffs: builder.query({
      query: () => "staffs",
    }),

    deleteStaffById: builder.mutation({
      query :(userId) =>({
        url:`staffs/${userId}`,
        method:"DELETE",
      }),
    }),

    updateStaffById: builder.mutation({
      query : ({userId,updateData})=>({
        url:`staffs/${userId}`,
        method:"PATCH",
        body:updateData
      }),
    }),

    deleteUserById: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
    }),

  
    getAllPatientWithShoulderProblem: builder.query({
      query: () => ({
        url: `patient/shoulder`,
        method: "GET",
      }),
    }),

    submitShoulderProblemInDoctorPrescription: builder.mutation({
      query: (formData) => ({
        url: `patient/shoulder/register_problem`,
        method: "POST",
        body: formData,
      }),
    }),

    getAllSupperAdmin: builder.query({
      query: () => "superAdmin",
    }),

    loginAsSuperAdmin: builder.mutation({
      query: () => ({
        url: `superAdmin/login`,
        method: "POST",
      }),
    }),

  }),
});

export const {
  useGetAllPatientsQuery,
  useGetPatientByIdQuery,
  useUpdatePatientMutation,
  useDeletePatientMutation,
  useUpdateActiveStatusMutation,
  useAddPaymentMutation,
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useDeletePaymentMutation,
  useUpdatePaymentByIdMutation,
  useSubmitStaffPrescriptionMutation,
  useStaffSignupMutation,
  useGetAllUsersQuery,
  useDeleteUserByIdMutation,
  useGetAllPatientWithShoulderProblemQuery,
  useSubmitShoulderProblemInDoctorPrescriptionMutation,
  useGetAllStaffsQuery,
  useDeleteStaffByIdMutation,
  useGetAllSupperAdminQuery,
  useLoginAsSuperAdminMutation,
  useUpdateStaffByIdMutation,
} = API;
