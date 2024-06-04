import React from 'react'
import samplepic from "../../images/codelogo.png"
import { Table } from '../Home/General Components/Table'
import { TemplateTable } from '../Home/General Components/TemplateTable'


const header="w-full h-[100px] border-b-4 px-5 py-4 border-slate-500 bg-slate-800 flex items-center justify-between",
headtext="text-white text-3xl",
logo="rounded-[100%] ring-4 ring-white w-[70px] h-[70px]",
section="flex justify-between ",
main="p-7 py-5",
footer="bg-slate-800 text-white p-5 flex justify-between"

export const Template = ({companyData,data,products}) => {

  return (
   <>
   <div className="flex  flex-col justify-between  bg-white ring-2 ring-slate-700/50 rounded-sm  ">
    <header className={header}>
        <h1 className={headtext}>{companyData.companyname}</h1>
        <img width={100} src={samplepic} className={logo}/>
    </header>
    <main className={main}>
        <section className={section}>
           <div >
                <Element label={"Name"} info={data.name}/>
                <Element label={"Email Address"} info={data.email}/>
                <Element label={"Mobile Number"} info={data.phone}/>
                <Element label={"Address"} info={data.address}/>
            </div> 
            <div>
                <Element label={"Invoice Number "} info={data.invoiceno} />
                <Element label={"Invoice Date"} info={data.date} />
            </div>
        </section>
        <section>
            <TemplateTable data={products}/>
        </section>
    </main>
    <footer className={footer}>
        <div className="w-[250px]">
            <strong className='underline'>Company Address</strong><br />
            3/20,Chruch Street,
            Kombakkadu Pudhur,
            Somanur road,
            Tiruppur-641668
        </div>
        <span className='text-3xl text-center pr-5 pt-4'>Thank You!</span>
    </footer>
   </div>
   </>
  )

  function Element({label,info,style}){

    const labelStyle="text-xl font-bold underline  ",
    infoStyle=`text-lg font-semiboldtracking-wide break-keep w-[230px] px-5 ${style} `
    return(
        <>
        <div className=" flex flex-col gap-3 " >
            <label className={labelStyle} >{label}</label>
            <div className={infoStyle}  style={{wordSpacing:"3px"}}>{info}</div>
        </div>
        </>
    )
  }
}

