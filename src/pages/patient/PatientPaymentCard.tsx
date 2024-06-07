import { useState, useContext, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import formatDate from '../../util/TimeFormate';
import { useNavigate } from "react-router-dom";
import { PatientIdContext } from "../../API/PatientIdProvider";
import { useUpdatePaymentByIdMutation } from '../../API/API';

const PatientPaymentCard = ({ payment, idOfPatient }) => {
  const [isUpdating, setIsUpdating] = useState(null);
  const [newAmount, setNewAmount] = useState('');
  const navigate = useNavigate();
  const { handleUpdateId } = useContext(PatientIdContext);

const [ updatePaymentById] = useUpdatePaymentByIdMutation()

  const handleAddPayment = () => {
    console.log("idOFPatient", idOfPatient);
    console.log("payment??", payment);
    handleUpdateId(idOfPatient); // Update the context with idOfPatient
    navigate('/home/payment_entry');
  };

  const handleUpdateClick = (paymentId, currentAmount) => {
    setIsUpdating(paymentId);
    setNewAmount(currentAmount);
  };

  const handleUpdateSubmit = async (paymentId) => {
    try {
      const amountToUpdate = payment.find(pay => pay._id === paymentId);
      if (amountToUpdate) {
        const updatedAmount = { ...amountToUpdate, amount: newAmount };
        const updateKarDeteHai = await updatePaymentById({ paymentId, ...updatedAmount });
        console.log(updateKarDeteHai); 
        console.log("Updated Payment ID:", paymentId);
        console.log("New Amount:", newAmount);
        setIsUpdating(null);
        setNewAmount('');
      }
    } catch (error) {
      console.error("Error updating amount:", error);
    }
  };
  

  console.log("figuring paymentID,maybeANArray",payment)

console.log("figuring paymentID,maybeANArray",payment[0]?._id)
  return (
    <div>
      <div className="container mx-auto px-0 py-8">
        <div className="bg-white h-[500px] overflow-y-auto rounded-lg p-6 dark:bg-gray-800 dark:text-gray-200">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Payments</h2>
          <Button onClick={handleAddPayment} >Add</Button>
          </div>          <div className="overflow-x-auto">
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
                    <tbody key={pay._id}>
                      <tr className="border-b dark:border-gray-600">
                        <td className="px-4 py-3">{formatDate(pay.paymentDate)}</td>
                        <td className="px-4 py-3">
                          {isUpdating === pay._id ? (
                            <input
                              type="number"
                              value={newAmount}
                              onChange={(e) => setNewAmount(e.target.value)}
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            pay.amount
                          )}
                        </td>
                        <td className="px-4 py-3 flex items-center justify-end space-x-2">
                          {isUpdating === pay._id ? (
                            <Button size="sm" variant="outline" onClick={() => handleUpdateSubmit(pay._id)}>
                              Save
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => handleUpdateClick(pay._id, pay.amount)}>
                              Update
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            Delete
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="bg-white w-full dark:bg-gray-900 rounded-lg shadow-md">
                    <div className="flex flex-col justify-center items-center space-y-4">
                      <p className="text-gray-500 dark:text-gray-400">
                        No amount added
                      </p>
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
