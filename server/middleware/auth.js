// import jwt from 'jsonwebtoken';

// //wants to like a post
// //click the like button => authmiddleWare(NEXT) => like controller is called
// //so basically the middleware acts as the mediator for liking iff the id is retrieved thereby triggering the next()

// const auth = async (req, res, next) => {
//     try {
//         //we are getting the token as respoonse from the controllers
        
//         const token = req.headers.authorization.split(" ")[1];

//         const isCustomAuth = token.length < 500;
//         let decodedData;

//         if(token && isCustomAuth)
//         {
//             //this is for our custom authentification
//             decodedData = jwt.verify(token , 'test');
            
//             req.userId = decodedData?.id;
//         }
//         else
//         {
//             //this is for google sign in
//             decodedData = jwt.decode(token);
//             console.log(decodedData);
//             req.userId = decodedData?.sub;
//         }

//         next();
//     } catch (error) {
//         console.log(error);
//     }
// }
// export default auth;

import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    //done with jwt error at 05:56 am 15-06-23
    //the res that i was getting from google sign in i wasnt fethching token through it properly
    //it should be token = res?.tokenId and NOT token = res?.token
    //due to this i wasnt getting the token in my localstorage for jwt to decode
    //hence the error jwt malformed(when there is no token to be decoded this error appears)
    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    // if(token)
    // {
    //     decodedData = jwt.verify(token, secret);

    //     req.userId = decodedData?.id;
    // }}
    }
     else{
      decodedData = jwt.decode(token);
        
      req.userId = decodedData?.sub;
      
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;

// import jwt from "jsonwebtoken";
// import axios from 'axios';

// const secret = 'test';

// const verifyGoogleIdToken = async (googleIdToken) => {
//   try {
//     const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${googleIdToken}`);
//     const { sub: googleId } = response.data;
//     return googleId;
//   } catch (error) {
//     console.log(error);
//     throw new Error('Google ID verification failed');
//   }
// };

// const auth = async (req, res, next) => {
//   try {
//     console.log(req.headers);
//     const token = req.headers.authorization.split(" ")[1];

//     let decodedData;

//     if (token.startsWith('Bearer')) {
//       const customToken = token.split(' ')[1];
//       decodedData = jwt.verify(customToken, secret);
//       req.userId = decodedData?.id;
//     } else if (token.startsWith('Google')) {
//       const googleIdToken = token.split(' ')[1];
//       const googleId = await verifyGoogleIdToken(googleIdToken);
//       req.userId = googleId;
//     } else {
//       throw new Error('Invalid token format');
//     }

//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default auth;
