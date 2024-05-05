import axios from "axios";

export async function startApi()
{
    try {
        const response = await axios.get('https://manipal-server.onrender.com/api/patient/all_patients');
       console.log("start up data : ", response.data)
      } catch (error) {
       console.log("data has not come yet. Please wait for 50 seconds")
      } finally {
       console.log("")
      }
    };
