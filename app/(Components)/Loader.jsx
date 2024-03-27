"use client";
import { LinearProgress } from "@mui/material";
import React from "react";

export default function Loader() {
  return (
    <div>
      <LinearProgress determinate={false} value={25} variant="soft" />
    </div>
  );
}
