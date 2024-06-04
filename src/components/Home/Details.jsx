import React, { useEffect, useState,useRef } from 'react'
import { TbFileDescription } from "react-icons/tb";
import { Button } from './General Components/Button';
import { Formelements } from './General Components/Formelements';
import "./General Components/formstyle.css"
import "./General Components/formstyle.css"
import {useNavigate} from "react-router-dom"
import axios from "axios"


const API="http://localhost:8000/data"
export const Details = ({mode}) => {

  const inputRef=useRef(null)
  const navigate=useNavigate()

  const [username,setUsername]=useState("")
  const [companyname,setCompanyname]=useState("")
  const [companyslogan,setSlogan]=useState("");
  const [description,setDescription]=useState("")
  const [logo,setLogo]=useState();
  const [companydata,setData]=useState([]);
  const [emptyField,setEmptyField]=useState(false)
  const [response,setResponse]=useState([])

  // const [editUsername,setEditUsername]=useState("")
  // const [editcompanyname,setEditCompanyname]=useState("")
  // const [editSlogan,setEditSlogan]=useState("")
  // const [editdescription,setEditdescription]=useState("")

  const handleFileChange=(e)=>{
    const file=e.target.files[0]
    setLogo(URL.createObjectURL(file))
  }


  const sendToDb=async()=>{
    const sendObj={
      username:username,
      companyname:companyname,
      companyslogan:companyslogan,
      description:description,
      logo:logo,
      companydata:companydata
    }


    if(username==="" || companyname==="" || companyslogan==="" || description===""  ){
      setTimeout(()=> {
        setEmptyField(false)
      }, 3000);
     setEmptyField(true)
    }

    else{
      await axios.post(API,sendObj)
      .then(()=>navigate("/dashboard"))
      .catch((err)=>console.log(err.message))
    }
  }

  // const editMode=async()=>{
    
  //  await axios.get(API)
  //   .then(res=>{
  //     setResponse(res.data[0]) 
  //     setEditUsername(res.data[0].username)
  //     setEditCompanyname(res.data[0].companyname)
  //     setEditSlogan(res.data[0].companyslogan)
  //     setEditdescription(res.data[0].description)
  //     console.log(res.data)
  //   }).catch(err=>console.log(err.message))

  // }
  // useEffect(()=>{
  //   editMode()
  // },[])



  return (
    <>
    <div className=" bg-white rounded-lg text-slate-800 p-10 ">

        <header>
            <div className="text-3xl text-slate-800  flex items-center gap-5 font-bold ">
            <TbFileDescription  className='text-3xl'/>
            Describe Your Details 
            </div>
        </header>
        <main className='mt-10'>
            <form action="submit">

                <Formelements 
                  label={"Username"}
                  action={(e)=>{setUsername(e.target.value)}}
                 
                  
                />

                <Formelements
                  label={"Company Name"}
                  action={(e)=>{setCompanyname(e.target.value)}}
                  
                />
                <Formelements
                  label={"Company Slogan"}
                  action={(e)=>{setSlogan(e.target.value)}}
                  
                 />
                <div className=" main flex flex-col  text-slate-800 text-xl font-bold p-5  gap-3 relative transition-all ease-in-out duration-200 ">
                  <label className='   text-xl uppercase text-[1em] '>Description about company</label>
                    <textarea type="text" 
                    className='ring-4 rounded-lg ring-slate-800 focus:outline-none w-full p-2 tracking-wide hover:ring-blue-500 focus:ring-blue-700 transition-all  duration-300 ease-in-out 
                    ' 
                    placeholder='Our company is an ....'
                    onChange={(e)=>setDescription(e.target.value)}
                    

                    
                     />
                     
                </div>
                <div className="p-5 ring-4 ring-slate-800 rounded-md w-fit flex flex-col gap-10  ml-5 mb-5">
                <label className='  font-bold text-xl uppercase text-[1em] '>Upload company logo</label>
                  
                <input type="file" onChange={(e)=>handleFileChange(e)}
                ref={inputRef} />
                </div>
                



            </form>
            {emptyField?<span className='text-red-600 text-lg  font-semibold m-5 py-1'>Some of the fields are empty!</span>:null}
        </main>
        <footer className='mt-10 flex items-center justify-center gap-20'>
          <Button 
            content={"Next"}
            styles={"bg-blue-700 text-white"}
            action={sendToDb}
          />
          <Button content={"Cancel"} styles={"bg-red-700 text-white"} action={()=>navigate("/")}/>
        </footer>

    </div>
    </>
  )
}
