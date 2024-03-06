
import React, {useState, useEffect} from 'react'
import MoreHoriz from '@mui/icons-material/MoreHoriz';
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

export default function Post({item, deletePost, setpop, popEdit, setPopEdit,modifyTitle, setModifyTitle, modifyContent, setModifyContent, modifyPostID, setModifyPostID, commentPop, setCommentPop}) {


    return (
        <div className='feedPost mt10'>
              {commentPop && <div className='commentPop'>hi</div>}

            <div className='flex dotdelete'>
                <Dropdown>
                    <MenuButton
                        slots={{ root: IconButton }}
                        slotProps={{ root: { color: 'neutral' } }}
                    >
                        {item.author._id === localStorage.getItem("id") && <MoreVert />}
                    </MenuButton>
                    <Menu placement="bottom-end">
                        <MenuItem onClick={()=>{setPopEdit(true); setModifyTitle(item.title); setModifyContent(item.content); setModifyPostID(item._id) }}>
                            <ListItemDecorator>
                                <Edit />
                            </ListItemDecorator>{' '}
                            Edit post
                        </MenuItem>
                        <MenuItem disabled>
                            <ListItemDecorator />
                            Draft post
                        </MenuItem>
                        <ListDivider />
                        <MenuItem variant="soft" color="danger" onClick={() => { deletePost(item._id) }}>
                            <ListItemDecorator sx={{ color: 'inherit' }}>
                                <DeleteForever />
                            </ListItemDecorator>{' '}
                            Delete
                        </MenuItem>
                    </Menu>
                </Dropdown>
            </div>

            <div className=' postHeader flex g10 flexa p20'>
                <div className='imgHeader '> {item.author.profileImage !== null ? <img src={item.author.profileImage} loading="lazy" /> : <img src={profileImg} loading="lazy" />} </div>
                <div className='headingHeader'>
                    <h5>{item.author.name}</h5>
                    <p>{item.title}</p>
                    <div className='flex'>
                        <span>w <BiWorld /></span>
                    </div>
                </div>
            </div>

            <div className=' postBody'>
              <p className='p10'>{item.content}</p>
                <div className='img-body'>{item.images && <img src={item.images[0]} loading="lazy" />}</div>
            </div>

            <div className=' postFooter'>
                <div className='flex disComments g10 '>
                    <div className='flex ml10'><p> 0</p></div>
                    <div className='flex g5 mr10'><p> 0</p> comments</div>
                </div>
                <hr className='hrPostt' />
                <div className='dis-btn flex p5'>
                    <div className='flex g5 p20' ><p><ThumbUpIcon /></p>Like</div>
                    <div className='flex g5 p20' onClick={()=>{setCommentPop(true)}}><p><FaRegCommentDots /></p>Comments</div>
                    <div className='flex g5 p20'><p><FaShare /></p>Share</div>
                </div>
            </div>
        </div>
    )
}
