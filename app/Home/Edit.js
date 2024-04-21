"use client";
import React, { useState, useEffect } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import "./Edit.css";
import { Avatar } from '@mui/material';

export default function Edit({ setPopEdit, modifyTitle, setModifyTitle, modifyContent, setModifyContent, modifyPostID, setModifyPostID, toggle, setToggle }) {



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
            // console.log(response.json());
            setToggle(!toggle);
        } catch (error) {
            // console.log(error);
        }
    }


    return (
        <div>
            <div className="popUpPost editPost mb20">
                <div className="headerPop p30 flex flexa g10">
                    <div className="imgPop">
                        <div className='flex flexa'>
                            <Avatar
                                sx={{
                                    backgroundColor: "#1F6CFA",
                                    scale: "1.4",
                                }}
                            >
                                {localStorage.getItem("name")
                                    ? `${JSON.parse(localStorage.getItem("name"))
                                        .slice(0, 1)
                                        .toUpperCase()}`
                                    : ""}
                            </Avatar>
                            <p className='ml20' >
                            {localStorage.getItem("name") ? `${JSON.parse(localStorage.getItem("name"))}` : ""}
                            </p>
                        </div>

                    </div>
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
                    <div className='flex flexjsb'></div>
                    <button
                        className="flex flexja fnt14 cp saveButton"
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
