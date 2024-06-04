import React,{useState} from 'react'

export const Toggle = ({setbilltype}) => {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked)
      if (isChecked) {
        setbilltype(1)
      }
      else{
        setbilltype(2)
      }
    }

  return (
    <>
    
<label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center pl-5'>
        <input
          type='checkbox'
          name='autoSaver'
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isChecked ? 'bg-blue-700' :'bg-slate-600'
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isChecked ? 'translate-x-5' : ''
            }`}
          ></span>
        </span>
        <span className='label flex items-center text-sm font-medium text-black'>
          <span className='pl-1 text-xl font-bold'> {isChecked ? 'Reciept' : 'Invoice'} </span>
        </span>
      </label>

    </>
  )
}
