import React from 'react'
import ColomnName from './ColomnName.jsx'
import ColomnType from './ColomnType.jsx'
import ColomnAttributes from './ColomnAttributes.jsx'
import { useContext } from 'react'
import { ModelDataContext } from '../contexts/ModelDataContext.jsx'



const Fields = ({ field, index }) => {
  const { fields, handleRemoveField } = useContext(ModelDataContext);
  return (
    <div className='flex justify-between w-full'>
      <ColomnName field={field} index={index} />
      <ColomnType field={field} index={index} />
      <div  >
        <ColomnAttributes field={field} index={index} />
      </div>

      {fields.length > 1 && (
        <button
          type="button"
          onClick={() => handleRemoveField(index)}
          className="bg-red-500 text-white px-2 w-[50px] rounded"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default Fields
