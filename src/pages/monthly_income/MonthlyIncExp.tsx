
import Expense from "./expense";
import Income from "./income"

const MonthlyIncExp = () => {

  return (
    <div className="p-10 h-auto bg-gradient-to-r from-purple-50 to-purple-100">
      <div>Income And Expences</div>
      <div className="flex flex-wrap gap-16">
      <Income />
      <Expense />
      </div>
    </div>
  );
};

export default MonthlyIncExp;
