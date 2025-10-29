import React from 'react'
import { useContext } from 'react'
import { ModelDataContext } from '../contexts/ModelDataContext.jsx'
const dataTypes = [
    "Int",
    "BigInt",
    "Float",
    "Decimal",
    "String",
    "Boolean",
    "DateTime",
    "Json",
    "Bytes",
];

const ColomnType = ({ field, index }) => {
    const { fields, handleChange } = useContext(ModelDataContext);
    return (
        <div>
            <select
                value={field.type}
                onChange={(e) => handleChange(index, "type", e.target.value)}
                className="border rounded p-2 flex-1"
                required
            >
                <option value="" disabled>-- Select Data Type --</option>
                {dataTypes.map((type, i) => (
                    <option key={i} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default ColomnType
