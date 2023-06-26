// import axios from 'axios';

// const url = 'http://localhost:5000/posts';

// export const fetchPosts = () => axios.get(url);
// export const createPost = (newPost) => axios.post(url,newPost);

// import axios from 'axios';


// const url = 'http://localhost:5000/posts';


// export const fetchPosts = () => axios.get(url);
// export const createPost = (newPost) => axios.post(url, newPost);
// export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`); 
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
// //comment post
// export const comment = (value,id) => axios.post(`${url}/${id}/commentPost`,{value});


import axios from 'axios';


// const url = 'http://localhost:5000/posts';
const API = axios.create({baseURL : 'http://localhost:5000'})


//to use the middleware , use interceptors
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})
// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('profile')) {
//       const profile = JSON.parse(localStorage.getItem('profile'));
//       if (profile.token) {
//         req.headers.Authorization = `Bearer ${profile.token}`;
//       } 
//     }
//     return req;
//   });
  

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`); 
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
//comment post
export const comment = (value,id) => API.post(`/posts/${id}/commentPost`,{value});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);