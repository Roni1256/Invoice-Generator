import React, { useState } from 'react'
import { Button } from '../components/Home/General Components/Button'
import axios from 'axios';
import { Formelements } from '../components/Home/General Components/Formelements';
import useFetchApi from "../hooks/useFetchApi"
import { CRUDtable } from '../components/CRUD/CRUDtable';


const URL=`http://localhost:8000/productsdata/`



export const Crud = () => {
  
  const [empty,setEmpty]=useState(false)
  const [productName,setProductName]=useState('')
  const [productPrice,setProductPrice]=useState('')
  const [data,load,getData]=useFetchApi(URL)


  const postProducts=async()=>{
    const postObj={
      product:productName,
      price:productPrice
    }
    if(productName===""||productPrice==="")
      setEmpty(true)
    else{

      await axios.post(URL,postObj)
      .then(()=>{
        getData();
        setProductName("")
        setProductPrice("")
      })
      .catch(err=>console.log(err.message))

    }
    
    
  }

  const deleteData=async(id)=>{
    await axios.delete(URL+id)
    .then(()=>getData())
    .catch(err=>console.log(err.message))
  }






  return (
    <>
    <div className="relative bg-gray-100 p-10 px-20 flex flex-col xl:flex-row gap-10 justify-center">

      <div className="  bg-white m-5 ring-2 ring-slate-200 rounded-lg h-fit p-5 w-[60vw]">
        <h1 className='text-2xl font-bold  '>Add Products</h1>
        <Formelements 
          label={"Product Name"} 
          action={(e)=>{setProductName(e.target.value)}}
          value={productName}
          />
        <Formelements 
          label={"Product price"} 
          action={(e)=>{setProductPrice(e.target.value)}} 
          others={1} 
          type={"number"}
          value={productPrice}
          />
        <div className="flex items-center justify-center">
          <Button styles={"bg-blue-700 text-white "} content={"Add"} action={postProducts}/>
        </div>
      </div>
      <div className=" w-full">
        <CRUDtable data={data} deleteFunc={deleteData}/>  
      </div>
      
    </div>

    
    
    </>
  )
}


