import { useState } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "../../components/ui/card";
import axios from "axios";

export default function PatientDetailCard({ patient }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(patient);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.patch(`https://manipal-server.onrender.com/api/patient/${patient.id}`, formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving patient data:", error);
    }
  };

  const handleCancel = () => {
    setFormData(patient);
    setIsEditing(false);
  };

  return (
    <Card className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex">
        <div className="w-1/3 p-4">
          <img
            alt="Profile"
            className="rounded-lg shadow-md"
            src={patient?.image}
            style={{
              aspectRatio: "320/320",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="w-2/3 p-4">
          <div className="flex justify-end relative">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)}>
                <i className="fa-solid fa-xl fa-pen-to-square"></i>
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleSave}><i className="fa-solid fa-xl fa-save"></i></button>
                <button onClick={handleCancel}><i class="fa-solid fa-xl fa-xmark"></i></button>
              </div>
            )}
          </div>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <p>
                  <strong>Name:  </strong> 
                  {isEditing ? (
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      className="border-b-2 border-gray-300"
                    />
                  ) : (
                    patient?.patientName
                  )}
                </p>
                <p>
                  <strong>Sex:  </strong> 
                  {isEditing ? (
                    <input
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="border-b-2 border-gray-300"
                    />
                  ) : (
                    patient?.gender
                  )}
                </p>
                <p>
                  <strong>Height:  </strong> 
                  {isEditing ? (
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="border-b-2 border-gray-300"
                    />
                  ) : (
                    patient?.height
                  )}
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  <strong>Email:  </strong> 
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-b-2 border-gray-300"
                    />
                  ) : (
                    patient?.email
                  )}
                </p>
                <p>
                  <strong>State:  </strong> 
                  {isEditing ? (
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address?.state}
                      onChange={handleChange}
                      className="border-b-2 border-gray-300"
                    />
                  ) : (
                    patient?.address?.state
                  )}
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  <strong>Village:  </strong> 
                  {isEditing ? (
                    <input
                      type="text"
                      name="address.village"
                      value={formData.address?.village}
                      onChange={handleChange}
                      className="border-b-2 border-gray-300"
                    />
                  ) : (
                    patient?.address?.village
                  )}
                </p>
                <p>
                  <strong>Pin-code:  </strong> 
                  {isEditing ? (
                    <input
                      type="text"
                      name="address.pin_code"
                      value={formData.address?.pin_code}
                      onChange={handleChange}
                      className="border-b-2 border-gray-300"
                    />
                  ) : (
                    patient?.address?.pin_code
                  )}
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  <strong>Country:  </strong> 
                  {isEditing ? (
                    <input
                      type="text"
                      name="address.country"
                      value={formData.address?.country}
                      onChange={handleChange}
                      className="border-b-2 border-gray-300"
                    />
                  ) : (
                    patient?.address?.country
                  )}
                </p>
                <p>
                  <strong>Blood Group:  </strong> 
                  {isEditing ? (
                    <input
                      type="text"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="border-b-2 border-gray-300"
                    />
                  ) : (
                    patient?.bloodGroup
                  )}
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  <strong>Weight:  </strong> 
                  {isEditing ? (
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="border-b-2 border-gray-300"
                    />
                  ) : (
                    patient?.weight
                  )}
                </p>
                <p>
                  <strong>Age:  </strong> 
                  {isEditing ? (
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="border-b-2 border-gray-300"
                    />
                  ) : (
                    patient?.age
                  )}
                </p>
              </div>
              <div className="col-span-1">
                <p>
                  <strong>Referred To:  </strong> 
                  {isEditing ? (
                    <input
                      type="text"
                      name="referredTo"
                      value={formData.referredTo}
                      onChange={handleChange}
                      className="border-b-2 border-gray-300"
                    />
                  ) : (
                    patient?.referredTo
                  )}
                </p>
                <p>
                  <strong>Dob:  </strong> 
                  {isEditing ?  (
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="border-b-2 border-gray-300"
                    />
                  ) : (
                    patient?.dob
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
