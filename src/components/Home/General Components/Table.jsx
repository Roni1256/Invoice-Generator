import React, { useEffect, useState } from 'react'
import { IoIosAdd } from "react-icons/io";





const table='w-full bg-white  ',
    th='p-2 text-center bg-blue-700 text-white  ',
    td='text-center py-2 text-lg ',
    quantityStyle='w-[50px] p-2 ring-2 ring-gray-700 rounded-sm focus:ring-green-800 focus:outline-none'
    ,
btn='text-3xl flex items-center justify-center bg-blue-700 text-white  hover:bg-blue-900 hover:text-white focus:bg-blue-900 focus:text-white  rounded-md'


export const Table = ({data,mod,loading,addFunc,style}) => {

    const [searchValue,setValue]=useState("")

    const [quantity,setQuantity]=useState(1)


  return (
    <>
    <div className="bg-blue-100  p-5 rounded-md w-full ">

    <input type="search" className='w-full px-3 py-2 rounded-md text-lg ring-4 shadow-lg  ring-slate-500 focus:ring-blue-500 focus:outline-none relative my-3 mt-0 tracking-wider' placeholder='Search here...' 
    onChange={(e)=>{
        setValue(e.target.value)
    }}/>

    <div className={` ${style}  overflow-scroll `}>
        <table className={`${table} `}>
            <thead>
                <tr>
                    <th className={`${th} w-[10%]`}>S.no</th>
                    <th className={`${th} w-[50%]`}>Product</th>
                    <th className={`${th} w-[10%] `}>Price</th>
                    <th className={`${th} `}>Quantity</th>
                    {mod===2?<th className={`${th} `}>Remaining Quantity</th>:null}
                    <th className={`${th} `}>Add</th>
                </tr>
            </thead>
            <tbody  >

                {
                    
                    data.filter((item)=>{
                        return(
                            searchValue.toLowerCase()===""?item:item.product.toLowerCase().includes(searchValue.toLowerCase())
                        )

                })
                .map((item,i)=>{
                        return(
                            <>
                                <tr 
                                  key={i} className={i%2===0?"bg-gray-200":""}>
                                    <td className={`${td} font-semibold `}>{i+1}.</td>
                                    <td className={`${td}`}>{item.product}</td>
                                    <td className={`${td}`}>{item.price}.rs</td>
                                    <td className={`${td} `}>
                                        <input type="number" 
                                                min={1}  className={quantityStyle} 
                                                onChange={(e)=>{ setQuantity(e.target.value) }}
                                                

                                                />
                                    </td>
                                    {
                                        mod===2?<td className={`${td}`}>{item.quantity}</td>
                                        :null
                                        
                                    }
                                    

                                    <td className={`${td} flex items-center justify-center`}>
                                    <button className={btn} 
                                                    onClick={(e)=>{
                                                        addFunc(item.id, quantity,item.product,item.price); setQuantity(1)
                                                        
                                                        }}>
                                            <IoIosAdd className='text-5xl font-bolder '/>
                                        
                                            </button>
                                    </td>
                                </tr>
                            </>
                        )

                    })
                }
                
              
            </tbody>
            <tfoot></tfoot>

            
        </table>
       {loading?<h1 className='text-center text-lg font-semibold tracking-wider '>Loading...</h1>:null} 
       {
        data.length===0?<h1 className='text-center text-lg font-semibold tracking-wider mt-10 '>Empty List...</h1>:null
       }
    </div>
    </div>
 
    </>
  )
}



//  items.filter((item)=>{
    // return searchValue.toLowerCase()===''?item:item.dish.toLowerCase().includes(searchValue);
// })