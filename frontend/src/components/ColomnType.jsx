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
        <div className='w-[150]'>
            <select
                value={field.type}
                onChange={(e) => handleChange(index, "type", e.target.value)}
                className="border rounded p-2 flex-1 w-full"
                required
            >
                <option value="" className='w-[100px]' disabled>-- Select Data Type --</option>
                {dataTypes.map((type, i) => (
                    <option key={i} className=' w-[100px]' value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default ColomnType
