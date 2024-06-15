import React, { useEffect, useState } from 'react'
import { MdSpaceDashboard } from "react-icons/md";
import samplepic from "../images/codelogo.png"
import useFetchApi from '../hooks/useFetchApi';
import { Outlet, json } from 'react-router-dom';
import axios from "axios"
import { Button } from '../components/Home/General Components/Button';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Details } from '../components/Home/Details';
import { FaArrowCircleUp,FaArrowCircleDown } from "react-icons/fa";
import { IoHome } from "react-icons/io5";




const main="w-full  bg-white rounded-md flex flex-col p-3 lg:p-10 text-slate-800 lg:w-[95%] m-5  ",
head="w-full p-2  text-2xl font-bold tracking-wide flex items-center gap-5 justify-between ",
body="flex flex-col gap-5",
foot="",
hr="w-full h-[1.5px] bg-gray-400 rounded-full",
content="mt-10 p-5 text-3xl font-semibold tracking-wide leading-[1.5]",
profile="flex flex-col xl:flex-row gap-2 lg:gap-20 items-center justify-center  lg:justify-evenly",
accessable="flex gap-20 my-5 mt-10 w-fit mx-10 items-center justify-center",
section="",
navigation=" flex justify-evenly py-5  "

const API_URL="http://localhost:8000/data/"

export const Dashboard = () => {

    const [productData,load,fetchProducts]=useFetchApi("http://localhost:8000/productsdata")
    const navigate=useNavigate()
    const [data,setData]=useState([])
    const [show,setShow]=useState(true)
    const fetch=async()=>{
        await axios.get(API_URL)
        .then(r=>{
            setData(r.data[0])

        }
        )
        .catch(err=>console.log(err))

    }
    useEffect(()=>{fetch()},[])
    
    const deleteId=async()=>{
        await axios.delete(API_URL+data.id)
        .then((r)=>navigate("/"))
        .catch(err=>console.log(err.message))
        productData.forEach(product => {
             axios.delete(`http://localhost:8000/productsdata/${product.id}`).catch(err=>console.log(err.message))
        });


    }
  return (
    <>
    <div className={main}>

        <header className={head}>
            <div className="flex items-center gap-3"><MdSpaceDashboard />
            DashBoard</div>
        
            <button onClick={()=>navigate('/')}><IoHome className='text-3xl hover:text-cyan-600 transition-all duration-200 ease-in-out'/></button>
        </header>
        <hr className={hr}/>
        {
            show?
            <main className={body}>
            <div className={content}>
                Welcome Back! 
                <strong className='text-yellow-500 mx-4'>
                    {data.username}
                </strong>
            </div>
            <div className={profile}>
               
                <div className="p-2">
                <h1 className='text-5xl font-semibold text-yellow-600 mt-4 text-center'>
                    {data.companyname}
                </h1>
                <p className='text-center text-lg font-bold  text-slate-600 mt-5 ' >
                    {data.companyslogan}
                </p>
                <div className='p-4 ring-4 rounded-lg ring-slate-700 mx-6 mt-4 h-[150px] overflow-y-auto relative lg:w-[500px] xl:w-[600px] '>
                    <span className='absolute top-1 text-slate-600 font-bold underline'>Company Address</span>
                    <p className='mt-5  '>
                        {data.description}
                    </p>
                </div>
            </div>
                
            
            </div>
            <div className={accessable}>
                    <Button styles={"bg-red-700 text-white flex items-center gap-5 w-fit py-3 "} content={"Delete Id"} icons={<MdDelete />} action={deleteId}/>
            </div>
            </main>
            :null
        }
        
        <hr className={`${hr} relative`}/>
        <div className="relative flex w-full justify-center">
        <button className='absolute top-[-15px] text-4xl bg-white rounded-[50%] ring-2 ring-slate-600 p-2 ' onClick={()=>setShow(!show)}>{show?<FaArrowCircleUp />: <FaArrowCircleDown />}</button>
        </div>
        
        <div className={section}> 
            <div className={navigation}>
                <Button styles={"text-white bg-slate-900 w-fit text-sm px-2 py-1  "} content={"Create Bill"} action={()=>navigate("createbill")}/>
                <Button styles={"text-white bg-slate-900 w-fit text-sm px-2 py-1  "} content={"Data Center"} action={()=>navigate("crud")}/>
            </div>
            <div className="">
                <Outlet/>
            </div>
        </div>

    </div>
    
    
    
    </>
  )
}


