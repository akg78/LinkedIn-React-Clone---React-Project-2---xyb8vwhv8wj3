'use client'
import React, { useContext, useEffect } from 'react'
import "./trypremium.css";
import { context } from '../layout';
import { logo, premiumImg1, premiumImg2, premiumImg3, premiumImg4 } from '../(Constants)/Assets';
import { Avatar, AvatarGroup, Box, Button } from '@mui/material';
import Link from 'next/link';
import { Sheet } from '@mui/joy';


function page() {
  const { setShowNavbar } = useContext(context)
  
  useEffect(() => {
    setShowNavbar(false)
  }, [])


  return (
    <div className='mainContainerTrypremium'>
      <Box sx={{
        height: "260px",
        width: "100%",
        display: "flex",
        alignContent: "center",
        // justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "white",
      }}>
        <Box sx={{ height: "55px", width: "100%", borderBottom: "1px solid #8c8c8c33", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Sheet sx={{ height: "100%", width: "74%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/Home" style={{ scale: "1.8", marginTop: "10px" }}>{logo}</Link>
            <Link className='backtohomeLink' href='/'>Back to LinkedIn.com</Link>
          </Sheet>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginBottom: "50px", gap: "5px" }}>

          <h2>Achieve your goals faster with Premium.</h2>
          <div className='flexa '>
            <AvatarGroup max={4} sx={{ scale: "0.6", }}>
              <Avatar alt="" src={premiumImg1} />
              <Avatar alt="Travis Howard" src={premiumImg4} />
              <Avatar alt="Cindy Baker" src={premiumImg3} />
              <Avatar alt="Agnes Walker" src={premiumImg4} />
              <Avatar alt="Trevor Henderson" src={premiumImg2} />
            </AvatarGroup>
            <p className='MillionsPremium'>Millions of members use Premium</p>
          </div>
          <p className='monthTrail'>Start your free 1-month trial today. Cancel anytime. We’ll send you a reminder 7 days before your trial ends.</p>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", }}>

        <div className='career'>
          <span className='headerCareer'>
            <h2>Career</h2>
            <p>Get hired and get ahead</p>
            <hr />
          </span>
          <span className='mainCareer'>
            <ul>
              <li>Stand out and get in touch with hiring managers</li>
              <li>See how you compare to other applicants</li>
              <li>Learn new skills to advance your career</li>
            </ul>
          </span>
          <span className='footerCareer'>
            <Button
              sx={{ marginTop: "30px", width: "100%", borderRadius: "20px" }}
              variant="outlined"
              color="primary">
              learn more
            </Button>
          </span>
        </div>

        <div className='career'>
          <span className='headerCareer'>
            <h2>Business</h2>
            <p>Grow and nurture your network</p>
            <hr />
          </span>
          <span className='mainCareer'>
            <ul>
              <li>Find and contact the right people</li>
              <li>Promote and grow your business</li>
              <li>Learn new skills to enhance your professional brand</li>
            </ul>
          </span>
          <span className='footerCareer'>
            <Button
              sx={{ marginTop: "30px", width: "100%", borderRadius: "20px" }}
              variant="outlined"
              color="primary">
              learn more
            </Button>
          </span>
        </div>

        <div className='career'>
          <span className='headerCareer'>
            <h2>Sales Navigator Core</h2>
            <p>Unlock sales opportunities</p>
            <hr />
          </span>
          <span className='mainCareer'>
            <ul>
              <li>Find leads and accounts in your target market</li>
              <li>Get real-time insights for warm outreach</li>
              <li>Build trusted relationships with customers and prospects</li>
            </ul>
          </span>
          <span className='footerCareer'>
            <Button
              sx={{ marginTop: "30px", width: "100%", borderRadius: "20px" }}
              variant="outlined"
              color="primary">
              learn more
            </Button>
          </span>
        </div>

        <div className='career'>
          <span className='headerCareer'>
            <h2>Recruiter Lite</h2>
            <p>Find and hire talent</p>
            <hr />
          </span>
          <span className='mainCareer'>
            <ul>
              <li>Find great candidates, faster</li>
              <li>Contact top talent directly</li>
              <li>Build relationships with prospective hires</li>
            </ul>
          </span>
          <span className='footerCareer'>
            <Button
              sx={{ marginTop: "65px", width: "100%", borderRadius: "20px" }}
              variant="outlined"
              color="primary">
              learn more
            </Button>
          </span>
        </div>
      </Box>
    </div>
  )
}

export default page