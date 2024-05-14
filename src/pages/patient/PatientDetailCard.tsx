import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "../../components/ui/card";

export default function PatientDetailCard({ patient }) {
  console.log(patient)
  return (
    <Card className="w-full  bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex">
        <div className="w-1/3 p-4">
          <img
            alt="Profile"
            className="rounded-lg shadow-md  "
            // height="320"
            src={patient?.image}
            style={{
              aspectRatio: "320/320",
              objectFit: "cover",
            }}
            // width="320"
          />
        </div>
        <div className="w-2/3 p-4">
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="grid grid-cols-2 gap-4">
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
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
