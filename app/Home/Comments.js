"use client"
import React, { useState, useEffect } from 'react'
import { profileImg } from '../(Constants)/Assets';
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
import { useRouter } from "next/navigation";





export default function Comments({ item, itemm, index, comData, setComData, commentPop, setCommentPop, commentFetch, itemId }) {

    const [commmentAuthor, setcommmentAuthor] = useState("");
    // const [yourcom, setYourcom] = useState("");

    const fetchDetails = async () => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/post/${itemm.post}`,
                {
                    method: "GET",
                    headers: {
                        ProjectID: "i1dieevrt9g1",
                    },
                }
            );
            const result = await response.json();
            setcommmentAuthor(result.data);
            // console.log("hhhhhh", result);

        } catch (error) {
            // console.log("error", error);
        }
    }




    const deleteComment = async (id) => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/comment/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        ProjectID: "i1dieevrt9g1",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            // const re = await response.json();
            commentFetch(itemId)
            // console.log("deleteCom" , re)


        } catch (error) {
            // console.log(error, "error")
        }
    }


    useEffect(() => {
        fetchDetails();

    }, []);


    const router = useRouter()

    function navigateProfile(id){
        router.push(`/${id}`)
    }

    return (
        <>
            {itemm && commmentAuthor &&
                <div className='wrapOtherComments flex  g10 mt10'>
                    <span className='wrapOthercommentsImg'>{itemm.author_details.profileImage !== null ?
                        <img src={itemm.author_details.profileImage} loading='lazy' /> :
                        <p className='commentProfile flex flexja'>{`${itemm.author_details.name.slice(0,1).toUpperCase()}`}</p>
                    }

                    </span>
                    <div className='otherCommentsSection flex flexjsb p5'>

                        <div className='flexc '>
                            <h5 className='homeUserName' onClick={()=>{navigateProfile(item.author._id)}}>{itemm.author_details.name}</h5>
                            <p>{itemm.content}</p>
                        </div>

                        <Dropdown>
                            <MenuButton
                                slots={{ root: IconButton }}
                                slotProps={{ root: { color: 'neutral' } }}
                            >
                                {item.author._id === localStorage.getItem("id") && <MoreVert />}
                                {/* <MoreVert /> */}
                            </MenuButton>
                            <Menu placement="bottom-end">
                                {/* <MenuItem >
                                    <ListItemDecorator>
                                        <Edit />
                                    </ListItemDecorator>{' '}
                                    Edit post
                                </MenuItem>
                                <ListDivider /> */}
                                <MenuItem variant="soft" color="danger" onClick={() => { deleteComment(itemm._id) }}>
                                    <ListItemDecorator sx={{ color: 'inherit' }}>
                                        <DeleteForever />
                                    </ListItemDecorator>{' '}
                                    Delete
                                </MenuItem>
                            </Menu>
                        </Dropdown>
                    </div>
                </div>}
        </>
    )
}
