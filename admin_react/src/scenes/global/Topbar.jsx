import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
// import { ColorModeContext, tokens } from "../../theme";
import { ColorModeContext} from "../../theme";
// import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SearchIcon from "@mui/icons-material/Search";
import { useState  } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import  Button  from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {fetchPost} from '../../communication/handlefetch'
import { useNavigate } from "react-router-dom";


const Topbar = () => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [LogoutDialog,setLogoutDialog] = useState(false);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openPositionMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closePositionMenu = () => {
    setAnchorEl(null);
  };

  function openLogoutDialog(){
    setLogoutDialog(true)
  }
  function closeLogoutDialog(){
    setLogoutDialog(false)
  }

  const logoutProps = {
    
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData();
      const formJson = Object.fromEntries(formData.entries());

      fetchPost("/logout",formJson)
      .then((data) =>{
        if(data?.isLogout===true){
          
          closeLogoutDialog();
          navigate("/login")
         
        }
        else {
          alert(data?.errorMessage)
        }
      })

    },
  
  }

  return (
  
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={closePositionMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={()=>{closePositionMenu(); openLogoutDialog()}}>로그아웃</MenuItem>
      </Menu>


      <Dialog
        open={LogoutDialog}
        onClose={closeLogoutDialog}
        PaperProps={logoutProps}
      >
        <DialogTitle>로그아웃</DialogTitle>
        <DialogContent>
          <DialogContentText>
            로그아웃 하시겠습니까?
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLogoutDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">확인</Button>
        </DialogActions>
      </Dialog>

      <Box>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton> */}
        {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        <IconButton onClick={(event)=> openPositionMenu(event)}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
