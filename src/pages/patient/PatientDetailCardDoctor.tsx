import {
    CardTitle,
    CardHeader,
    CardContent,
    Card,
  } from "../../components/ui/card";
  
  export default function    PatientDetailCardDoctor({ patient }) {
    console.log(patient)
    return (
      <Card className="w-full mt-5 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex">
          <div className="w-[20%] p-4 ">
            <img
              alt="Profile"
              className="rounded-lg shadow-md h-60 border border-gray-300"             
              src={patient?.image}
              style={{
                // aspectRatio: "320/320",
                objectFit: "cover",
              }}             
            />
          </div>
          <div className="w-[80%] p-4 ">
      <div className="text-xl font-bold mb-4">User Details</div>
      <div className="grid grid-cols-3 gap-4 text-lg">
        <div className="col-span-1">
          <p>
            <strong>Name:</strong> {patient?.patientName}
          </p>
          <p>
            <strong>Sex:</strong> {patient?.gender}
          </p>
          <p>
            <strong>Height:</strong> {patient?.height}
          </p>
        </div>
        <div className="col-span-1">
          <p>
            <strong>Email:</strong> {patient?.email}
          </p>
          <p>
            <strong>State:</strong> {patient?.address?.state}
          </p>
        </div>
        <div className="col-span-1">
          <p>
            <strong>Village:</strong> {patient?.address?.village}
          </p>
          <p>
            <strong>Pin-code:</strong> {patient?.address?.pin_code}
          </p>
        </div>
        <div className="col-span-1">
          <p>
            <strong>Country:</strong> {patient?.address?.country}
          </p>
          <p>
            <strong>Blood Group:</strong> {patient?.bloodGroup}
          </p>
        </div>
        <div className="col-span-1">
          <p>
            <strong>Weight:</strong> {patient?.weight}
          </p>
          <p>
            <strong>Age:</strong> {patient?.age}
          </p>
        </div>
        <div className="col-span-1">
          <p>
            <strong>Referred To:</strong> {patient?.referredTo}
          </p>
          <p>
            <strong>Dob:</strong> {patient?.dob}
          </p>
        </div>
      
      </div>
      <div className="mt-3 text-lg w-full">
        <span className="font-bold">Problem : </span>
        <span>{patient?.complaint}</span>
        </div>
    </div>
        </div>
      </Card>
    );
  }
