import React,{useState} from "react";
import {TextField, Button, Paper} from "@mui/material";

// import useStyles from "./styles";
//import styled from "styled-components";

import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";
export default function Form() {
  const [postData, setPostData] = useState({
    creator : "",
    title : "",
    message : "",
    stream : "",

  })
    // const classes = useStyles();
  const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createPost(postData));
    }

    const clear = () => {

    }
    
  return (
    <Paper >
      <form autoComplete = "off"  noValidate onSubmit = {handleSubmit} >
         
          <TextField name="creator" variant = "outlined" label = "Creator" value = {postData.creator} onChange={(e) => setPostData({...postData, creator : e.target.value})}></TextField>
          <TextField name="title" variant = "outlined" label = "title" value = {postData.title} onChange={(e) => setPostData({...postData, title : e.target.value})}></TextField>
          <TextField name="message" variant = "outlined" label = "message" value = {postData.message} onChange={(e) => setPostData({...postData, message : e.target.value})}></TextField>
          <TextField name="stream" variant = "outlined" label = "Stream" value = {postData.stream} onChange={(e) => setPostData({...postData, stream : e.target.value})}></TextField>
          <Button variant = "contained" color = "primary" type = "submit" fullWidth onClick={handleSubmit}>Submit</Button>
          <Button variant = "contained" color = "secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}
