import React from 'react';

const ConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-20 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-8 rounded-md">
        <p className="mb-4">Are you sure you want to delete this patient?</p>
        <div className="flex justify-center gap-2">
          <button onClick={onCancel} className="mr-4 bg-green-400 hover:bg-green-500 px-4 py-2 text-white rounded-md">No</button>
          <button onClick={onConfirm} className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-md">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
