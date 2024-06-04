import {React,useState,useEffect} from 'react'
import axios from 'axios';

export default function useFetchApi  (API,check)  {

    const [data,setData]=useState([])
    const[loading,setLoading]=useState(false)


    const fetchData=async()=>{

        await axios.get(API)
        .then((response)=>{
            setLoading(true)
            if(check){
                data.filter(item=>{
                    if(item.quantity<1)
                    {
                        const id=item.id
                         axios.delete(API+id)
                         .then(()=>fetchData())
                        .catch(err=>console.log(err.message))
                    }    
                })
            }
            setData(response.data)
        })
        .catch((err)=>console.log(err.message))
        .finally(()=>setLoading(false))
        
    }
    useEffect(()=>{
        fetchData()
    },[])

   

       return [data,loading,fetchData]
}
