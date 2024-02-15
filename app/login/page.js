"use client";
import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fullLogo } from '../(Constants)/Assets';
import { signInApi, signUpApi } from '../(Constants)/Api';
import { useRouter } from 'next/navigation';
import {context} from "../layout"

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = () =>{
  const router = useRouter();
  const {show,setshow}=useContext(context);
  
  const [signInShow, setSignInShow] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  // -------------------------fetch API signup --------------------------------


  const handleSignUp = async (e) =>{
    e.preventDefault();
    try{
      const response = await fetch(signUpApi,
        {
          method: "POST",
          headers: {
            projectID: "i1dieevrt9g1",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            appType: 'linkedin'
          }),
        }
      );
      // if(!response.ok){
      //   // alert("please signup");
      //   return;
      // }
      const data = await response.json();
      console.log("newdata" ,data);
    }catch(error){
      alert(error);
    }
  };

  // ----------------------------fetch API signin -----------------------------------

  const handleSignIn = async (e) =>{
    e.preventDefault();
    try{
      const res = await fetch(signInApi,
        {
          method: "POST",
          headers: {
            projectID: "i1dieevrt9g1",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            appType: 'linkedin'
          }),
        }
      );
        
        const newData = await res.json();
        console.log("newData", newData);
        const token = newData.token;
        localStorage.setItem("token", JSON.stringify(token));
        setshow(true);
        router.push('/');
    }catch(error){
      alert(error);
    }
  };
  






  const validateEmail = (email)=>{
    if((/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))){
        setEmailError(false);
    }else{
      setEmailError(true);
    }
  }
  const validatePassword = (password)=>{
    if(password.length >= 6){
      setPasswordError(false);
    }else{
      setPasswordError(true);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // if(validateEmail(email) && validatePassword(password)){
    //   console.log('Email:', email);
    //   console.log('Password:',password );
    // }
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box>

    {signInShow && <Box sx={{width: "100vw", height: "100vh",  display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8f4ece6", overflowY: "hidden"}}>
      <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", mb: 85, mr: 120, scale: "1.3", width: "100%", position: "absolute", cursor: "pointer"}}>{fullLogo}</Box>
        <Typography sx={{position: "absolute", mb: 72, fontWeight: "200", fontSize: "30px", letterSpacing:"1px", fontFamily:"Helvetica"}}>Make the most of your professional life</Typography>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ height: "500px", width: "400px", borderRadius: "10px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mb: 50 }}>
            <Grid container spacing={2} sx={{width: "350px", fontFamily: "Arial, Helvetica, sans-serif"}}>
              <Grid item xs={12}>
                <TextField 
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Your Name"
                  autoFocus
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value),validateEmail(e.target.value)}}
                />
              {emailError && <span style={{color: "#D04848", fontSize: "13px", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "540"}}>Please enter a valid email address.</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password (6+ characters)"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value), validatePassword(e.target.value)}}
                />
              {passwordError && <span style={{color: "#D04848", fontSize: "13px", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "540"}}>Password must be 6 characters or more.</span>}
              </Grid>

              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button onClick={(e)=>handleSignUp(e)}
              disableRipple
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 3, p: 2, borderRadius: 12, height: "50px", textTransform: "none", fontWeight: "700", letterSpacing: "1px",lineHeight: "1px"}}
              >
              Agree & Join
            </Button>
            <hr/>
            <Grid container justifyContent="center" marginTop="20px">
              <Grid item>
              <Grid>Already on LinkedIn? <Link onClick={()=>{setSignInShow(false)}} href="#" variant="body2">
                  Sign in
                </Link></Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Box>}


    {!signInShow && <Box sx={{width: "100vw", height: "100vh",  display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", overflowY: "hidden"}}>
      <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", mb: 85, mr: 120, scale: "1.3", width: "100%", position: "absolute", cursor: "pointer"}}>{fullLogo}</Box>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ height: "500px", width: "400px", borderRadius: "10px", boxShadow: "2px 2px 10px lightgray"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
      <Typography sx={{fontSize: "25px", width: "100%", alignItems: "left", mb: "20px", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "500"}}>Welcome Back</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mb: 50 }}>
            <Grid container spacing={2} sx={{width: "350px", fontFamily: "Arial, Helvetica, sans-serif"}}>
              <Grid item xs={12}>
                <TextField 
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button onClick={(e)=>handleSignIn(e)}
              disableRipple
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 3, p: 2, borderRadius: 12, height: "50px", textTransform: "none", fontWeight: "700", letterSpacing: "1px", textAlign: "center", lineHeight: "1px"}}
              >
              Sign in
            </Button>
            <hr/>
            <Grid container justifyContent="center" marginTop="20px">
              <Grid item>
              <Grid>Don't have an account? <Link onClick={()=>{setSignInShow(true)}} href="#" variant="body2">
                  Sign up
                </Link></Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Box>}
    </Box>
  );
}
export default Login;





// import React from 'react'

// function page() {
//   return (
//     <>
//     <div>
//       <div>

//       </div>
//     </div>
//     </>
//   )
// }

// export default page