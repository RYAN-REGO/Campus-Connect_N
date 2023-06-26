
import React, { useEffect, useState } from 'react';
//import DarkModeIcon from '@mui/icons-material/DarkMode';
import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

// import { Snackbar } from '@mui/material';
// import AccountCircle from "@mui/icons-material/AccountCircle";
import images from '../../constants/images';
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
// import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import Togglebutton from '../Togglebutton/Togglebutton'

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [form, setform] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  //const[openForm , SetOpenForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  //<-------------------------------------------------------------------!!------------------------------->
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //<---------------------------------------------------------------!!-------------------------------->

  console.log(user);

  // useEffect(()=>{
  //     const name = user?.name;

  //     setUser(JSON.parse(localStorage.getItem('profile')));
  // })

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    // snackbare  nable();
    setOpenSnackbar(true); // Open the Snackbar
    setSnackbarMessage('Logged out successfully');
    navigate('/');
    setUser(null);
  }


  const handleOpenForm = () => {
    setform('open');
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };




  return (
    <>
      <nav className={`navbar ${isOpen ? 'open' : ''}`}>
        {/* <a href="/" className="logo">Logo</a> */}
        <div className="hamburger" onClick={toggleNavbar}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {
          user &&
          (
            <div className="toggle">
              <Link to="/Contact" className='link1'>Contact Me</Link>
            </div>
          )
        }

        <h2 className="heading">Campus Discussion Room</h2>
        <div className="nav-links">
          {/* <button className="toggle-mode">D</button> */}
          {
            user ?
              (
                <>
                  <Link to='/Contact' className='link' onClick={handleOpenForm}>Contact Me</Link>
                </>
              )
              :
              (
                // <h3 className='tipone'> Please SignIn</h3>
                <Link to='/auth' className='tipone'>Please Sign In</Link>
              )

          }
        </div>
        {
          user ? (
            // <div className="auth">
            //   {
            //     user.result.imageUrl && <img className='userImg' src={user.result.imageUrl} alt={user.result.name.charAt(0)} /> 

            //   }

            //   <div className="username">{user.result.name}</div>
            //   <button className='logout' onClick={logout}>Logout</button>
            // </div>
            <div className='profileimage'>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <img className='userImg' src={user.result.imageUrl ? user.result.imageUrl : images.user} alt={user.result.name.charAt(0)} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>{user.result.name}</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="sign">
              <Link to="/auth" className='Signin'>SignIn</Link>
            </div>

          )
        }
      </nav>
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
  );
};

export default Navbar;
