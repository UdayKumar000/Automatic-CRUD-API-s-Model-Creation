import React, { useContext } from 'react'
import Fields from "./Fields.jsx";
import { ModelDataContext } from "../contexts/ModelDataContext.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";

const CreateModel = () => {
    const {
        fields,
        setModelName,
        modelName,
        handleAddField,
        handleSubmit,
    } = useContext(ModelDataContext);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-5xl border border-gray-200">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                    🧩 Create Table Schema
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Model Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Model Name
                        </label>
                        <input
                            type="text"
                            value={modelName}
                            onChange={(e) => setModelName(e.target.value)}
                            placeholder="e.g. Teacher"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Dynamic Fields */}
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 bg-gray-50 p-3 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
                            >
                                <Fields key={index} field={field} index={index} />
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-4 pt-4">
                        <button
                            type="button"
                            onClick={handleAddField}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow transition"
                        >
                            ➕ Add Field
                        </button>

                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg shadow transition"
                        >
                            🚀 Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default CreateModel
