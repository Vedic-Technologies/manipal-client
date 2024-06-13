import React, { useState } from 'react';
import axios from 'axios';

const AddDoctorForm = ({ onAddDoctor }) => {
    const [doctorName, setDoctorName] = useState('');
    const [email, setEmail] = useState('');
    const [docSpeciality, setDocSpeciality] = useState('');
    const [currentStatus, setCurrentStatus] = useState('');
    const [patientNum, setPatientNum] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [department, setDepartment] = useState('');
    const [address, setAddress] = useState('');
    const [emergencyContactName, setEmergencyContactName] = useState('');
    const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
    const [clinicAddress, setClinicAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newDoctor = {
            docId: Date.now(), // Generate a unique ID
            doctorName,
            email,
            docSpeciality,
            currentStatus,
            patientNum,
            contactNum,
            profileImg,
            dateOfBirth,
            department,
            address,
            emergencyContactName,
            emergencyContactNumber,
            clinicAddress
        };

        try {
            const response = await axios.post('https://manipal-server.onrender.com/api/doctors/add-doctor', newDoctor);
            if (response.status === 200) {
                onAddDoctor(newDoctor);
                // Reset form fields
                setDoctorName('');
                setEmail('');
                setDocSpeciality('');
                setCurrentStatus('');
                setPatientNum('');
                setContactNum('');
                setProfileImg('');
                setDateOfBirth('');
                setDepartment('');
                setAddress('');
                setEmergencyContactName('');
                setEmergencyContactNumber('');
                setClinicAddress('');
            }
        } catch (error) {
            console.error('Error adding doctor:', error);
        }
    };

    return (
        <div className='border 2px'>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
                <div className='border 2px h-10 flex justify-around bg-gray-200 rounded-lg'>
                    <h2 className="text-2xl font-bold mb-4">Add New Doctor</h2>
                    <button className='flex w-40 ml-96 items-center justify-center text-sm border rounded-xl 2px bg-green-100' 
                    type="button" onClick={() => onAddDoctor(null)}>Show Doctor List</button>
                </div>
                <div className='flex justify-around'>
                    <div className="mb-4">
                        <label className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            value={doctorName}
                            onChange={(e) => setDoctorName(e.target.value)}
                            className=" w-[500px] px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className=" w-[500px] px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                </div>
                <div className='flex justify-around'>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email Address</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[500px] px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4 justify-around">
                        <label className="block text-gray-700">Mobile</label>
                        <input
                            type="text"
                            value={contactNum}
                            onChange={(e) => setContactNum(e.target.value)}
                            className="w-[500px] px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                </div>
                <div className='flex justify-around'>
                    <div className="mb-4">
                        <label className="block text-gray-700">Designation</label>
                        <input
                            type="text"
                            value={docSpeciality}
                            onChange={(e) => setDocSpeciality(e.target.value)}
                            className="w-[500px] px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Specialist</label>
                        <select
                            value={currentStatus}
                            onChange={(e) => setCurrentStatus(e.target.value)}
                            className="w-[500px] px-3 py-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Specialty</option>
                            <option value="Orthopedic">Orthopedic</option>
                            <option value="Neurological">Neurological</option>
                            <option value="Pediatric">Pediatric</option>
                            <option value="Geriatric">Geriatric</option>
                            <option value="Cardiopulmonary">Cardiopulmonary</option>
                            <option value="Rehabilitation">Rehabilitation</option>
                        </select>
                    </div>
                </div>
                <div className='flex justify-around'>
                    <div className="mb-4">
                        <label className="block text-gray-700">Date Of Birth</label>
                        <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            className="w-[500px] px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className='flex justify-around'>
                        <div className="mb-4">
                            <label className="block text-gray-700">Doctor Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setProfileImg(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="w-[500px] px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </div>
                <div className='flex justify-around'>
                    <div className="mb-4">
                        <label className="block text-gray-700">Department</label>
                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-[500px] px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-[500px] px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                </div>
                <div>
                    <h1 className='h-10 border 2px bg-gray-200 flex justify-center rounded-2xl items-center'>Emergency Contact Details</h1>
                    <div className='flex justify-around'>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                value={emergencyContactName}
                                onChange={(e) => setEmergencyContactName(e.target.value)}
                                className="w-[500px] px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Contact Number</label>
                            <input
                                type="text"
                                value={emergencyContactNumber}
                                onChange={(e) => setEmergencyContactNumber(e.target.value)}
                                className="w-[500px] px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>
                    <div className='flex justify-around'>
                        <div className="mb-4">
                            <label className="block text-gray-700">Clinic Address</label>
                            <input
                                type="text"
                                value={clinicAddress}
                                onChange={(e) => setClinicAddress(e.target.value)}
                                className="w-[500px] px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Doctor</button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctorForm;
