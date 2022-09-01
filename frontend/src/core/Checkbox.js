import React, {useState, useEffect} from 'react'

const Checkbox = ({categories, handleFilters}) => {
    const [checked, setChecked] = useState([])

    const handleToggle = c => () => {
        //return the first index or -1
        const currentCategoryId = checked.indexOf(c)
        const newCheckedCategory = [...checked]

        //if currently checked was not already in checked state>push
        //else pull/take off
        if(currentCategoryId === -1){
            newCheckedCategory.push(c)
        }else{
            newCheckedCategory.splice(currentCategoryId, 1)
        }
        // console.log(newCheckedCategory);
        setChecked(newCheckedCategory)
        handleFilters(newCheckedCategory)
    }
  return (
    <div>
      {
        categories.map((category, i) => (
            <li key={i} className='list-unstyled'>
                <input onChange={handleToggle(category._id)} value={checked.indexOf(category._id === -1)} type="checkbox"className='form-check-input'/>
                <label className="form-check-label">{category.name}</label>
            </li>
        ))
      }
    </div>
  )
}

export default Checkbox
