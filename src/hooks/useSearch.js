import React, { useState } from 'react'

export const useSearch = (data,searchValue) => {

    /*
       items.filter((item)=>{
                        return searchValue.toLowerCase()===''?item:item.dish.toLowerCase().includes(searchValue);
                    }).map((item,i)=>

    */
    const[Value,setValue]=useState()
    
    setValue(data.filter((item)=>{
     searchValue.toLowerCase()===''?item:item.toLowerCase().includes(searchValue)
   }))

   return
}
