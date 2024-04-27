"use client";
import React from 'react'
import "./Jobs.css";
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { UnderContruction } from '../(Constants)/Assets';
import { useRouter } from 'next/navigation';


function Jobs() {
  const navigate = useRouter()

  const returnHome = ()=>{
    navigate.push("/"); // navigate to return Home 
  }

  return (
    <div className='mainContainerJobs'>
      <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center", scale: "1.1", width: "50%", }}>
        <Typography variant='h4' fontWeight={550}>Website currently under maintenance</Typography>
        <Stack spacing={2} sx={{ p: 2, }}>
          <Typography sx={{color: "#8b8b8a"}}>We are currently working hard on this page!</Typography>
          <Box>
            {UnderContruction}
          </Box>
          <Button variant="contained" sx={{ backgroundColor: "black", width: "100%", scale: "0.8", }} disableTouchRipple onClick={()=>{returnHome()}}>Go Home</Button>
        </Stack>
      </Grid>
    </div>
  )
}

export default Jobs