
const JobDoneAlert = ({ height, width, bgColor, icon,textColor, message, isOpen, OnCancel, isCancelButton, boxShadow }) => {


  return (
    <div className={`center inset-0 z-10 flex justify-center items-center  ${isOpen ? "" : "hidden"}`}>
      <div className={`center flex-col gap-3 ${height} ${width} ${bgColor} ${textColor} ${boxShadow } rounded p-1 px-2 relative`}>
      <div className=' text-green-500 text-3xl'>{icon}</div>
        <div className='text-center font-semibold'>{message}</div>
               <div className={`${isCancelButton} absolute top-1 right-0 `}>
        <button onClick={OnCancel} className={`center size-5 rounded-full `}>
          <i className="fas fa-times text-white"></i>
        </button>
        </div>
      
      </div>
    </div>
  );
}

export default JobDoneAlert;
