import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
import './Auth.css';
import { useDispatch, useSelector } from 'react-redux';
//for google sign in use gapi script
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth.js';
// import { Alert } from '@mui/material';
// import IconButton from "@mui/material/IconButton";
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
//import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
const clientId = "450368446823-4olpovqluia1n8tk9agsbse9egb02e01.apps.googleusercontent.com";

//const initialState = { firstname: '', lastname: '', email: '', password: '' };
const initialState = {firstname : '', lastname : '', email : '', password : ''};
const Auth = () => {

  const dispatch = useDispatch();
  // const isSignUp = false;
  const [isSignUp, setisSignUp] = useState('false');
  const [passwordType, setpasswordType] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handlePassword = () => setpasswordType((prevpasswordType) => !prevpasswordType)
  const switchMode = () => setisSignUp((previsSignUp) => !previsSignUp);
  //   const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState('');

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name] : e.target.value});
  }

  // const errorMessage = useSelector((state) => state.action.errorS);
  //const errorMess = errorMessage
  // const errorS = useSelector((state) => state.authReducer.errorS);
  // const errorMessage = errorS ? errorS.errorMessage : null;
  // console.log(errorMessage);

  //using auth reducer i dispatched the errorMEssage i had sent from backend to the global state of redux , retrieved it from there and logged ot to the console
  const errorS = useSelector((state) => state.auth.errorS);
  const errorSignUp = useSelector((state) => state.auth.errorSignUp);
  // const errorMessage = errorS && errorS.errorMessage ? errorS.errorMessage : null;
  // {
  //   errorS && setOpenSnackbar(true) && setSnackbarMessage(errorS);
  // }



  // const user = useSelector((state) => state.auth.authData);
  // const handleCloseSnackbar = () => {
  //   setOpenSnackbar(false);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, navigate));
      if (errorSignUp !== null) {
        console.log(errorSignUp);
        setOpenSnackbar(true);
        setSnackbarMessage(errorSignUp);
      }
    }
    else {
      dispatch(signin(formData, navigate));
      //{
      // errorS && setOpenSnackbar(true) && setSnackbarMessage(errorS);
      // }
      if (errorS !== null) {
        setOpenSnackbar(true);
        setSnackbarMessage(errorS);
      }
      // if(errorMessage)
      // {
      //   console.log(errorMessage);
      //   // setSnackbarMessage(errorMessage);
      //   // setOpenSnackbar(true);
      // }
    }
    console.log(formData);

  }

  const navigate = useNavigate();

  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log(token);

    try {
      dispatch({ type: 'AUTH', data: { result, token } });

      navigate('/');
    } catch (error) {
      console.log(error);
    }

  }
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign in was unsuccessfull. Try again later!");
  }

  const start = () => {
    gapi.client.init({
      clientId: clientId,
      scope: ""
    })

    gapi.load('client : auth2', start);
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className='main_container'>
        <div className="request">
          {isSignUp ? 'Sign Up' : 'Sign In '} to your account
        </div>
        <div className="subhead">
          to enjoy all the features
        </div>
        <div className="signinform">
          {
            isSignUp && (
              <>
                <div className="name">
                  <div className="name1">
                    {/* first name input */}
                    <div className="fname" >First Name</div>
                    {/* the name of the input tag should match to that specified in the initialState */}
                    <input type="text" className='fnamein' name='firstname' onChange={handleChange} />
                  </div>
                  <div className="name2">
                    <div className="lkname">Last Name</div>
                    {/* last name input */}
                    <input type="text" className='lnamein' name='lastname' onChange={handleChange} />
                  </div>
                </div>

              </>
            )
          }
          <div className="mailpass">
            <div className="email">Email Address</div>
            {/* email address input */}
            <input type="text" className='emailin' name='email' onChange={handleChange} />
            <div className="pass" name='password'>Enter Password</div>
            {/* password input */}
            <input name="password" type={passwordType ? 'password' : 'text'} className='passin' onChange={handleChange} />

            <button className='showpass' onClick={handlePassword}>{passwordType ? 'SHOW' : 'HIDE'}</button>
            <GoogleLogin
              clientId={clientId}
              render={(renderProps) => (
                <button className='gButton' onClick={renderProps.onClick} disabled={renderProps.disabled}><GoogleIcon />oogle Sign In</button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={'single_host_origin'}
              prompt="consent"
              onClick={start}
            />

          </div>
          <button className='submit' onClick={handleSubmit}>{isSignUp ? 'Submit' : 'Log In'}</button>
          <button className='comment1' onClick={switchMode}>{isSignUp ? 'Already have an account ? Sign In' : "Don't have an account ? Sign Up"}</button>
          {/* <div className="mailpass2">
                  <div className="email2">Email Address</div>
                  <input type="text" className='emailin2' />
                  <div className="pass2">Enter Password</div>
                  <input type="text2" className='passin' />
                  </div> */}
        </div>

      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000} // Adjust the duration as needed
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>

        }

      />


    </>

  )
}

export default Auth;
