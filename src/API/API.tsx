import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import StaffSignup from "../pages/staff/StaffSignup";

const token = localStorage.getItem("authToken");
if (!token) {
  console.error("No token found, please log in.");
  console.log(" ------------------------- No token found, please log in. ----------------------");
}

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjAwMTQ1NmQ5N2YwZThlNjAzOWYyNmMiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxNzMwMDMwNn0.pfU8xBMrVQhobpTmrsmB8WzE5CSrk186TvCE0-wqvDI";

export const API = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://manipal-server.onrender.com/api/",
    // baseUrl: "http://localhost:8000/api/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

    deletePayment: builder.mutation({
      query: (selectedPatientId) => ({
        url: `payment/${selectedPatientId}`,
        method: "DELETE",
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
      query: () => "staffs",
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
      query: (formdata) => ({
        url: `patient/shoulder/register_problem`,
        method: "POST",
        body: formdata,
      }),
    }),
  }),
});

export const {
  useGetAllPatientsQuery,
  useDeletePatientMutation,
  useUpdateActiveStatusMutation,
  useGetPatientByIdQuery,
  useAddPaymentMutation,
  useGetAllPaymentsQuery,
  useDeletePaymentMutation,
  useSubmitStaffPrescriptionMutation,
  useStaffSignupMutation,
  useGetAllUsersQuery,
  useDeleteUserByIdMutation,
  useGetAllPatientWithShoulderProblemQuery,
  useSubmitShoulderProblemInDoctorPrescriptionMutation,
} = API;
