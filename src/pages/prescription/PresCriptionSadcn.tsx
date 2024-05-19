import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import {PatientType} from '../../types/PatientTypes';
import { ChangeEvent, useState } from "react";
import { initialData } from "../../initial_values/InitialValues";
import Webcam from "../webcam/Camera";
import axios from "axios";
import AlertWrapper from '../../custom_components/AlertWrapper';
import JobDoneAlert from "../../custom_components/JobDoneAlert"
import { motion } from "framer-motion"

const PresCriptionSadcn=()=> {

const [patientData, setPatientData] = useState<PatientType>(initialData)
const [imageFile, setImageFile]=useState("");
  // jodDone alert message 
  const [jobDoneMessage, setJobDoneMessage] = useState("")
  const [openJobDoneAlert, setOpenJobDoneAlert] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  
  const handleCancelAlert = () => {
    setOpenJobDoneAlert(false)
  }
const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();  
    console.log(patientData)
    try {
      const response = await axios.post(
        "https://manipal-server.onrender.com/api/patient/patient_registration",
        {...patientData,image:imageFile}
      );
      console.log(response.data);
      setJobDoneMessage("Patient registration successful!")
      setAlertColor("green")
      setOpenJobDoneAlert(true)

      // removing success alert automatically
      setTimeout(() => {
        setOpenJobDoneAlert(false)
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
         setJobDoneMessage("Failed to register Patient!!")
         setAlertColor("red")
        setOpenJobDoneAlert(true)

      // removing failed alert automatically
      setTimeout(() => {
        setOpenJobDoneAlert(false)
      }, 3000);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {  
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };
const handleSelectChange=(value)=>
  {
    
    setPatientData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  }
const handleBloodGroupSelectChange=(value)=>
  {
    setPatientData((prevData) => ({
      ...prevData,
      bloodGroup: value,
    }));
  }

  // Function to handle address input changes
  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setPatientData({
      ...patientData,
      address: {
        ...patientData.address,
        [name]: value,
      },
    });
  };

    const handleimage = (e) => {
      // const file = e.target.files[0];
      // setFileToBase(file);
      // console.log(file);

      // <Webcam/>
    };

    // const setFileToBase = (imageFile) => {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(imageFile);
    //   reader.onloadend = () => {
    //     setPatientData({
    //       ...patientData,
    //       image: reader.result,
    //     });
    //     console.log({ ...patientData, image: reader.result });
    //   };
    // };

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-12 px-4 sm:px-6 md:py-16 lg:px-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl md:text-3xl">
          Patient Information
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the form to collect patient details.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter patient name"
              required
              name="patientName"
              value={patientData.patientName}
              onChange={handleChange}
            />
          </div>

          {/* select gender */}

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              id="gender"
              required
              name="gender"
              value={patientData.gender}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              placeholder="Enter patient age"
              required
              type="number"
              name="age"
              value={patientData.age}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              
              type="date"
              name="dob"
              value={patientData.dob}
              placeholder="Enter DOB"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              placeholder="Enter patient contact"
              
              type="tel"
              name="contact"
              value={patientData.contact}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter patient email"
              
              type="email"
              name="email"
              value={patientData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="id-proof">Adhar Number</Label>
            <Input
              id="id-proof"
              placeholder="Enter ID proof details"
              
              name="idProof"
              value={patientData.idProof}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              placeholder="Enter patient weight"
              
              type="number"
              name="weight"
              value={patientData.weight}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              placeholder="Enter patient height"
              
              type="number"
              name="height"
              value={patientData.height}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="complaint">Complaint</Label>
          <Textarea
            id="complaint"
            placeholder="Enter patient complaint"
            
            name="complaint"
            value={patientData.complaint}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="bloodGroup">Blood Group</Label>
            <Select
              id="bloodGroup"
              
              name="bloodGroup"
              value={patientData.bloodGroup}
              onValueChange={handleBloodGroupSelectChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="referred-to">
              Referred By <span className="text-red-500">*</span>
            </Label>
            <Input
              id="referred-to"
              placeholder="Enter referring doctor"
              
              name="referredTo"
              value={patientData.referredTo}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              placeholder="Enter patient state"
              
              name="state"
              value={patientData.address.state}
              onChange={handleAddressChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="village">Village</Label>
            <Input
              id="village"
              placeholder="Enter patient village"
              
              name="village"
              value={patientData.address.village}
              onChange={handleAddressChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              placeholder="Enter patient pincode"
              
              type="number"
              name="pincode"
              value={patientData.address.pincode}
              onChange={handleAddressChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-pic">Profile Picture</Label>
            <div className="flex items-center gap-4">
              {/* <Input id="profile-pic" type="photo" /> */}
             
              <Webcam setImageFile={setImageFile}/>           
            </div>
        
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>     
      <AlertWrapper isOpen={openJobDoneAlert}>
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={openJobDoneAlert ? { opacity: 1, y: 0 } : {}}
  >
    <JobDoneAlert
      height="h-24"
      width="w-52"
      textColor="text-white"
      bgColor={`${alertColor === "red" ? "bg-red-400" :  "bg-green-400"}`}
      boxShadow={`${alertColor === "red" ? "shadow-[0px_0px_42px_2px_#c53030]" :  "shadow-[0px_0px_42px_2px_#48BB78]"}`}
      message={jobDoneMessage}
      isOpen={openJobDoneAlert}
      OnCancel={handleCancelAlert}
      isCancelButton="block"
    />
  </motion.div>
</AlertWrapper>
    </div>
  );
}

export default PresCriptionSadcn