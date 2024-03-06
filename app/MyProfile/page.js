"use client"
import React, { useState, useEffect } from 'react'
import "./MyProfile.css"
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';

function page() {
    const [userDetailPop, setUserDetailPop] = useState(false);

    return (

        <div className=' myprofileContainer flex'>
            {userDetailPop && <div className='userDetailsPop' onClick={() => { }}>
                <div className='editIntro p20'>
                    <h2>Edit Intro</h2>
                    <hr className='editIntrohr' />
                    <label >First Name*</label>
                    <br />
                    <input type='text' />
                    <br />
                    <label>Last Name*</label>
                    <br />
                    <input type='text' />
                    <br />
                    <h3>Education</h3>
                    <br />
                    <label>School/College</label>
                    <br />
                    <input type='text' />
                    <br />
                    <h3>Location</h3>
                    <br />
                    <label>Country</label>
                    <br />
                    <input type='text' />
                    <br />
                    <label>City</label>
                    <br />
                    <input type='text' />

                </div>
            </div>}
            <Box sx={{ mt: "25px", width: "1130px", display: "flex", height: "450px" }} >
                <div className='userCoverProfile flexc mr30'>
                    <div className='headercover'></div>
                    <div className='profileCoverImg'></div>
                    <div className='footerCover flex flexa'>
                        <p className='mr20 mt10 flexja cp' onClick={() => { setUserDetailPop(true) }}>{<CreateIcon />}</p>

                    </div>
                </div>
                <div className='userCoverAside flexc p20 cp'>
                    <div className='flexc'>
                        <h4>Profile Language</h4>
                        <p>English</p></div>

                    <hr className='hrprofileAside'></hr>

                    <div className='flex mt10'>
                        <h4>Public profile & URL</h4>
                    </div>
                </div>

            </Box>
        </div>

    )
}

export default page