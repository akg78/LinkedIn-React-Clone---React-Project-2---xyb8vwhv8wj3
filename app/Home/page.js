"use client"
import React, { useState, useEffect, useContext, useMemo } from 'react'
import "./Home.css"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { postFeed } from '../(Constants)/Api';
// import Skeleton from '@mui/material/Skeleton';
import ImageIcon from '@mui/icons-material/Image';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ArticleIcon from '@mui/icons-material/Article';
import CreatePost from '../(Components)/ComposePost/CreatePost';
import { context } from '../layout';
import Post from './Post';
import Edit from './Edit';
import { ToastContainer } from 'react-toastify';




function page() {


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  // const [isLoading, setIsLoading] = useState(true);


  const [pop, setpop] = useState(false);
  const [post, setPost] = useState([]);
  const [likeCount, setLikeCount] = useState(0)
  const [liked, setLiked] = useState(false);
  const [activenav, setactivenav] = useState("");
  const { show, setshow, setShowNavbar, showNavbar, toggle, setToggle,popEdit, setPopEdit } = useContext(context);
  const [postTitle, setPostTitle] = useState();
  const [postContent, setPostContent] = useState("");
  const [PostImg, setPostImg] = useState("");
  const [modifyTitle, setModifyTitle] = useState("");
  const [modifyContent, setModifyContent] = useState("");
  const [modifyPostID, setModifyPostID] = useState("");
  const [commentPop, setCommentPop] = useState(false);

 





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
      console.log(response.data);
      // setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      alert(error);
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
      console.log(error);
    }
  }


  


  const originalTimestamp = new Date("2023-08-21T12:15:26.147Z");

  const currentTimestamp = new Date();

  const differenceInMillis = currentTimestamp - originalTimestamp;

  const millisecondsInAWeek = 1000 * 60 * 60 * 24 * 7;
  const numberOfWeeks = Math.floor(differenceInMillis / millisecondsInAWeek);

  console.log(numberOfWeeks);


  // function activenavmaker(key) {
  //   setactivenav({});
  //   setactivenav((prev) => ({ ...prev, [key]: !activenav[key] }))

  // }
  // className={activenav["dis-btn"] ? "activecolor" : ""} onClick={() => { activenavmaker("dis-btn") }}>{!activenav["dis-btn"]? <img src='hotels.png' className='icons' /> : <img src='hotelblue.png' />}


  function handleLike() {
    if (liked) {
      setLikeCount(likeCount + 1);
    }

  }

  useEffect(() => {
    setShowNavbar(true)
  }, [])

  return (
    <>
      <div className='flex homeContainer'>
        {pop && <div className="composePop flexja flex"><CreatePost setpop={setpop} postTitle={postTitle} postContent={postContent} setPostContent={setPostContent} setPostTitle={setPostTitle}  /></div>}
  
        {popEdit && <div className='popEditBg'><Edit setPopEdit={setPopEdit} modifyTitle={modifyTitle} setModifyTitle={setModifyTitle} modifyContent={modifyContent} setModifyContent={setModifyContent} modifyPostID={modifyPostID} setModifyPostID={setModifyPostID} toggle={toggle} setToggle={setToggle} /></div>}
        <CssBaseline />
        <Box sx={{ mt: "25px", width: "1130px", display: "flex" }} >
          <div className='sidebarLeft'>
            <div className='flexc sidebarDetails flexa'>
              <div className='userCoverImg'></div>
              <div className='userProfilePic'></div>
              <h4>Ankit Kumar</h4>
              <p>HTML | CSS | JavaScript | React | Java | Web Developer with a Passion for Creating Beautiful Websites.</p>
            </div>

          </div>

          <div className='mainContainer ml30 mr30'>
            <div className='createPost p5'>
              <div className='composePost flex flexa' onClick={() => { setpop(true) }}>
                <div className='composeImg' ><img src='' /></div>
                <div className='composeSearch flexa p20 fnt14 '>Start a post</div>
              </div>
              <div className=' composePostFooter flex flexa'>
                <div className='flexa g5 cp' onClick={() => { setpop(true) }}>{<ImageIcon />} Media</div>
                <div className='flexa g5 cp' onClick={() => { setpop(true) }}>{<EventNoteIcon />} Event</div>
                <div className='flexa g5 cp' onClick={() => { setpop(true) }}>{<ArticleIcon />} Write Article</div>
              </div>
            </div>
            <br />
            <div className='flex flexa g10 sortBy' ><hr className='hrhome mt5 ' /> Sort by:</div>

            {/* map to feed  */}

            {post && post.map((item, index) => (
              <Post item={item} deletePost={deletePost} setpop={setpop} popEdit={popEdit} setPopEdit={setPopEdit} modifyTitle={modifyTitle} setModifyTitle={setModifyTitle} modifyContent={modifyContent} setModifyContent={setModifyContent} modifyPostID={modifyPostID} setModifyPostID={setModifyPostID} commentPop={commentPop} setCommentPop={setCommentPop}/>

              ))}

          </div>
          <div className='sidebarRight'></div>
        </Box>
        {/* <ToastContainer/> */}

      </div>


    </>
  )
}

export default page
