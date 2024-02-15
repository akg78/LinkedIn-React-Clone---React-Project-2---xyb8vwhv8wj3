"use client"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof (localStorage.getItem("token")) != "string") {
      router.push("/login");
    }

  }, [])

  return <div id="App">
    
  </div>
}
