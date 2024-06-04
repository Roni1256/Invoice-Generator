import React from 'react'

export const useIdgen = () => {

    const date=new Date()
    const id=String(Date.now().toString(16)+"-"+(Math.random()*1000000000000000000).toString()+"-")
    return id
    
}
