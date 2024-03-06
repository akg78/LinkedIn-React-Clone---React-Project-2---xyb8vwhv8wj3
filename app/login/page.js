"use client";
import React, { useState, useEffect, useContext } from 'react';
import "./login.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fullLogo, logo } from '../(Constants)/Assets';
import { signInApi, signUpApi } from '../(Constants)/Api';
import { useRouter } from 'next/navigation';
import { context } from "../layout"

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = () => {
  const router = useRouter();
  const { show, setshow, setShowNavbar, showNavbar} = useContext(context);
  
  useEffect(()=>{
    setShowNavbar(false)
  },[])

  const [signInShow, setSignInShow] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [alertError, setAlertError] = useState(false);


  // -------------------------fetch API signup --------------------------------


  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
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
      console.log("newdata", data);
    } catch (error) {
      alert(error);
    }
  };

  // ----------------------------fetch API signin -----------------------------------

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
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
      // console.log("newData", newData);
      if (newData.status === "success") {
        const token = newData.token;
        localStorage.setItem("token", token);
        localStorage.setItem("id", newData.data._id);
      }
      setshow(true);
      router.push('/');
      // alert("Login or Password incorrect!")
    } catch (error) {
      alert(error);
    }
  };




  const validateEmail = (email) => {
    if ((/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  }
  const validatePassword = (password) => {
    if (password.length >= 6) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div className='loginMainContainer flex'>
      <div className='flex wrapNavLogin flexa'>
        <p className='fullogo'>{fullLogo}</p>
        <div className='flex wrapLoginButton flexa'>
          <p className='cp' onClick={()=>{setSignInShow(false)}}>Join now</p>
          <button onClick={()=>{setSignInShow(true)}}>Sign in</button>
        </div>
      </div>
      <div className='mainSvglogin flex'>
        {signInShow && <Box
          sx={{
            marginLeft: "200px",
          }}
        >
          <Typography sx={{ width: "100%", marginBottom: "40px", fontSize: "50px", letterSpacing: "1px", fontFamily: "Helvetica", color: "#b24020", fontWeight: "100" }}>Welcome to your <br /> professional community</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mb: 50 }}>
            <Grid container spacing={2} sx={{ width: "420px", fontFamily: "Arial, Helvetica, sans-serif" }}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button onClick={(e) => handleSignIn(e)}
              disableRipple
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 3, p: 2, borderRadius: 12, height: "50px", width: "75%", textTransform: "none", fontWeight: "700", letterSpacing: "1px", lineHeight: "1px", textAlign: "center" }}

            >
              Sign in
            </Button>
            <span className='flex flexa g10 ml5'><hr className='loginHr' /> or <hr className='loginHr' /></span>
            <Button onClick={() => setSignInShow(false)}
              disableRipple
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 4, mb: 3, p: 2, borderRadius: 12, height: "50px", width: "75%", textTransform: "none", fontWeight: "100", letterSpacing: "1px", lineHeight: "1px", textAlign: "center", color: "black" }}

            >
              New to LinkedIn? Join now
            </Button>
          </Box>
        </Box>}

        {!signInShow && <Box
          sx={{
            marginLeft: "200px",
          }}
        >
          <Typography sx={{ width: "100%", marginBottom: "40px", fontSize: "50px", letterSpacing: "1px", fontFamily: "Helvetica", color: "#b24020", fontWeight: "200" }}>Welcome to your <br /> professional community</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mb: 50 }}>
            <Grid container spacing={2} sx={{ width: "420px", fontFamily: "Arial, Helvetica, sans-serif" }}>
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
                  onChange={(e) => { setName(e.target.value) }}
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
                  onChange={(e) => { setEmail(e.target.value), validateEmail(e.target.value) }}
                />
                {emailError && <span style={{ color: "#D04848", fontSize: "13px", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "540" }}>Please enter a valid email address.</span>}
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
                  onChange={(e) => { setPassword(e.target.value), validatePassword(e.target.value) }}
                />
                {passwordError && <span style={{ color: "#D04848", fontSize: "13px", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "540" }}>Password must be 6 characters or more.</span>}
              </Grid>

              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button onClick={(e) => handleSignUp(e)}
              disableRipple
              type="submit"
              variant="contained"
              sx={{ mt: 1, mb: 3, p: 2, borderRadius: 12, height: "50px", width: "75%", textTransform: "none", fontWeight: "700", letterSpacing: "1px", lineHeight: "1px", textAlign: "center" }}
            >
              Agree & Join
            </Button>
            <span className='flex flexa g10 ml5'><hr className='loginHr' /> or <hr className='loginHr' /></span>
            <Button onClick={() => setSignInShow(true)}
              disableRipple
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 4, mb: 3, p: 2, borderRadius: 12, height: "50px", width: "75%", textTransform: "none", fontWeight: "100", letterSpacing: "1px", lineHeight: "1px", textAlign: "center", color: "black", fontFamily: "" }}

            >
              Already on LinkedIn? Sign in
            </Button>
          </Box>
        </Box>
        }

        <div><img className="" height="560px" width="700px" alt="Welcome to your professional community" src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4" /></div>
      </div>



    </div>
  );
}
export default Login;











