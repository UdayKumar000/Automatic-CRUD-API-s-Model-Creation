import React from 'react'
import { useContext } from 'react'
import { ModelDataContext } from '../contexts/ModelDataContext.jsx'


const ColomnName = ({ field, index }) => {
    const { handleChange } = useContext(ModelDataContext);
    return (
        <div>
            <input
                type="text"
                placeholder="Column Name"
                value={field.name}
                onChange={(e) =>
                    handleChange(index, "name", e.target.value)
                }
                className="border rounded p-2 flex-1"
                required
            />
        </div>
    )
}

export default ColomnName
