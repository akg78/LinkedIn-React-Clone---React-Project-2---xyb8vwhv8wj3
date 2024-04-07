"use client"
import React, { useState, useEffect } from 'react'
import "./MyProfile.css"
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';
import { Avatar, CssBaseline } from '@mui/material';
import { userCoverPic } from '../(Constants)/Assets';
import { Link } from '@mui/icons-material';

function page(props) {

    // const [userDetailPop, setUserDetailPop] = useState(false);
    const [localStorageValue, setLocalStorageValue] = useState()
    const [userData, setUserData] = useState({});

    // ------------------------------------------------convert dates Experience starts--------------------------------------


    const originalTimestamp = userData.workExperience && userData.workExperience[0].startDate;

    const dateObject = new Date(originalTimestamp);

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthIndex = dateObject.getMonth();
    const startMonth = monthNames[monthIndex];

    const startYear = dateObject.getFullYear();


    // --------------------------------------------------convert dates Experience-------------------------------------

    const originalTimestampp = userData.workExperience && userData.workExperience[0].endDate;

    const dateObj = new Date(originalTimestampp);

    const newmonthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthInd = dateObj.getMonth();
    const endMonth = newmonthNames[monthInd];

    const endYear = dateObj.getFullYear();

    // --------------------------------------------------convert dates Experience ends-------------------------------------

    // --------------------------------------------------convert dates education starts-------------------------------------
    

    const timestampEdu = userData.education && userData.education[0].startDate;

    const dateObjectEdu = new Date(timestampEdu);

    const monthNamesEdu = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthIndexEdu = dateObjectEdu.getMonth();
    const startMonthEdu = monthNamesEdu[monthIndexEdu];

    const startYearEdu = dateObjectEdu.getFullYear();


    // --------------------------------------------------convert dates education-------------------------------------


    const timestampEduE = userData.education && userData.education[0].endDate;

    const dateObjectEduE = new Date(timestampEduE);

    const monthNamesEduE = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthIndexEduE = dateObjectEduE.getMonth();
    const startMonthEduE = monthNamesEduE[monthIndexEduE];

    const startYearEduE = dateObjectEduE.getFullYear();


    // --------------------------------------------------convert dates education ends-------------------------------------
    




    const fetchUser = async () => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/user/${props.params.MyProfile}`,
                {
                    method: "GET",
                    headers: {
                        ProjectID: "i1dieevrt9g1",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            const result = await response.json();
            setUserData(result.data);
            console.log("userdetails", result.data)


        } catch (error) {
            // console.log("error", error);
        }
    }


    useEffect(() => {
        fetchUser();
        const value = localStorage.getItem("name")
        setLocalStorageValue(value)
    }, [])

    return (
        <div className=' myprofileContainer flex'>
            <CssBaseline />
            <Box sx={{ mt: "25px", width: "1130px", display: "flex" }} >
                {userData && (
                    <div className='mainContainerProfile'>

                        <div className='userCoverProfile'>
                            <div className='headercover'>{userCoverPic}</div>
                            <div className='profileCoverImg'>
                                <Avatar sx={{ scale: "3.3", marginLeft: "44px", marginTop: "43px" }}>
                                    {userData.profileImage != null ? <img className='userProfileImgg' src={userData.profileImage} /> : <p className=''>{userData.name && userData.name.slice(0, 1).toUpperCase()}</p>}
                                    {/* `${userData.profileImage.slice(0,1).toUpperCase()}` */}
                                </Avatar>
                            </div>

                            <div className='pl20'>
                                <h2>{userData.name}</h2>
                                {userData.address && userData.address.length > 0 && <p className='txt4 fnt14 mt5'>{userData.address[0].city}, {userData.address[0].state}, {userData.address[0].country}</p>}
                            </div>
                        </div>


                        <Box sx={{ mt: "25px", padding: "25px", display: "flex", flexDirection: "column", boxShadow: "0px 0px 0px 0.2px grey", backgroundColor: "#fff", borderRadius: "7.5px" }}>
                            <h3 className='txt10'>Experience</h3>
                            <div className='flex flexc p10 pl30'>
                                <h6 className='fnt16 txt10'>{userData.workExperience && userData.workExperience.length > 0 && userData.workExperience[0].designation}</h6>
                                <span className='fnt15 txt5'>{userData.workExperience && userData.workExperience[0].companyName}</span>
                                <span className='flex fnt14 txt9'><p>{userData.workExperience && startMonth} {userData.workExperience && startYear} , {userData.workExperience && endMonth} {userData.workExperience && endYear}</p></span>
                                <span className='fnt14 txt9'>{userData.workExperience && userData.workExperience[0].location}</span>
                                <span className='mt5 fnt14'>{userData.workExperience && userData.workExperience[0].description}</span>
                            </div>
                        </Box>

                        <Box sx={{ mt: "25px", padding: "25px", display: "flex", flexDirection: "column", boxShadow: "0px 0px 0px 0.2px grey", backgroundColor: "#fff", borderRadius: "7.5px" }}>
                            <h3>Education</h3>
                            <div className='flex flexc p10 pl30'>
                                <h6 className='fnt16 txt10'>{userData.education && userData.education[0].schoolName}</h6>
                                <span className='fnt15 txt5'>{userData.education && userData.education[0].degree}</span>
                                <span className='flex fnt14 txt9'><p>{userData.education && startMonthEdu} {userData.education && startYearEdu} , {userData.education && startMonthEduE} {userData.education && startYearEduE}</p></span>
                                <span className='mt5 fnt14'>{userData.education && userData.education[0].description}</span>
                            </div>
                        </Box>

                        <Box sx={{ mt: "25px", padding: "25px", display: "flex", flexDirection: "column", boxShadow: "0px 0px 0px 0.2px grey", backgroundColor: "#fff", borderRadius: "7.5px" }}>
                            <h3>Skills</h3>
                            <div className='flex flexc p10 pl30'>
                                <ul>
                                {userData.skills && userData.skills.map((skills, index)=>(
                                    <li className='bullets txt10' key={index}>{skills}</li>
                                ))}
                                </ul>
                            </div>
                        </Box>

                    </div>
                )}
                        <div className='userCoverAside flexc p20 cp'>
                            <div className='flexc'>
                                <h4>Profile Language</h4>
                                <p>English</p></div>

                            <hr className='hrprofileAside'></hr>

                            <div className='flex flexc mt10'>
                                <h4>Public profile & URL</h4>
                                <Link></Link>
                            </div>
                        </div>
            </Box>
        </div>
    )
}

export default page












// {userDetailPop && <div className='userDetailsPop' onClick={() => { setUserDetailPop(false) }}>
//                 <div className='editIntro p20'>
//                     <h2>Edit Intro</h2>
//                     <hr className='editIntrohr' />
//                     <label >First Name*</label>
//                     <br />
//                     <input type='text' />
//                     <br />
//                     <label>Last Name*</label>
//                     <br />
//                     <input type='text' />
//                     <br />
//                     <h3>Education</h3>
//                     <br />
//                     <label>School/College</label>
//                     <br />
//                     <input type='text' />
//                     <br />
//                     <h3>Location</h3>
//                     <br />
//                     <label>Country</label>
//                     <br />
//                     <input type='text' />
//                     <br />
//                     <label>City</label>
//                     <br />
//                     <input type='text' />

//                 </div>
//             </div>}


{/* <div className='footerCover flex flexa'>
    <p className='mr20 mt10 flexja cp' onClick={() => { setUserDetailPop(true) }}>{<CreateIcon />}</p>

</div> */}