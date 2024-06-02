import axios from "axios";

export async function startApi() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No token found, please log in.");
    console.log(
      " ------------------------- No token found, please log in. ----------------------"
    );
  }
  try {
    const response = await axios.get(
      "https://manipal-server.onrender.com/api/patient/all_patients",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("start up data : ", response.data);
  } catch (error) {
    console.log("data has not come yet. Please wait for 50 seconds");
  } finally {
    console.log("");
  }
}
