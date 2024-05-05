import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import {PatientType} from '../../types/PatientTypes';
import { ChangeEvent, useState } from "react";
import { initialData } from "../../initial_values/InitialValues";
import axios from "axios";
const PresCriptionSadcn=()=> {

const [patientData, setPatientData] = useState<PatientType>(initialData)

const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();  
    try {
      const response = await axios.post(
        "https://manipal-server.onrender.com/api/patient/patient_registration",
        patientData
      );
      console.log(response.data);
      alert("Patient registration successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register patient.");
    }
  };



  return (
    <div className="mx-auto max-w-4xl space-y-6 py-12 px-4 sm:px-6 md:py-16 lg:px-8">
    <div className="space-y-2 text-center">
      <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Patient Information</h1>
      <p className="text-gray-500 dark:text-gray-400">Fill out the form to collect patient details.</p>
    </div>
    <form className="space-y-4" onSubmit={handleSubmit} >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter patient name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select id="gender" required>
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
          <Input id="age" placeholder="Enter patient age" required type="number" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" required type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact">Contact</Label>
          <Input id="contact" placeholder="Enter patient contact" required type="tel" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Enter patient email" required type="email" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="id-proof">ID Proof</Label>
          <Input id="id-proof" placeholder="Enter ID proof details" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight</Label>
          <Input id="weight" placeholder="Enter patient weight" required type="number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Input id="height" placeholder="Enter patient height" required type="number" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="complaint">Complaint</Label>
        <Textarea id="complaint" placeholder="Enter patient complaint" required />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="blood-group">Blood Group</Label>
          <Select id="blood-group" required>
            <SelectTrigger>
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a-positive">A+</SelectItem>
              <SelectItem value="a-negative">A-</SelectItem>
              <SelectItem value="b-positive">B+</SelectItem>
              <SelectItem value="b-negative">B-</SelectItem>
              <SelectItem value="ab-positive">AB+</SelectItem>
              <SelectItem value="ab-negative">AB-</SelectItem>
              <SelectItem value="o-positive">O+</SelectItem>
              <SelectItem value="o-negative">O-</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="referred-to">Referred To</Label>
          <Input id="referred-to" placeholder="Enter referring doctor" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input id="state" placeholder="Enter patient state" required />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="village">Village</Label>
          <Input id="village" placeholder="Enter patient village" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pincode">Pincode</Label>
          <Input id="pincode" placeholder="Enter patient pincode" required type="number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-pic">Profile Picture</Label>
          <div className="flex items-center gap-4">
            <Input id="profile-pic" type="file" />
            <div className="hidden" id="profile-pic-preview">
              <img
                alt="Profile Picture Preview"
                className="rounded-full"
                height={100}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width={100}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  </div>
  )
}

export default PresCriptionSadcn