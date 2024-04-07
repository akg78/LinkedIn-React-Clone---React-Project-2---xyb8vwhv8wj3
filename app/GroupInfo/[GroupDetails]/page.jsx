"use client";

import React, { useState, useEffect, useContext, useMemo } from "react";
import "./groupinfo.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
// import { sideBarImg, userCoverPicHome } from '../(Constants)/Assets';
// import index from 'toastify';
import { Avatar } from "@mui/material";
import { sideBarImg, userCoverPicHome } from "@/app/(Constants)/Assets";
import { useRouter } from "next/navigation";
import GroupsIcon from '@mui/icons-material/Groups';

export default function page(props) {
  const [localStorageValue, setLocalStorageValue] = useState();
  const [getId, setGetId] = useState({});
  const router = useRouter();

  const getChannelid = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/linkedin/channel/${props.params.GroupDetails}`,
        {
          method: "GET",
          headers: {
            ProjectID: "i1dieevrt9g1",
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setGetId(result.data);
      console.log("heeee", result);
    } catch (error) {
      // console.log(error, "error");
    }
  };

  useEffect(() => {
    const value = localStorage.getItem("name");
    setLocalStorageValue(value);
    getChannelid();
  }, []);

  function navigateProfile(id) {
    router.push(`/${id}`);
  }

  return (
    <>
      <div className="flex homeContainer-Group">
        <CssBaseline />
        <Box sx={{ mt: "25px", width: "1130px", display: "flex" }}>
          {getId.owner && (
            <div className="sidebarLeft-sidebarLeftGroup">
              <div className="flexc sidebarDetails-sidebarDetailsgroup flexa">
                <div className="userCoverImg-groupcover">
                  {userCoverPicHome}
                </div>
                <div className="userProfilePic-group">
                  <Avatar
                    sx={{ backgroundColor: "#1F6CFA", scale: "1.8", marginLeft: "15px", marginTop: "15px" }}
                  >
                    {localStorageValue
                      ? `${JSON.parse(localStorageValue)
                          .slice(0, 1)
                          .toUpperCase()}`
                      : ""}
                  </Avatar>
                </div>

                <h4 className="username cp"
                  onClick={() => {
                    navigateProfile(getId.owner._id);
                  }}
                >
                  {/* {getId.owner.name} */}
                {localStorageValue ? `${JSON.parse(localStorageValue).charAt(0).toUpperCase() + JSON.parse(localStorageValue).slice(1)}` : ""}

                </h4>
                <p>joined at :{getId.createdAt}</p>

                <p>
                  HTML | CSS | JavaScript | React | Java | Web Developer with a
                  Passion for Creating Beautiful Websites.
                </p>
              </div>
              <div className="ml10 sidebarLink">
                <Link
                  href="Groups"
                  style={{
                    textDecoration: "none",
                    color: "#0A66C2",
                    fontSize: "12.5px",
                    fontWeight: "551",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSmooth: "always",
                  }}
                >
                  Groups
                </Link>
              </div>
            </div>
          )}

          <div className="mainContainer-group">
            <div className="createPost-group">
              {userCoverPicHome}
              <span className="groupInfoDp">
                <div className="flex">{getId.image != null ? <img src={getId.image} /> : <p className="groupProfiledp flex flexja fnt20">{getId.name != null ? `${getId.name.slice(0,1).toUpperCase()}` : ""}</p>}</div>
              </span>
              <div className="flex flexc composePostFooter-group">
                <span className="fnt18 w600 ml10 ">{getId.name}</span>
                <span className="desgroup">{getId.description}</span>
                <div className="flex flexja groupIcon ml10 mt10 fnt13 txt5 g5 cp"><GroupsIcon sx={{height: "0.9em", width: "0.9em"}}/>Public Group</div>
              </div>
            </div>
            {/* map to feed  */}

            <div className="feedPost-group mt10 ">
              <p className="fnt14 txt6">No posts available</p>
            </div>
          </div>
          <div className="sidebarRight-sidebarRightGroup flexc">
            <div className="sideBarNews-group">
              <h4 className="pl20 pt10 lnews-group">Linkedin News</h4>
              <ul>
                {/* {news && news.map((item, index) => (
                <li key={index}>
                  <a href={item.url}>{item.title}</a>
                  <p className='fnt12 txt2'>{item.publishedAt}</p>
                </li>
              ))} */}
              </ul>
            </div>
            <div className="sideBarImg-group">
              <Link href="TryPremium">
                <img src={sideBarImg} />
              </Link>
            </div>
          </div>
        </Box>
      </div>
      {/* <ToastContainer /> */}

      {/* <Loader/> */}
    </>
  );
}
