import React from 'react'
import { useState, useEffect } from 'react'
import { ReactDOM } from 'react-dom'
import { Link, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import './index.css'
import logo2 from './assets/logo.png'

/* NAV BAR MUI */
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

export default function Navbar(){
  const user = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const authenticate = localStorage.getItem('authenticated');

  // navigations 
  const navigate = useNavigate();

  // to home page 
  const navigateHome = () => {
    navigate('/react/vendor/homepage');
  };

  // to admin main page (vendor page)
  const navigateAdminHome = () =>{
    navigate('/react/admin/homepage')
  }

  const navigateForm = () =>{
    navigate('/react/allforms');
  }

  // to log out 
  const [authenticated, setAuthenticated] = useState(authenticate); 
  const navigateLogout = () =>{
    localStorage.clear('username');
    localStorage.setItem("authenticated", false);
    localStorage.clear('role');
    setAuthenticated(false);
    navigate ('/react/login')
  }

  const settings = ['Account', 'Logout'];

  /* to handle the nav menu */
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigateLogin = () => {
    navigate ('/react/login')
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateAdmins = () => {

  }

  const navigateVendors = () => {

  }

  const navigateApproverHome = () => {
    navigate('/react/approver/homepage');
  }
  console.log("HELLO");



  console.log(role);
  if (role == 'Vendor'){
    return(
        <header className='navbar'>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img src={logo2}/>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, marginRight: '2%' }}>
            <Button sx={{color: '#2c2626'}} onClick={navigateHome}>
              Home
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 2, marginRight: 5}}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Account</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={navigateLogout}>Logout</Typography>
                </MenuItem>
            </Menu>
          </Box> 
        </header>
    )
  }

  else if (role == 'Admin'){
    return(
      <header className='navbar'>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          <img src={logo2}/>
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' }, marginRight: '3%' }}>
          <Button sx={{color: '#2c2626', marginRight: '1%'}} onClick={navigateAdminHome}>
            Home
          </Button>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' }, marginRight: '3%' }}>
          <Button sx={{color: '#2c2626', marginRight: '1%'}} onClick={navigateForm}>
            Forms
          </Button>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 2, marginRight: 5}}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Account</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={navigateLogout}>Logout</Typography>
              </MenuItem>
          </Menu>
        </Box> 
      </header>
    )
  }

  else if (role == 'Approver'){
    return(
      <header className='navbar'>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          <img src={logo2}/>
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' }, marginRight: '3%' }}>
          <Button sx={{color: '#2c2626', marginRight: '1%'}} onClick={navigateApproverHome}>
            Home
          </Button>
        </Box>

        <Box sx={{ display: { xs: 'none', sm: 'block' }, marginRight: '3%' }}>
          <Button sx={{color: '#2c2626', marginRight: '1%'}} onClick={navigateForm}>
            Forms
          </Button>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 2, marginRight: 5}}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Account</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={navigateLogout}>Logout</Typography>
              </MenuItem>
          </Menu>
        </Box> 
      </header>
    )
  }
}