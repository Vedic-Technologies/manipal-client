import React from 'react'

const KidsForm = () => {
  return (
    <div> <form className="p-4 bg-gray-200 rounded">
    <h2 className="text-lg font-bold mb-4">Kids Form</h2>
    <div className="mb-4">
      <label className="block">Field 1:</label>
      <input
        type="text"
        name="field1"
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
    {/* Add more fields as necessary */}
    <button
      type="submit"
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Submit
    </button>
  </form></div>
  )
}

export default KidsForm