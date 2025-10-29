import React, { useState } from "react";
import Fields from "./components/Fields";
import { useContext } from "react";
import { ModelDataContext } from "./contexts/ModelDataContext.jsx";



const DynamicTableForm = () => {
  const { fields, setFields, modelName, setModelName, handleChange, handleAddField, handleRemoveField, handleSubmit } = useContext(ModelDataContext);
  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Table Schema</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={modelName} onChange={(e) => { setModelName(e.target.value) }} placeholder="Model Name" />
        {fields.map((field, index) => (
          <div key={index} className="flex gap-2 mb-2">

            <Fields key={index} field={field} index={index} />


          </div>
        ))}

        <button
          type="button"
          onClick={handleAddField}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          ➕ Add More
        </button>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded ml-3"
        >
          🚀 Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicTableForm;
