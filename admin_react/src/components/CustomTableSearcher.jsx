import React, { useRef } from 'react';
import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../theme";
import { useState } from 'react';

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function CustomTableSearcher({MenuList = [], SearchHandle}){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [SelectedMenu,setSelectedMenu] = useState( MenuList[0]);
    const TextValue = useRef();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const openPositionMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const closePositionMenu = () => {
        setAnchorEl(null);
    };
    
    function ClickHandle(){
        SearchHandle(SelectedMenu.field,TextValue.current?.trim())
    }

    return (
       
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          margin={'0 0 5px 0'}
        >

            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={openPositionMenu}
                endIcon={<KeyboardArrowDownIcon />}
            >
              
              {SelectedMenu.headerName}
            </Button>
            <Menu
                id="long-menu"
                MenuListProps={{
                'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={closePositionMenu}
                PaperProps={{
                style: {
                    maxHeight: 150,
                    width: '20ch',
                },
                }}
            >

            {
               MenuList.map((item) => (
                <MenuItem key={item.field} selected={item.field === SelectedMenu} onClick={()=> {closePositionMenu(); setSelectedMenu(item)}}>
                  {item.headerName}
                </MenuItem>
              ))
              
            }
          </Menu>


          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" onChange={(data) => {TextValue.current = data.target.value}}/>
          <IconButton type="button" sx={{ p: 1 }} onClick={ClickHandle}>
            <SearchIcon />
          </IconButton>
        </Box>
    )
} 

export default React.memo(CustomTableSearcher);


