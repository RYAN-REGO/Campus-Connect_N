import express from 'express';
import {getPosts, createPost , updatePost, deletePost, likePost,commentPost} from '../controllers/posts.js';
import auth from '../middleware/auth.js';
const router = express.Router();

//basically only when we populate the userId variabke can we move on to the controllers specified that are createPost, updatePost,etc...
//hence it know the middleware which when populated will only allow the process tobe continued ot the next controller

router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost',auth, likePost);
router.post('/:id/commentPost',auth, commentPost);
//router.get('/:id', getComments);
//router.patch('/:id', updateComment); 
export default router;