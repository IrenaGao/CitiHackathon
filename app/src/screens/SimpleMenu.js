import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      
      <AccountCircleIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} fontSize="large"/>         
     
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        drop='down'
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem><br></br>
        <MenuItem onClick={handleClose}>Cart</MenuItem><br></br>
        <MenuItem >Logout</MenuItem>
      </Menu>
    </div>
  );
}