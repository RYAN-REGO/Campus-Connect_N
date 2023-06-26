import React,{useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Posts from '../Posts/Posts';
import './Container.css';
import Formm from '../Formm/Formm';
import {getPosts }from '../../actions/posts'
const  Container = () => {

  const [currentId, setCurrentId] = useState(null);



    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(getPosts());
        console.log("I am Watching");
    }, [dispatch])

    

  return (
    
    <div className='container'>
      <Posts className='PostsGrid' setCurrentId = {setCurrentId}/>
      <Formm className='FormGrid' currentId = {currentId} setCurrentId = {setCurrentId}/>
    </div>
  )
}

export default Container
