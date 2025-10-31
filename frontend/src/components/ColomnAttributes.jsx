import React from 'react'
import { useContext } from 'react'
import { ModelDataContext } from '../contexts/ModelDataContext.jsx'

const attributes = {
    Int: [{ value: "@id", name: "Primary Key" }, { value: "@unique", name: "Unique" }, { value: "@default(autoincrement())", name: "Default" }],
    BigInt: [{ value: "@id", name: "Primary Key" }, { value: "@unique", name: "Unique" }, { value: "@default(autoincrement())", name: "Default" }],
    Float: [{ value: "@unique", name: "Unique" }, { value: "@default(value)", name: "Default" }],
    Decimal: [{ value: "@unique", name: "Unique" }, { value: "@default(value)", name: "Default" }],
    String: [{ value: "@id", name: "Primary Key" }, { value: "@unique", name: "Unique" }, { value: "@default(value)", name: "Default" }, { value: "@default(uuid())", name: "Default UUID" }],
    Boolean: [{ value: "@default(true)", name: "Default True" }, { value: "@default(false)", name: "Default False" }],
    DateTime: [{ value: "@default(now())", name: "Default Now" }, { value: "@updatedAt", name: "Updated At" }],
    Json: [{ value: "@default(value)", name: "Default Value" }],
    Bytes: []
};


const ColomnAttributes = ({ field, index }) => {
    const { handleChange, fields } = useContext(ModelDataContext);
    const v = 1;
    console.log(`${v === 1 ? 'id' : ''}`);
    const dataType = fields.filter((_, idx) => idx === index)[0].type;
    return (
        <div className='flex gap-1 items-center h-full justify-start w-[300px]' >
            {dataType && attributes[dataType].map((attr, i) => (<label className='flex w-[100px]'>
                <input type={attr.name === "Primary Key" ? 'radio' : 'checkbox'} name={`${attr.name === "Primary Key" ? 'id' : ''}`} value={attr.value}
                    onChange={
                        (e) => handleChange(index, "attributes", e.target)} />
                <p className='pl-2 font-semibold text-sm' >{attr.name}</p>
            </label>))}


        </div>
    )
}

export default ColomnAttributes
