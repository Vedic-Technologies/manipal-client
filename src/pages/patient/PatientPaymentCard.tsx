import { Button } from "../../components/ui/button";
import formatDate from '../../util/TimeFormate';
import { useNavigate } from "react-router-dom";
import PaymentEntry from "../payment/PaymentEntry";
const PatientPaymentCard = ({ payment,idOfPatient }) => {

const navigate= useNavigate()

// console.log("patientIDChecking",idOfPatient)
  const handleAddPayment = () =>{
console.log("idOFPatient",idOfPatient)
handleNavigation()
return (
  <PaymentEntry addPaymentFromPatientId={idOfPatient} />
);

  }
  const handleNavigation=()=>{
    navigate(`/home/payment_entry`)
  }
  // console.log("paymentDate:",payment);
  return (
    <div>
      <div className="container mx-auto px-0 py-8 ">
        <div className="bg-white h-[500px] overflow-y-auto rounded-lg p-6 dark:bg-gray-800 dark:text-gray-200">
          <h2 className="text-2xl font-bold mb-4">Payments</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              {payment.length > 0 ? (
                <>
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Amount</th>
                      <th className="px-4 py-3 text-end pr-24">Action</th>
                    </tr>
                  </thead>
                  {payment?.slice(0)?.reverse()?.map((pay) => (
                    <>
                      <tbody>
                        <tr
                          key={pay._id}
                          className="border-b dark:border-gray-600"
                        >
                          <td className="px-4 py-3">{formatDate(pay.paymentDate)}</td>
                          <td className="px-4 py-3">{pay.amount}</td>
                          <td className="px-4 py-3 flex items-center justify-end space-x-2">
                            <Button size="sm" variant="outline">
                              Delete
                            </Button>
                            <Button size="sm" variant="outline">
                              Update
                            </Button>
                          </td>
                        </tr>
                      </tbody>{" "}
                    </>
                  ))}{" "}
                </>
              ) : (
                <div className="flex items-center  justify-center">
                  <div className="bg-white w-full dark:bg-gray-900 rounded-lg shadow-md">
                    <div className="flex flex-col justify-center items-center space-y-4">
                      <p className="text-gray-500 dark:text-gray-400">
                        No amount added
                      </p>
                      <Button onClick={handleAddPayment} >Add</Button>
                    </div>
                  </div>
                </div>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPaymentCard;
