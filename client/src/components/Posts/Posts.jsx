import React from 'react'
import './Posts.css';
import Card from '../Card/Card'
import {useSelector} from 'react-redux';
import {CircularProgress} from '@mui/material';
function Posts({setCurrentId}) {

  const posts = useSelector((state) => state.posts);
 
  return (
    

    !posts.length ? <CircularProgress/> : (

      <div className='cardGrid'>
      <div>
        <h3 className='headline'>Latest Topics</h3>
        <div className='Under'></div>
      </div>
      
      <div className="Cards">
            {posts.map((post) => (
              
              <Card post={post} setCurrentId = {setCurrentId}/>
              
            ))
            }
       </div> 
      
    </div>

    )
  )
}

export default Posts
