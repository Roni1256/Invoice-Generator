import React from 'react'
import { TypeAnimation } from "react-type-animation";
import { GrLinkNext } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import {useNavigate} from "react-router-dom"
import useFetchApi from '../hooks/useFetchApi';
import bill from '../images/bill.png'

const API_URL="http://localhost:8000/data"
export const Home = () => {

  const navigate=useNavigate()

  const [data,loading,fetchData]=useFetchApi(API_URL)




  const statedFunc=()=>{
  if(data.length)
    navigate("/dashboard")
  else
    navigate("/details")
  }

  return (
    <>
        <div className="h-screen p-20 text-white flex flex-col gap-10 transistion-all duration-200 ease-in-out">
      <header className='text-3xl flex gap-5 w-fit text-white cursor-pointer '><IoHome className='text-yellow-500 hover:drop-shadow-lg hover:shadow-yellow-200 hover:text-white  ' onClick={()=>{
        navAccess('/home')
      }}/> <span className='xl:block hidden'>Home</span> </header>
      <main className='mt-10 flex flex-col lg:flex-row gap-10'>
        <section className= "z-20">
        <h1 className='text-5xl tracking-wide animate-textFlyin'>
            Companies
            <span className='text-yellow-500 tracking-normal font-bold'> Invoice
            Generator</span> 
          </h1>
          <p className='mt-5 mb-5 text-2xl lg:w-[550px] line-clamp-2  hover:line-clamp-none ease-in-out transition-all duration-200 animate-textFlyin'>Looking for a easy way to generate your bills ! 
          <br />
          Take a Look here!
          <br />
          </p>
          <span className='text-5xl text-yellow-400 font-bold tracking-wider animate-textFlyin '>       
            <TypeAnimation
                
                sequence={[
                  'Fast',3000,
                  'Secure',3000,
                  'Accurate',3000
                ]}
                wrapper='span'
                speed={10}
                deletionSpeed={50}
                repeat={Infinity}
                />
          </span>
          <button className='  text-white lg:text-2xl text-xl text-center w-fit p-5 bg-yellow-600 ring-2 ring-white rounded-xl mt-16 ml-0
           transistion-all ease-in-out duration-200  hover:scale-[1.2] focus:bg-yellow-900 shadow-lg shadow-black  flex items-center gap-5 animate-textFlyin'onClick={()=>statedFunc()} >Lets Get Started! <span className='animate-arrowAnimation'><GrLinkNext /></span></button>
        </section>
        <img src={bill} alt="" className='w-[400px] h-[400px] rounded-3xl absolute -z-0 right-0 lg:relative mix-blend-overlay lg:mix-blend-normal animate-reciept  ' />
      </main>
      

    </div>
    </>
  )

}


