import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';
// export const getPosts = async (req, res) => {
//     try {
//         //finding something inside a model takes time so this is a async action
//         const postMessages = await PostMessage.find();
//         console.log(postMessages);

//         res.status(200).json(postMessages);
//     } catch (error) {
//         res.status(404).json({ message: error.message })
//     }
// }

export const getPosts = async(req,res) => {
    try {
        const postMessages  = await PostMessage.find();
        console.log(postMessages);
        
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message : error.message});
    }
}

// export const createPost = async (req, res) => {
//     const post = req.body;

//     const newPost = new PostMessage(post);

//     try {
//         await newPost.save();

//         res.status(200).json(newPost);

//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }

export const createPost = async(req,res) => {
    const post = req.body;

    const newPost = new PostMessage({...post, creator : req.userId, createdAt : new Date().toISOString()});

    try {
        await newPost.save();

        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
    }
}

// export const updatePost = async (req, res) => {
//     //while destructurinng we can also rename our parameter
//     const { id: _id } = req.params;
//     const post = req.body;
//     //here the post to be updated is sent as request 
//     if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

//     const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
//     res.json(updatedPost);
// }


// export const updatePost = async(req,res) => {
//     const {id : _id} = req.params;

//     if(!mongoose.Types.objectId.isValid(_id)) return res.status(404).send("NO post with that id");

//     const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new : true});
//     res.json(updatedPost)
// }


export const updatePost = async(req,res) => {
    const {id : _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send("No ppost with that id");

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new : true});

    res.json(updatedPost);
}

// export const deletePost = async (req, res) => {
//     /*first fetch the id form the request and then validate if that id is valid */
//     const { id: _id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send('No post with this id');

//     await PostMessage.findByIdAndRemove(_id);

//     res.json("Post Deleted successfully");
// }

export const deletePost = async(req,res) => {
    const {id : _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send("No post with this id");

    await PostMessage.findByIdAndRemove(_id);

    res.json("Post deleted Successfully");
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message : 'Unauthenticated'});

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send("No post with this id");
    /*first we have to fetch the post using the id and then make the updates to it */
    const post = await PostMessage.findById(id);

    //likes is an array containing the id of the people who have liked a particular post
    const index = post.likes.findIndex((id) => id === String(req.userId))

    //if the index is not present then the output will  be -1
    if(index === -1)
    {
        //like the damn post
        post.likes.push(req.userId);
    }
    else
    {
        //dislike the post
        //return an array of ids excluding the id who has disliked the post(clicked the like bttn twice)
        post.likes  = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}

// export const commentPost = async(req,res) => {
//     const {id} = req.params;

//     const {value} = req.body;
//     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send("No post with this id");

//     const post = await PostMessage.findById(id);
//     post.comments.push(value);

//     const updatedPost = await PostMessage.findByIdAndUpdate(id , post , {new : true});

//     res.json(updatedPost);


// }

export const commentPost = async(req,res) => {
    const {id} = req.params;
    const {value} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send("No post found with this post id");

    const post = await PostMessage.findById(id);
    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post , {new : true});

    res.json(updatedPost);
}
