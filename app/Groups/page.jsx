"use client";
import React, { useEffect, useState } from "react";
import "./groupStyle.css";

import Box from "@mui/material/Box";
import CreateSpaceButton from "../(CreateGroup)/CreateSpaceButton";
import { useRouter } from "next/navigation";



export default function page() {
  const [activegroupColor, setActivegroupColor] = useState(false);
  const [getGroup, setGetGroup] = useState([]);
  // const [groupList, setGroupList] = useState([]);

  const router = useRouter();

  function navigate(id){
    router.push(`/GroupInfo/${id}`)
  }


  const getChannel = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/linkedin/channel`,
        {
          method: "GET",
          headers: {
            ProjectID: "i1dieevrt9g1",
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setGetGroup(result.data);
      console.log("he", result.data);
    } catch (error) {
      // console.log(error, "error");
    }
  };

  useEffect(() => {
    getChannel();
  }, []);

  const activecolor = () => {
    setActivegroupColor(!activegroupColor);
  };

  return (
    <div className="mainContainerGroup ">
      <Box
        sx={{
          bgcolor: "white",
          height: "700px",
          width: "53%",
          marginTop: "25px",
          borderRadius: "10px",
          boxShadow: "0px 0px 0px 0.2px grey",
          position: "absolute",
          left: "195px",
        }}
      >
        <div className="headerGroup flex flexjsb flexa">
          <span className="yourGroup fnt14 cp">Your groups</span>
          
          <span>{<CreateSpaceButton getChannel={getChannel} />}</span>
        </div>
        <div className="groupList p20">
          <ul>
            {getGroup &&
              getGroup.map((item, index) => 
              <div key={index} className="flex flexja g5">
                <div className="flex">{item.image != null ? <img className="groupDetailsImg" src={item.image}/> : <p className="groupProfileImg flex flexja">{`${item.name.slice(0,1).toUpperCase()}`}</p>}</div>
                <li className="flex flexa" onClick={()=>{navigate(item._id)}}>{item.name}</li>
              </div>)}
          </ul>
        </div>
      </Box>
    </div>
  );
}
