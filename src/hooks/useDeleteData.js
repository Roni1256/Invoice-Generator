import React from 'react'
import { axios } from "axios";
export const useDeleteData =  (API,id,fetching) => {

    return axios.delete(API+id)
    .then(()=>fetching())
    .catch(err=>console.log(err.message));

}
