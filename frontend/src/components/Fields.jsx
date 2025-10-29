import React from 'react'
import ColomnName from './ColomnName.jsx'
import ColomnType from './ColomnType.jsx'
import ColomnAttributes from './ColomnAttributes.jsx'
import { useContext } from 'react'
import { ModelDataContext } from '../contexts/ModelDataContext.jsx'



const Fields = ({ field, index }) => {
  const { fields, handleChange, handleRemoveField } = useContext(ModelDataContext);
  return (
    <div>
      <ColomnName field={field} index={index} />
      <ColomnType field={field} index={index} />
      <ColomnAttributes field={field} index={index} />
      {fields.length > 1 && (
        <button
          type="button"
          onClick={() => handleRemoveField(index)}
          className="bg-red-500 text-white px-2 rounded"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default Fields
