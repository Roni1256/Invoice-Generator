import React, { useState,useRef, useEffect } from 'react'
import { Formelements } from '../components/Home/General Components/Formelements'
import useFetchApi from '../hooks/useFetchApi'
import { Button } from '../components/Home/General Components/Button'
import { IoIosCloseCircle } from "react-icons/io";
import { Table } from '../components/Home/General Components/Table';
import { Template } from '../components/Billing/Template';
import { usePDF } from 'react-to-pdf';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { Toggle } from '../components/Home/General Components/Toggle';
import {Bill} from "../components/Billing/Bill"

const container="p-10 my-3  mx-8 bg-gray-50  h-fit rounded-md ring-1 ring-slate-400/50",
    form="h-screen ",
    head="text-2xl text-slate-800 font-semibold tracking-wide  flex items-center justify-between py-5",
    subheadings="text-xl font-bold  ",
    main="h-[850px] overflow-auto",footer="flex justify-center gap-24 "


const URL=`http://localhost:8000/productsdata/`,
    COMPANY_URL=`http://localhost:8000/data/`
export const CreateBill = () => {
    const { toPDF, targetRef } = usePDF({filename: 'Invoice.pdf'});
    const form=useRef();
    const [data,load,getData]=useFetchApi(URL,1);
    const [companyData,setData]=useState([])
    const fetch=async()=>{
        await axios.get(COMPANY_URL)
        .then(r=>{
            setData(r.data[0])
            console.log(companyData);

        }
        )
        .catch(err=>console.log(err))

    }
    useEffect(()=>{fetch()},[])

    
    const 
    [name,setName]=useState(""),
    [email,setEmail]=useState(""),
    [phone,setPhone]=useState(""),
    [address,setAddress]=useState(""),
    [invoicenumber,setInvoiceno]=useState(1),
    [billType,setBillType]=useState(1);
    const date=new Date()

    const presentDate=add0(date.getDate())
    const month=add0(date.getMonth()+1)
    const year=add0(date.getFullYear())
    const hour= add0(date.getHours())
    const min=add0(date.getMinutes())
    const sec=add0(date.getSeconds())
    const time=`${hour}:${min}:${sec}`

    function add0(value){
        return value<10?("0"+value):value;
    }
    const dates=`${presentDate}/${month}/${year}`
    const sentToObj={
        name:name,
        email:email,
        phone:phone,
        address:address,
        invoiceno:invoicenumber,
        date:dates
    }

   

    const [products,setProducts]=useState([])
    const sendToInvoice=()=>{
        toPDF()
        if(billType===1){
            if( name===""||email===""||phone===""||address===""||products.length===0)
                alert("Fill the informations")
            else{
            toPDF();
            setName("");
            setEmail("")
            setAddress("")
            setPhone("")
            setProducts([]);
            setInvoiceno(invoicenumber+1)
            }
        }
        else{
            if(products.length===0){
                alert("Add Some Products")
            }
            else{
                setProducts([]);
            setInvoiceno(invoicenumber+1)
            }
        }

    }

    const onAddProduct=(id,quantity,name,price)=>{
        setProducts([...products,
            {
                id:id, 
                name:name ,
                price:price ,
                quantity:quantity  
            }
        ])
        console.log(name,id,quantity,price);
    }

    const deleteProduct=(id)=>{
        setProducts(products.filter(product=>product.id!==id))
    }


  return(<>

    <div className="flex flex-col xl:flex-row justify-between xl:p-5 ">
        <div className={`${container} overflow-y-auto h-[1000px]`}>
            <header className={head}>
                <div className="">
                <h1>Ready to Bill on time!</h1>
                <p className='text-xl font-bold text-yellow-600'>Satisfaction of the customer is the best reward </p>
                </div>
                
                <Toggle setbilltype={setBillType} />
            </header>
            <main className={main}>
                {billType===1?
                <div className="">
                <h1 className={subheadings}>Customer Infomations</h1>
                <Formelements label={"Customer Name"} action={(e)=>setName(e.target.value)}/>
                <Formelements label={"Customer E-mail"} others={1} type={"email"} action={(e)=>setEmail(e.target.value)}/>
                <Formelements label={"Customer Phone Number"} type={"number"} others={1} action={(e)=>setPhone(e.target.value)}/>
                <Formelements label={"Customer Address"} action={(e)=>setAddress(e.target.value)}/>
            </div>
                :null}
                
                <hr />
                <div className="my-5">
                    <h1 className={subheadings}>Products</h1>
                    <div className="flex flex-col gap-5">
                        <Table style={"h-[300px] xl:h-[400px]"} data={data} loading={load} addFunc={onAddProduct} />
                        <div className="bg-blue-50 ring-2 ring-blue-700/20 rounded-sm py-10  px-7 transition-all duration-300 ease-in-out  overflow-y-auto h-[400px]">
                            {
                                products.map((product,index)=>{
                                    return<>
                                    <ProductTags 
                                    data={product}
                                    index={index}
                                    />
                                    </>
                                })
                            }
                        </div>
                    </div>

                </div>

            </main>
            <footer className={`${footer} py-6 `}>
                <Button styles={"bg-blue-700 text-white"} content={"Next"} action={sendToInvoice}/>
                <Button styles={"bg-red-700 text-white"} content={"Cancel"}/>
            </footer>
        </div>
        <div className={`${container} flex items-center justify-center `} ref={targetRef}>
            {
                billType===1?
            
            <Template data={sentToObj} products={products} companyData={companyData}/>
            :
            <Bill products={products} date={dates} billno={invoicenumber} time={time}/>
            }
        </div>
    </div>
       

  </>)

  function ProductTags({data,index}){
    

    return <>
    <div className=" p-3 bg-white ring-1 ring-slate-500/50 rounded-full flex items-center gap-4 justify-between text-lg font-semibold hover:ring-slate-700 hover:ring-2 cursor-pointer my-3">
        <span>{data.name}</span>
        <button className='text-xl hover:text-red-600 cursor-pointer' onClick={()=>deleteProduct(data.id)} >
            <IoIosCloseCircle/>
        </button>
    </div>
    </>
  }
}

