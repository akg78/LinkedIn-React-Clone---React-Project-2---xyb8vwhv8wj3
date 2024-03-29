'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './(Components)/Navbar'
import { createContext, useEffect, useState } from 'react'






export const context = createContext();
export default function RootLayout({ children }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [show, setshow] = useState(false);
  const [toggle, setToggle] = useState(false)
  const [popEdit, setPopEdit] = useState(false);
  // const [loginId, setLoginId] = useState("");
  // const [theme, setTheme] = useState("light-theme");

  // const toggleTheme = ()=>{
  //   setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  // }


  useEffect(() => {
    if (localStorage.getItem("token")) {
      setshow(true);
    }
  }, [])
  return (
    <html lang="en">
      <body className='light-theme'>
        <context.Provider value={{ show, setshow, setShowNavbar, showNavbar, toggle, setToggle, popEdit, setPopEdit }}>
          {showNavbar && <Navbar />}
          {children}
        </context.Provider>
      </body>


    </html>
  )
}


