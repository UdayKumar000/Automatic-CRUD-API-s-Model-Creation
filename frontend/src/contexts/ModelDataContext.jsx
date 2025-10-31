import React from 'react'
import { createContext, useState } from 'react';

export const ModelDataContext = createContext();



const DataModelContext = ({ children }) => {


    const [modelName, setModelName] = useState("");
    const [fields, setFields] = useState([
        { name: "", type: "", attributes: [""] },
    ]);

    // Handle change in a specific field
    const handleChange = (index, fieldName, value) => {

        if (fieldName === "attributes") {
            const updatedFields = [...fields];
            if (value.checked === true) {
                if (value.value === "@id") {
                    // Remove @id from all other fields
                    updatedFields.forEach((field, idx) => {
                        if (idx !== index && field.attributes) {

                            field.attributes = field.attributes.filter(attr => attr !== "@id");
                        }
                    });
                }

                updatedFields[index][fieldName] = [...(updatedFields[index][fieldName] || []), value.value];
            }
            else {
                console.log(updatedFields[index][fieldName].filter(attr => attr !== value.value));

                updatedFields[index][fieldName] = updatedFields[index][fieldName].filter(attr => attr !== value.value);
            }
            setFields(updatedFields);

            return;
        }

        const updatedFields = [...fields];
        updatedFields[index][fieldName] = value;
        setFields(updatedFields);
    };

    // Add new field row
    const handleAddField = () => {
        setFields([...fields, { name: "", type: "" }]);
    };

    // Remove field row
    const handleRemoveField = (index) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
    };

    // Submit to backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting:", fields);
        const body = { model: { name: modelName, fields } };

        try {
            const res = await fetch("http://localhost:3000/createModel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok) {
                alert("❌ Error creating table: " + (data.message || "Unknown error"));
            } else {
                alert("✅ Table created successfully!");
                console.log(data);
            }
        } catch (error) {
            console.error("Error submitting:", error);
            alert("❌ Something went wrong!");
        }
    };


    return (
        <ModelDataContext.Provider value={{ fields, setFields, modelName, setModelName, handleChange, handleAddField, handleRemoveField, handleSubmit }}>
            {children}
        </ModelDataContext.Provider>
    )
}

export default DataModelContext
