import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Button = ({content,styles,action,icons}) => {

  const navigate=useNavigate()

  return (
    <>
    <button 
        className={`  w-[170px] font-semibold text-lg px-5 py-2 h rounded-lg shadow-lg shadow-black/20 hover:scale-[1.07] transition-all duration-200 ease-in-out tracking-wider ${styles}`}

        onClick={()=>{
          action()
        }}
    >
        {content}{icons}
    </button>
    </>
  )
}
