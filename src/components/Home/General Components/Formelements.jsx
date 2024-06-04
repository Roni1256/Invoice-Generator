import React, { useState } from 'react'
import "./formstyle.css"

export const Formelements = ({label,action,value,others,type,style}) => {
  
  return (
    <>

    <div className=" main flex flex-col  text-slate-800 text-xl font-bold p-5  gap-3 relative transition-all ease-in-out duration-200 items-center justify-center"
    >
        <input 
          type={others?type:"text"} 
          className={`ring-4 rounded-lg ring-slate-800 focus:outline-none w-full p-3  tracking-wide hover:ring-blue-500 focus:ring-blue-700 transition-all  duration-300 ease-in-out ${style}`} 
          required 
          onChange={(e)=>action(e)} 
          value={value}
        /> 
        <span className='absolute left-10 pointer-events-none text-xl uppercase text-[1em] px-5 h-fit '>{label}</span>


    </div>
    </>
  )
}
