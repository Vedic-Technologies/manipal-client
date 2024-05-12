import { Button } from "../../components/ui/button"

const PatientPaymentCard = ({payment}) => {
  return (
    <div>
              <div className="container mx-auto px-0 py-8 ">
        <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:text-gray-200">
          <h2 className="text-2xl font-bold mb-4">Payments</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-end pr-24">Action</th>
                </tr>
              </thead>
              <tbody>
                {payment.map((pay) => (
                  <tr key={pay._id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-3">{pay.paymentDate}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default PatientPaymentCard