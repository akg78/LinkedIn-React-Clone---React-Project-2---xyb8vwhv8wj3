"use client";

import React, { useEffect, useState } from "react";
import "./createGroup.css";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Box, MenuItem } from "@mui/material";
import { styled } from "@mui/joy";
import { Edit } from "@mui/icons-material";

export default function CreateSpaceButton(getChannel) {
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState("");
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  // const [channelImage, setChannelImage] = useState("");

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  const createGroup = async () => {
    let formData = new FormData();
    formData.append("name", channelName);
    formData.append("description", channelDescription);
    // formData.append("image", channelImage);
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/linkedin/channel/",
        {
          method: "POST",
          headers: {
            ProjectID: "i1dieevrt9g1",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );
      const result = await response.json();
      console.log("chanelllllllllllllll", result);
      setGroup();
      getChannel();
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="mainGroupContainer">
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{}}
      >
        Create Group
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 750,
            height: 650,
            borderRadius: "md",
            // p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
            p={2}
          >
            Create group
          </Typography>
          <Box sx={{ width: "100%" }}>
            <div className="coverGroup">
              <div className="groupDp">
                <span className="flex coverProfilePic">
                  <Button
                    sx={{ height: "5px", width: "5px", borderRadius: "10px" }}
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    variant="plain"
                    color="neutral"
                    startDecorator={
                      <Edit
                        sx={{
                          height: "15px",
                          width: "15px",
                          borderRadius: "10px",
                          backgroundColor: "white",
                        }}
                      />
                    }
                  >
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </span>
              </div>
              <div className="postButton">
                <Button
                  onClick={() => {
                    createGroup();
                    setOpen(false)
                  }}
                >
                  Post
                </Button>
              </div>
            </div>
            <div className="flex flexc groupName">
              <label>Group Name*</label>
              <input
                type="text"
                placeholder="ENTER YOUR GROUP NAME"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
            </div>
            <div className="flex flexc description">
              <label>Description*</label>
              <textarea
                style={{
                  minWidth: "100%",
                  minHeight: "89%",
                  maxHeight: "175px",
                  maxWidth: "150px",
                }}
                id="text"
                placeholder="What do you want to talk about?"
                value={channelDescription}
                onChange={(e) => setChannelDescription(e.target.value)}
              />
            </div>
          </Box>
        </Sheet>
      </Modal>
    </div>
  );
}
