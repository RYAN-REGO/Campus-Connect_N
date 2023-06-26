import React, { useState, useEffect } from 'react'
import './Formm.css';
import { TextField, Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white', // Modify the outline color here
    },
    '&:hover fieldset': {
      borderColor: '#00C1FF', // Modify the outline color on hover here
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00C1FF', // Modify the outline color when focused here
    },
  },
  '& .MuiInputLabel-root': {
    color: 'grey', // Modify the label color here
  },
}));

const Formm = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    stream: "",

  })

  
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

  // const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleClear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      stream: "",

    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    }
    handleClear();

  }
  
  // useEffect(() => {
  //     if(post) 
  //     {setPostData(post)};
  // },[post])

  if (!user?.result?.name) {
    return (
      <div className="formgrid">
        <div className="box">
        <div className='tip'>Please Sign in to publish your thought and react to other's thoughts.</div>
      </div>
      </div>
      
    )
  }
  return (
    <div className='formgrid'>
      <div className='Pub'>
        <h3 className='Title'>Publish Your Topic</h3>
        <form className='form' autoComplete="off" noValidate onSubmit={handleSubmit}>
          {/* <CustomTextField name="creator" variant="outlined" InputProps={{ style: { width: 300, color : '#00D1ff' } }} label="Creator" value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })}></CustomTextField> */}
          <CustomTextField name="title" variant="outlined" InputProps={{ style: { width: 300, color: '#00D1ff' } }} label="Title..upto 9 words" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}></CustomTextField>
          <CustomTextField name="message" variant="outlined" InputProps={{ style: { width: 300, color: '#00D1ff' } }} label="Message" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}></CustomTextField>
          <CustomTextField name="stream" variant="outlined" InputProps={{ style: { width: 300, color: '#00D1ff' } }} label="Stream eg. SY ENTC" value={postData.stream} onChange={(e) => setPostData({ ...postData, stream: e.target.value })}></CustomTextField>
          {/* <Button variant="contained" color="primary" onClick={handleSubmit} className='formbttn' InputProps={{ style : {marginTop : '10px'}}}>PUBLISH</Button> */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="formbttn"
            style={{ marginTop: '20px' }}
          >
            PUBLISH
          </Button>
          <Button variant="contained" color="primary" onClick={handleClear} style={{ marginTop: '10px' }}>CLEAR</Button>
        </form>
      </div>
    </div>
  )
}

export default Formm
