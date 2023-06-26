// const posts = (posts = [], action) => {
//       switch (action.type) {
//         case 'FETCH_ALL':
//             return action.payload;
//         case 'CREATE' : 
//             return [...posts, action.payload];

//         default:
//             return posts;
//       }
// }

// export default posts;

const posts = (posts = [], action) => {
    switch (action.type) {
        /*as payload we are sending the id of the post to be deleted THEN we are only return the posts whose id does not match with the id associated to the post to be deleted*/
        //action.payload === id of the post to be deleted
        //if the id of any post is equal to the above id then tat post willl not be returned
        case 'DELETE':
            return posts.filter((post) => post._id !== action.payload);
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        case 'UPDATE':
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case 'LIKE':
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case 'COMMENT' :
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
            default:
            return posts;
    }
}

export default posts;