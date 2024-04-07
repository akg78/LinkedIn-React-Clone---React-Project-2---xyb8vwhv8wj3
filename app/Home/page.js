"use client";
import React, { useState, useEffect, useContext, useMemo } from 'react'
import "./Home.css"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { postFeed } from '../(Constants)/Api';
// import Skeleton from '@mui/material/Skeleton';
import ImageIcon from '@mui/icons-material/Image';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CreatePost from '../(Components)/ComposePost/CreatePost';
import { context } from '../layout';
import Post from './Post';
import Edit from './Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
// import Loader from '../(Components)/Loader';
import { sideBarImg, userCoverPicHome } from '../(Constants)/Assets';
// import index from 'toastify';
import { Article } from '@mui/icons-material';
import { Avatar } from '@mui/material';



function page() {


  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };



  // const [isLoading, setIsLoading] = useState(true);


  const [pop, setpop] = useState(false);
  const [post, setPost] = useState([]);
  const [likeCount, setLikeCount] = useState(0)
  const [liked, setLiked] = useState(false);
  const [activenav, setactivenav] = useState("");
  const { show, setshow, setShowNavbar, showNavbar, toggle, setToggle, popEdit, setPopEdit } = useContext(context);
  const [postTitle, setPostTitle] = useState();
  const [postContent, setPostContent] = useState("");
  const [PostImg, setPostImg] = useState("");
  const [modifyTitle, setModifyTitle] = useState("");
  const [modifyContent, setModifyContent] = useState("");
  const [modifyPostID, setModifyPostID] = useState("");
  const [news, setNews] = useState([]);
  const NewsapiKey = "571d954539a24684b8e1e1ee4f23bb87";
  const [localStorageValue, setLocalStorageValue] = useState();




  // -------------------------fetch API News --------------------------------

  useEffect(() => {
    async function newsFetch() {
      const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${NewsapiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setNews(data.articles);
        console.log("jhhhhhh", data)
      } catch (error) {
        // console.log("error", error);
      }
    }
    newsFetch();
  }, []);




  // -------------------------fetch API Post --------------------------------

  const postFetch = useMemo(async () => {
    try {
      const response = await (await fetch(postFeed,
        {
          method: "GET",
          headers: {
            projectID: "i1dieevrt9g1",
            "Content-Type": "application/json",
          },
        }
      )).json();
      setPost(response.data)
      // console.log("posttttttttt", response.data);
      // setIsLoading(false);
    } catch (error) {
      // console.log(error, "error")
      // setIsLoading(false);
    }
  }, [toggle]
  )

  useEffect(() => {
    postFetch;
  }, [])



  const deletePost = async (id) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/linkedin/post/${id}`,
        {
          method: "DELETE",
          headers: {
            ProjectID: "i1dieevrt9g1",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

        }
      );
      setToggle(!toggle);
    } catch (error) {
      // console.log(error);
    }
  }




  // published time for news

  const timestamp = "2024-03-19T18:30:00Z";

  // Convert timestamp to milliseconds since epoch
  const millisecondsSinceEpoch = Date.parse(timestamp);

  // Calculate milliseconds in a day
  const millisecondsInDay = 24 * 60 * 60 * 1000;

  // Convert milliseconds to days
  const daysSinceEpoch = millisecondsSinceEpoch / millisecondsInDay;

  // console.log(daysSinceEpoch);

  // console.log(numberOfWeeks);


  // function activenavmaker(key) {
  //   setactivenav({});
  //   setactivenav((prev) => ({ ...prev, [key]: !activenav[key] }))

  // }
  // className={activenav["dis-btn"] ? "activecolor" : ""} onClick={() => { activenavmaker("dis-btn") }}>{!activenav["dis-btn"]? <img src='hotels.png' className='icons' /> : <img src='hotelblue.png' />}


  // function handleLike() {
  //   if (liked) {
  //     setLikeCount(likeCount + 1);
  //   }

  // }

  useEffect(() => {
    setShowNavbar(true)
  }, [])


  useEffect(()=>{
    const value = localStorage.getItem("name")
    setLocalStorageValue(value)
}, [])

  // const notify = () => toast.info("Under Construction!",{autoClose:3000})

  return (
    <>
      <div className='flex homeContainer'>
        {pop && <div className="composePop flexja flex"><CreatePost setpop={setpop} postTitle={postTitle} postContent={postContent} setPostContent={setPostContent} setPostTitle={setPostTitle} /></div>}

        {popEdit && <div className='popEditBg'><Edit setPopEdit={setPopEdit} modifyTitle={modifyTitle} setModifyTitle={setModifyTitle} modifyContent={modifyContent} setModifyContent={setModifyContent} modifyPostID={modifyPostID} setModifyPostID={setModifyPostID} toggle={toggle} setToggle={setToggle} /></div>}
        <CssBaseline />
        <Box sx={{ mt: "25px", width: "1130px", display: "flex" }} >
          <div className='sidebarLeft'>
            <div className='flexc sidebarDetails flexa'>
              <div className='userCoverImg'>{userCoverPicHome}</div>
              <div className='userProfilePic'><Avatar sx={{ backgroundColor: "#1F6CFA",  scale: "1.8", marginLeft: "15px", marginTop: "15px" }}>{localStorageValue ? `${JSON.parse(localStorageValue).slice(0, 1).toUpperCase()}` : ""}</Avatar></div>
              <Link className='username' href='MyProfile' style={{
                textDecoration: "none",
                color: "#000",
                fontSize: "12.5px",
                fontWeight: "551",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSmooth: "always",
              }}>
                {localStorageValue ? `${JSON.parse(localStorageValue).charAt(0).toUpperCase() + JSON.parse(localStorageValue).slice(1)}` : ""}
              </Link>

              <p>HTML | CSS | JavaScript | React | Java | Web Developer with a Passion for Creating Beautiful Websites.</p>
            </div>
            <div className='ml10 sidebarLink'>
              <Link href='Groups' style={{
                textDecoration: "none",
                color: "#0A66C2",
                fontSize: "12.5px",
                fontWeight: "551",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSmooth: "always"
              }}>Groups</Link>
            </div>
          </div>

          <div className='mainContainer'>
            <div className='createPost p5'>
              <div className='composePost flex flexa' onClick={() => { setpop(true) }}>
                <div><Avatar sx={{backgroundColor: "#1F6CFA"}}>{localStorageValue ? `${JSON.parse(localStorageValue).slice(0, 1).toUpperCase()}` : ""}</Avatar></div>
                <div className='composeSearch flexa p20 fnt14 '>Start a post</div>
              </div>
              <div className=' composePostFooter flex flexa'>
                <div className='flexa g5 cp' onClick={() => { setpop(true) }}>{<ImageIcon style={{ color: "rgb(112, 181, 249)", backgroundColor: "transparent" }} />} <p>Media</p></div>
                <div className='flexa g5 cp' onClick={() => { setpop(true) }}>{<EventNoteIcon style={{ color: "rgb(231, 163, 62)", backgroundColor: "transparent" }} />} <p>Event</p></div>
                <div className='flexa g5 cp' onClick={() => { setpop(true) }}>{<Article style={{ color: "rgb(245, 152, 126)", backgroundColor: "transparent" }} />} <p>Write Article</p></div>
              </div>
            </div>
            <br />
            {/* <div className='flex flexa g10 sortBy' ><hr className='hrhome mt5 ml5 ' /></div> */}

            {/* map to feed  */}

            {post && post.map((item, index) => (
              <Post item={item} deletePost={deletePost} setpop={setpop} popEdit={popEdit} setPopEdit={setPopEdit} modifyTitle={modifyTitle} setModifyTitle={setModifyTitle} modifyContent={modifyContent} setModifyContent={setModifyContent} modifyPostID={modifyPostID} setModifyPostID={setModifyPostID} index={index} />


            ))}

          </div>
          <div className='sidebarRight flexc'>
            <div className='sideBarNews'>
              <h4 className='pl20 pt10 lnews'>Linkedin News</h4>
              <ul>
                {news && news.map((item, index) => (
                  <li key={index}>
                    <a href={item.url}>{item.title}</a>
                    <p className='fnt12 txt2'>{item.publishedAt}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className='sideBarImg'>
              <Link href='TryPremium'>
                <img src={sideBarImg} />
              </Link>
            </div>
          </div>
        </Box>
      </div>
      <ToastContainer />

      {/* <Loader/> */}
    </>
  )
}

export default page