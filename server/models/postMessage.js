import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title : String,
    message : String,
    name : String,
    creator : String,
    stream : String,
    comments : {
        type : [String],
        default : []
    },
    likes: {
        type : [String],
        default : [],
    },
    createdAt : {
        type : Date,
        default : new Date()
    }
})

const postMessage = mongoose.model('postMessage', postSchema);

export default postMessage;


//the funtions that are used are : 
//mongoose.Schema
//mongoose.model

