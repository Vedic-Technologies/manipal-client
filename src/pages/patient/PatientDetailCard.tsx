import { useEffect, useState } from "react";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "../../components/ui/card";
import { useUpdatePatientMutation } from "../../API/API";
import Webcam from "../webcam/Camera";
import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

export default function PatientDetailCard({ patient }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isImgEditing, setIsImgEditing] = useState(false);
  const [formData, setFormData] = useState();
  const [imageFile, setImageFile] = useState();
  const [updatePatient, { isLoading }] = useUpdatePatientMutation();

  const containsDefaultImage = (Url) => {
    if (Url && Url.includes("default%20image")) {
      return "p-16";
    }
  };
  console.log(patient);

  useEffect(() => {
    setFormData(patient);
  }, [patient]);

  useEffect(() => {
    console.log(imageFile);
    setFormData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));
  }, [imageFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(formData);
  };

  const handleSave = async () => {
    // const updatedData = formData;

    try {
      console.log("new data", {
        patientId: patient._id,
        updatedData: formData,
      });
      const response = await updatePatient({
        patientId: patient._id,
        ...formData,
      }).unwrap();

      console.log(response, "----------");

      setIsEditing(false);
      setIsImgEditing(false);
    } catch (error) {
      console.error("Error ", error);
      console.log(Response.msg);
    }
  };

  const handleCancel = () => {
    setFormData(patient);
    setIsEditing(false);
  };

  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImageFile(file);

  //     await changeImageToBase64(file);
  //   }
  // };

  return (
    <Card className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex">
        <div className="w-1/3 p-4">
          <div className="relative">
            <img
              alt="Profile"
              className={`rounded-lg shadow-md ${containsDefaultImage} `}
              src={imageFile && isEditing ? imageFile : patient?.image}
              style={{
                aspectRatio: "320/320",
                objectFit: "cover",
              }}
            />
            <div
              className={`flex gap-5 justify-end text-4xl mt-2 ${
                !isEditing && "hidden"
              } `}
            >
              <CiEdit
                className="text-blue-400 shadow-xl border cursor-pointer rounded-lg"
                onClick={(e) => setIsImgEditing(true)}
              />
            </div>

            {isImgEditing && isEditing && (
              <div className="flex absolute top-0 items-center gap-4 rounded-lg overflow-hidden">
                <Webcam setImageFile={setImageFile} />
              </div>
            )}
          </div>

          {/* {isEditing && (
            <input
              type="file"
              name="image"
              onChange={changeImageToBase64}
              className="border-b-2 border-gray-100"
            />
          )} */}
        </div>
        <div className="w-2/3 p-4">
          <div className="flex justify-end relative">
            {!isEditing ? (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setIsImgEditing(false);
                }}
              >
                <i className="fa-solid fa-xl fa-pen-to-square"></i>
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleSave}>
                  <i className="fa-solid fa-xl fa-save"></i>
                </button>
                <button onClick={handleCancel}>
                  <i class="fa-solid fa-xl fa-xmark"></i>
                </button>
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
                  <strong>Name: </strong>
                  {isEditing ? (
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      className="border-b-2  border-gray-100"
                    />
                  ) : (
                    patient?.patientName
                  )}
                </p>
                <p>
                  <strong>Sex: </strong>
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
                  <strong>Height: </strong>
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
                  <strong>Email: </strong>
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
                  <strong>State: </strong>
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
                  <strong>Village: </strong>
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
                  <strong>Pin-code: </strong>
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
                  <strong>Country: </strong>
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
                  <strong>Blood Group: </strong>
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
                  <strong>Weight: </strong>
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
                  <strong>Age: </strong>
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
                  <strong>Referred To: </strong>
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
                  <strong>Dob: </strong>
                  {isEditing ? (
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
