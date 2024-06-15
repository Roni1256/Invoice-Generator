import React, { useEffect, useState } from 'react'
import axios from 'axios'

const
box='bg-white ring-2 ring-gray-800  px-3 w-[400px]' ,
heading='text-xl font-bold ',
header='text-center p-3',
address='text-sm font-semibold tracking-wider my-2',
main='mb-4 w-full ',
billNo='text-lg mr-8 text-right  font-bold',
tableStyle='w-full mt-5',
tr='border-b-2 border-dashed border-gray-700',
th='text-center',
td='p-1 text-center',
footTxt='text-lg font-semibold text-center underline mb-3 mt-7'
const API='http://localhost:8000/data'
export const Bill = ({products,billno,date,time}) => {
     const[total,settotal]=useState(0)
     const [cName,setCname]=useState("");
     const [cSlogan,setCslogan]=useState("")
     const [cAddress,setCaddress]=useState("")
    const handleTotal=()=>{
        let tot=0
        products.map(product=>{
            tot+=product.price*product.quantity
        })
        settotal(tot)
    }
    async function fetchData(){
        await axios.get(API)
        .then((res)=>{
            setCname(res.data[0].companyname);
            setCaddress(res.data[0].description);
            setCslogan(res.data[0].companyslogan);
        })
        .catch(err=>console.log(err.message))
    }
    useEffect(()=>handleTotal());
    useEffect(()=>{
        fetchData();
    },[])
    
  return (
    <>
        
        <div className={`${box}`} >
                <header className={header}>
                    <h1 className={heading}>{cName}</h1>
                    <h3 className={`text-md font-bold `}>{cSlogan}</h3>
                    <p className={address}>{cAddress}</p>
                </header>
                
                <main className={main}>
                    <div className="flex justify-between ">
                        <div className="flex flex-col ">
                        <span className='text-md font-semibold '>{date}</span>
                        <span className='text-md font-semibold '>{time}</span>
                        </div>
                        
                        <h3 className={billNo} >Bill No :{billno}</h3>
                    </div>
                 
                    <table className={tableStyle}>
                        <thead>
                            <tr className={tr}>
                                <th className={`${th} `}>S.no</th>
                                <th className={`${th} w-[30%]`}>Product</th>
                                <th className={`${th}`}>Price</th>
                                <th className={`${th}`}>Quantity</th>
                                <th className={`${th}`}>Total</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            {
                                products.map((product,i)=>{
                              
                                    
                                    return (
                                        <>
                                        <tr className={tr} key={i}>
                                            <td className={td}>{i+1}.</td>
                                            <td className={td}>{product.name}</td>
                                            <td className={td}>{product.price}.rs</td>
                                            <td className={td}>{product.quantity}</td>
                                            <td className={td}>{
                                          
                                            product.price * product.quantity
                                            
                                            }.rs</td>
                                        </tr>
                                        </>
                                    )

                                    
                                })

                                

                            }
                        </tbody>
                    </table>
                    <div className={`${tr} flex justify-between text-lg font-semibold`}>
                        <h2>Total Amount</h2>
                        <h2>{total}.rs</h2>
                    </div>
                </main>
                <footer>
                    <h1 className={footTxt}>Thank You ! Vist Again !</h1>
                </footer>
            </div>
    </>
  )
}
