"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import { context } from "@/app/layout";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Avatar } from "@mui/material";

export default function CreatePost({
  setpop,
  postTitle,
  setPostTitle,
  postContent,
  setPostContent,
}) {
  const [PostImg, setPostImg] = useState("");
  const { show, setshow, setShowNavbar, showNavbar, toggle, setToggle } =
    useContext(context);

  const postFetch = async () => {
    try {
      const formData = new FormData();
      formData.append("title", postTitle);
      formData.append("content", postContent);
      formData.append("images", PostImg);

      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/linkedin/post",
        {
          method: "Post",
          headers: {
            ProjectID: "i1dieevrt9g1",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );
      const result = await response.json();
      // console.log(result);
      if(result){
        setPostTitle("");
        setPostContent("");
        setToggle(!toggle);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // const postToast = ()=>{
  //   toast("Post Successfull");
  // }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div>
      <div className="popUpPost mb20">
        <div className="headerPop p30 flex flexa g10">
          <div>
          <Avatar  sx={{scale: "1.2", backgroundColor: "#1F6CFA"}}>{localStorage.getItem("name") ? `${JSON.parse(localStorage.getItem('name')).slice(0,1).toUpperCase()}` : ""}</Avatar>
          </div>
          <div>
          {localStorage.getItem("name") ? `${JSON.parse(localStorage.getItem('name')).charAt(0).toUpperCase() + JSON.parse(localStorage.getItem('name')).slice(1) }` : ""}
          </div>
          <CloseIcon
            onClick={() => {
              setpop(false);
            }}
            sx={{
              position: "absolute",
              top: "30px",
              left: "640px",
              bgcolor: "white",
              borderRadius: "50px",
              color: "gray",
              cursor: "pointer",
              scale: "1.2",
            }}
          />
        </div>

        <div className="popCompose">
          <input
            placeholder="title"
            type="text"
            value={postTitle}
            onChange={(e) => {
              setPostTitle(e.target.value);
            }}
          />
          <textarea
            style={{
              minWidth: "100%",
              minHeight: "89%",
              maxHeight: "150px",
              maxWidth: "150px",
            }}
            id="text"
            placeholder="What do you want to talk about?"
            value={postContent}
            onChange={(e) => {
              setPostContent(e.target.value);
            }}
          />
        </div>
        <hr className="hrCreatePost" />
        <div className="popPost flex flexja flexjsb p20 cp">
          <div>
            <Button
              onChange={(e) => {
                setPostImg(e.target.files[0]);
              }}
              sx={{ scale: "0.5", mr: "100px", backgroundColor: "lightgray" }}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </div>
          <button
            style={{}}
            className="flex flexja fnt14 cp"
            disabled={!postTitle || !postContent}
            onClick={() => {
              postFetch();
              setpop(false);
              // postToast()
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
