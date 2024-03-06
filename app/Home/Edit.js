import React, { useState, useEffect } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import "./Edit.css";

export default function Edit({setPopEdit, modifyTitle, setModifyTitle, modifyContent, setModifyContent, modifyPostID, setModifyPostID, toggle, setToggle}) {
   
    



    const editPost = async (id) => {
        try {
            let formData = new FormData();
          formData.append("title", modifyTitle);
          formData.append("content", modifyContent);
        //   formData.append("images", PostImg);
          const response = await fetch(
            `https://academics.newtonschool.co/api/v1/linkedin/post/${id}`,
            {
              method: "PATCH",
              headers: {
                ProjectID: "i1dieevrt9g1",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: formData,
    
            }
          );
          console.log("abc" , response.json());
          setToggle(!toggle);
        } catch (error) {
          console.log(error);
        }
      }

    return (
        <div>
            <div className="popUpPost editPost mb20">
                <div className="headerPop p30 flex flexa g10">
                    <div className="imgPop">
                        <img />
                    </div>
                    <div className="">Ankit</div>
                    <CloseIcon
                        onClick={() => {
                            setPopEdit(false);
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
                        value={modifyTitle}
                        onChange={(e) => {
                            setModifyTitle(e.target.value);
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
                        value={modifyContent}
                        onChange={(e) => {
                            setModifyContent(e.target.value);
                        }}
                    />
                </div>
                <hr className="hrCreatePost" />
                <div className="popPost flex flexja flexjsb p20 cp">
                    <div className="fnt12 g5 flex flexa addImg">
                        {/* <ImageIcon className="mediaIcon" />
                        <input
                            type="file"
                            onChange={(e) => {
                                s(e.target.files[0]);
                            }}
                        /> */}
                    </div>
                    <button
                        style={{}}
                        className="flex flexja fnt14 cp"
                        disabled={!modifyTitle || !modifyContent}
                        onClick={() => {
                            editPost(modifyPostID);
                            setPopEdit(false);
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
