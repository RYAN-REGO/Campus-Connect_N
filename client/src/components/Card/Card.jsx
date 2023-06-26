import React, { useState } from 'react';
// import {ThumbUpAltIcon} from '@mui/material';
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import './Cardnew.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch } from 'react-redux';
import { deletePost, likePost, commentPost } from '../../actions/posts';
//import { updateComment } from '../../api';
// import SendIcon from '@mui/icons-material/Send';
// import { TextField } from '@mui/material';

// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const Card = ({ post, setCurrentId }) => {
  // const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  
  const [comment, setComment] = useState(false);
  //this is used to retrieve comments from the backend , loop through them and display
  const [comments, setComments] = useState(post?.comments);
  //this is used to store the value of the commnets that are typed in the input textfield
  const [sendComment, setSendComment] = useState('');

  // const [likeCount, setLikeCount] = useState(null);
  const toggleComment = () => {
    setComment(!comment);
    //dispatch(getComments(post._id));

  }

  const handleComment = async (e) => {
    e.preventDefault();
    const newComments = await dispatch(commentPost(sendComment, post._id));
    // we re sending the comments in the api call
    setComments(newComments);
    handleClear();
  }


  const handleClear = () => {
    setSendComment('');
  }
  

  //there was an ambiguity regarding the like button but i just solved it at 3:59am 12-06-2023
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <>{post.likes.length > 2 ? `${post.likes.length + 1} ` : `${post.likes.length}`}</>
        ) : (
          <>{post.likes.length}</>
        );
    }


  };


  return (
    <div className={`Div ${comment ? 'open' : ''}`} key={post._id}>

      <div className='imp'>
        <h3 className='Title'>
          {post.title}
        </h3>
        <p className='Content'>
          {post.message}
        </p>
      </div>
      <div className="controls">
        <h4 className='Author'>Author</h4>
        <h4 className='Creator'>{post.name}</h4>
        <h4 className='Stream'>{post.stream}</h4>
        {/* <ThumbUpAltIcon  style={{ color: '#179BD7', position : 'absolute',bottom : '1rem', left : '1rem', cursor : 'pointer' }} /> */}
        <div className='menu'>
          &nbsp;&nbsp;&nbsp;
          <div className="likesdiv" style={{display : 'flex'}}>
          <ThumbUpIcon className='like' onClick={() => dispatch(likePost(post._id))} disabled={!user?.result} />
          <h4 className='Likes' >
            <Likes />
          </h4>
          </div>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
            (
              <DeleteIcon className='del' onClick={() => dispatch(deletePost(post._id))}></DeleteIcon>
            )
          }

          

          {
            (user) ?
            (
              (!(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator)) 
              ?
              (<button className='Comment' onClick={toggleComment} style={{position : 'relative', left : '180px'}}>
              Comment
            </button>)
            :(
              <button className='Comment' onClick={toggleComment} >
              Comment
            </button>
            )
              )
              :
              ((
                <button className='Comment' onClick={toggleComment} style={{position : 'relative', left : '180px'}} disabled={true}>
            Comment
          </button>)
                )

          }

          {
            (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
            (
              <button className='edit' onClick={() => { setCurrentId(post._id) }} >
                EDIT
              </button>)
          }

        </div>
        <div className={`commentSection ${comment ? 'open' : ''}`}>

          {/* {comments.map((c, i) =>
          (
          <div key={i} className={`commentBox ${comment ? 'open' : ''}`}>
            {c}
          </div>
        ))} */}

          {/* VERY IMPORTANT TO REMOVE EMPTY STRINGS FROM BEING DISPLAYED AS COMMENTS */}
          {comments.map((c, i) =>
          (
            c.trim() !== '' ? (
              <div key={i} className={`commentBox ${comment ? 'open' : ''}`}>
                {c}
              </div>) : null
          ))}
        </div>
        {/* //value = {sendComment} onChange = {(e) => setSendComment(e.target.value)} */}
        <textarea rows={2} id="input" className={`commentIn ${comment ? 'open' : ''}`} value={sendComment} onChange={(e) => setSendComment(e.target.value)}></textarea>
        <button className={`send ${comment ? 'open' : ''}`} onClick={handleComment}>Send</button>
      </div>
    </div>
  )
}

export default Card;
