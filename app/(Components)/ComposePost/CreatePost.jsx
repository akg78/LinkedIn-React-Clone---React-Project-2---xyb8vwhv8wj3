"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import { context } from "@/app/layout";
import { ToastContainer, toast } from "react-toastify";

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
      console.log(result);
      setToggle(!toggle);
    } catch (error) {
      console.log(error);
    }
  };

  // const postToast = ()=>{
  //   toast("Post Successfull");
  // }

  return (
    <div>
      <div className="popUpPost mb20">
        <div className="headerPop p30 flex flexa g10">
          <div className="imgPop">
            <img />
          </div>
          <div className="">Ankit</div>
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
          <div className="fnt12 g5 flex flexa addImg">
            <ImageIcon className="mediaIcon" />
            <input
              type="file"
              onChange={(e) => {
                setPostImg(e.target.files[0]);
              }}
            />
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
