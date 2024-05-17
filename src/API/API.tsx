import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const API = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://manipal-server.onrender.com/api/' }),
  endpoints: (builder) => ({


    getAllPatients: builder.query({
      query: () => "patient/all_patients",
      
    }),
   
    deletePatient: builder.mutation({
        query: (patientId) => ({
          url: `patient/${patientId}`,
          method: 'DELETE',
        }),
      }),

      updateActiveStatus : builder.mutation({
        query : ({id, ...updatedStatus}) =>({
            url:`patient/${id}`,
            method: "PATCH", 
            body : updatedStatus
        })
      })
  }),

  
})


export const { 
    useGetAllPatientsQuery ,
    useDeletePatientMutation,
    useUpdateActiveStatusMutation
    
} = API