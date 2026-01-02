import React from 'react';
import { Box, useTheme} from "@mui/material";
import { tokens } from "../theme";
import { useState } from 'react';
import { useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function CustomTableSearcherAppoint({MenuList = [], SearchHandle}){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [SelectedMenu,setSelectedMenu] = useState( MenuList[0]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const openPositionMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const closePositionMenu = () => {
        setAnchorEl(null);
    };
    
    function ClickHandle(item){
      if(SelectedMenu.id !== item.id){
        SearchHandle(item.id)
      }
      
      // SearchHandle(SelectedMenu.id)
    }

    useEffect(() => {
    
      setSelectedMenu(MenuList[0])
      
    }, [MenuList]);

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
              
              {SelectedMenu? SelectedMenu.id:null}
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
                <MenuItem key={item.id} selected={item === SelectedMenu} onClick={()=> {closePositionMenu(); ClickHandle(item); setSelectedMenu(item); }}>
                  {item.id}
                </MenuItem>
              ))
              
            }
          </Menu>
          <Box >
            <p>{`상태 : ${SelectedMenu? SelectedMenu.auto === 0 ? "수동": SelectedMenu.auto === 1? "자동": "연결끊김": null}`}</p>
          </Box>
          
          {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" onChange={(data) => {TextValue.current = data.target.value}}/>
          <IconButton type="button" sx={{ p: 1 }} onClick={ClickHandle}>
            <SearchIcon />
          </IconButton> */}
        </Box>
    )
} 

export default React.memo(CustomTableSearcherAppoint);


