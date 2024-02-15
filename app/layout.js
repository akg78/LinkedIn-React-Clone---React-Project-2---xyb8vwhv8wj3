'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './(Components)/Navbar'
import { createContext, useEffect, useState } from 'react'





export const context=createContext();
export default function RootLayout({ children }) {
  const [show ,setshow]=useState(false);
  useEffect(()=>{
if(localStorage.getItem("token")){
    setshow(true);
} 
  },[])
  return (
    <html lang="en">
      <body >
        <context.Provider value={{show,setshow}}>
       <Navbar />
        {children}
        </context.Provider>
      </body>


    </html>
  )
}


