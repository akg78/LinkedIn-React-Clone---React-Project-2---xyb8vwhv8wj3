"use client";
import React, { useState, useEffect, useContext } from 'react'
import { BiWorld } from "react-icons/bi";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { FaRegCommentDots } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import { profileImg } from '../(Constants)/Assets';
import Comments from './Comments';
import { context } from '../layout';
import { Avatar } from '@mui/material';
import { useRouter } from "next/navigation";



export default function Post({ item, index, deletePost, setpop, popEdit, setPopEdit, modifyTitle, setModifyTitle, modifyContent, setModifyContent, modifyPostID, setModifyPostID }) {

    const [commentPop, setCommentPop] = useState(false);
    const [comData, setComData] = useState();
    const [like, setLike] = useState();
    const [commentInput, setCommentInput] = useState("");
    const [commpost, setCommpost] = useState("");
    const [activeLike, setActiveLike] = useState(false);
    const { toggle, setToggle } = useContext(context);
    const [dislike, setDislike] = useState()
    // const liked = [];

    function toggleActive() {
        setActiveLike(!activeLike);
        // setLike(like)
    }


    function commentFun(e, itemId) {
        if (e.key === "Enter") {
            commentPost(itemId)
            setCommentInput(' ')
        }
    }


    // function likeCheck(){

    // }

    // const showComments = (`${"feedPost", item._id}`);

    // useEffect(()=>{
    //     likePost()
    // }, [])

    const [localStorageValue, setLocalStorageValue] = useState();

    useEffect(() => {
        // for(let i =0; i<=100; i++){
        //     liked[i]= false;
        // }
        // console.log(liked)
        const value = localStorage.getItem("name")
        setLocalStorageValue(value)
    }, [])



    const [daysDifference, setDaysDifference] = useState(0);

    useEffect(() => {
      const timestamp = item.createdAt;
      const dateObject = new Date(timestamp);
      const intervalId = setInterval(() => {
        const now = new Date();
        const timeDifference = now - dateObject;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        setDaysDifference(daysDifference);
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);



    const commentFetch = async (id) => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/post/${id}/comments`,
                {
                    method: "GET",
                    headers: {
                        ProjectID: "i1dieevrt9g1",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            const result = await response.json();
            // console.log("comment get", result.data);
            setComData(result.data);

        } catch (error) {
            // console.log("error", error);
        }
    }



    const commentPost = async (id) => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/comment/${id}`,
                {
                    method: "POST",
                    headers: {
                        ProjectID: "i1dieevrt9g1",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        content: commentInput
                    })
                }
            );
            const res = await response.json();
            // console.log("post Comment", res);
            commentFetch(id)
            setCommpost();

        } catch (error) {
            // console.log("error", error);
        }
    }



    const likePost = async (id, index) => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/like/${id}`,
                {
                    method: "POST",
                    headers: {
                        ProjectID: "i1dieevrt9g1",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const re = await response.json();
            // console.log("likeeeee", re)
            setToggle(!toggle);
            setLike(re)
           

        } catch (error) {
            // console.log(error, "error")
        }
    }

    const dislikePost = async (id) => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/like/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        ProjectID: "i1dieevrt9g1",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            const res = await response.json();
            // console.log("kkkkk", res)
            setToggle(!toggle);
            setDislike(res)

        } catch (error) {
            // console.log(error, "error")
        }
    }

    const router = useRouter()

    function navigateProfile(id){
        router.push(`/${id}`)
    }



    

   







    return (
        <div key={index} className="feedPost mt10 ">
            <div className='flex dotdelete'>
                {item.author._id === localStorage.getItem("id") && <Dropdown>
                    <MenuButton
                        slots={{ root: IconButton }}
                        slotProps={{ root: { color: 'neutral' } }}
                    >
                        <MoreVert />
                    </MenuButton>
                    <Menu placement="bottom-end">
                        <MenuItem onClick={() => { setPopEdit(true); setModifyTitle(item.title); setModifyContent(item.content); setModifyPostID(item._id) }}>
                            <ListItemDecorator>
                                <Edit />
                            </ListItemDecorator>{' '}
                            Edit post
                        </MenuItem>
                        <ListDivider />
                        <MenuItem variant="soft" color="danger" onClick={() => { deletePost(item._id) }}>
                            <ListItemDecorator sx={{ color: 'inherit' }}>
                                <DeleteForever />
                            </ListItemDecorator>{' '}
                            Delete
                        </MenuItem>
                    </Menu>
                </Dropdown>}
            </div>

            <div className=' postHeader flex g10 flexa p10' onClick={()=>{navigateProfile(item.author._id)}}>
                <div className='imgHeader '> {item.author.profileImage !== null ? <img src={item.author.profileImage} loading="lazy" /> : <p className='flex flexja postImgStatic'>{item.author.name.slice(0,1).toUpperCase()}</p>} </div>
                <div className='headingHeader'>
                    <h5 className='homeUserName'>{item.author.name}</h5>
                    <p>{item.title}</p>
                    <div className='flex fnt12 txt4 '>
                        <span>{daysDifference}d. <BiWorld /></span>
                    </div>
                </div>
            </div>

            <div className=' postBody'>
                <p className='p10'>{item.content}</p>
                <div className='img-body'>{item.images && <img src={item.images[0]} loading="lazy" />}</div>
            </div>

            <div className=' postFooter'>
                <div className='flex disComments g10 '>
                    <div className='flex g5 ml10 fnt12'><p>{item.likeCount}</p> Likes</div>
                    <div className='flex g5 mr10 fnt12'><p>{item.commentCount}</p> comments</div>
                </div>
                <hr className='hrPostt' />
                <div className='dis-btn flex p5'>
                    {<div className='flex g5 p20 ' onClick={() => { likePost(item._id, index) }}><p><ThumbUpIcon  /></p>Like</div>}
                    {<div className='flex g5 p20 ' onClick={() => { dislikePost(item._id, index), toggleActive() }}><p><ThumbUpIcon  /></p>Dislike</div>}
                    {/* {like.status === "success" && <div className='flex g5 p20 ' onClick={()=>{deslikePost(item._id)}}><p><ThumbUpIcon className={activeLike ? 'inactive' : 'active'} /></p>dislike</div>} */}
                    <div className='flex g5 p20' onClick={() => { setCommentPop(!commentPop); commentFetch(item._id) }}><p><FaRegCommentDots /></p>Comments</div>
                    {/* <div className='flex g5 p20'><p><FaShare /></p>Share</div> */}
                </div>
            </div>

            {commentPop && <div className='commentPop'>
                <div className='flex wrapSelfcomments g10 flexa'>
                    <div><Avatar sx={{backgroundColor: "#1F6CFA"}}>{localStorageValue ? `${JSON.parse(localStorageValue).slice(0, 1).toUpperCase()}` : ""}</Avatar></div>

                    <input type='text' value={commentInput} onChange={(e) => { setCommentInput(e.target.value) }} onKeyUp={(e) => { commentFun(e, item._id) }} placeholder='Add a comments...'/>
                </div>

                {comData && comData.map((itemm, index) =>

                    <Comments item={item} itemm={itemm} index={index} comData={comData} setComData={setComData} commentPop={commentPop} setCommentPop={setCommentPop} commentFetch={commentFetch} itemId={item._id} />
                )}
            </div>}
        </div>
    )
}
