<<<<<<< HEAD
import React from 'react'
import { Box , useTheme } from "@mui/material";
import { DataGrid,GridToolbarColumnsButton,GridToolbarDensitySelector,GridToolbarExport, GridToolbarContainer } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useState } from 'react';
import {fetchPost} from '../communication/handlefetch'
import  Button  from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';


import CustomTableSearcher from "./CustomTableSearcher";

const DeviceUserList = ({ isDashboard = false , Data, setMounted , TablePaginationFunc ,SearchHandle,IsSearch = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [RemoveDialog,setRemoveDialog] = useState(false);

  const [SelectedItemId,setSelectedItemId] = useState({id:"",user:"",r_time:""});

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  function openRemoveDialog(){
    setRemoveDialog(true)
  }

  function closeRemoveDialog(){
    setRemoveDialog(false)
    // setSelectedItemId(null)
  }

  const openPositionMenu = (event,id) => {
    setSelectedItemId(id);
    setAnchorEl(event.currentTarget);
  };
  const closePositionMenu = () => {
    setAnchorEl(null);
  };

  const columns = [
    { 
      field: "user", 
      headerName: "유저",
      headerAlign: "center",
      align: "center",
      flex: 1, 
    },
    { 
      field: "id",
      headerName: "ID", 
      headerAlign: "center",
      align: "center",
      flex: 1 ,
    },
    {
      field: "r_time",
      headerName: "등록시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field:"rowmenu",
      headerName:"",
      headerAlign: "center",
      align: "center",
      sortable:false,             // 컬럼 정렬
      disableColumnMenu:true,     // 컬럼 메뉴
      flex: 0.5,
      toolbar:false,
      renderCell:(params) =>{
        return(
          <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={(event)=> openPositionMenu(event,params.row)}
        >
          <MoreVertIcon />
        </IconButton>
        )
        
      }
    }
  ];

  function CustomToolBar (){
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Box sx={{ flexGrow: 1 }} />
        <CustomTableSearcher
          MenuList={columns.filter((item) => (item.field !== "rowmenu"))}
          SearchHandle={SearchHandle}
        />
        
      </GridToolbarContainer>
    )
    
  }


  const removeProps = {
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const deviceid = {
        id:SelectedItemId.id,
        user:SelectedItemId.user,
        
      }

      fetchPost("/deviceuser/remove",deviceid)
      .then((json) => {           
        if(json?.isRemoved===true){
          
          closeRemoveDialog();

          setMounted()
        }
        else {
          alert(json?.errorMessage)
        }
      }).catch((err)=>{});


    },
  }

  return (

    
    <Box m={isDashboard ? "20px" : "0px"}>

      <Box
        m={isDashboard ? "20px 0 0 0": "40px 0 0 0"}
        height={isDashboard ? "17vh": "75vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
      <DataGrid

          rows = {Data&&Data.length? Data:[]}
          columns={isDashboard? columns.slice(0,-1):columns}
          hideFooter={isDashboard}
          getRowId={(row)=> row.r_time}
          components={IsSearch?{Toolbar: CustomToolBar}:{ Toolbar: isDashboard? null:CustomToolBar , Pagination : isDashboard? null:TablePaginationFunc}} 
          disableColumnMenu
          disableColumnFilter
        />
      </Box>

    
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={closePositionMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={()=>{closePositionMenu(); openRemoveDialog()}}>삭제</MenuItem>
      </Menu>


      <Dialog
        open={RemoveDialog}
        onClose={closeRemoveDialog}
        PaperProps={removeProps}
      >
        <DialogTitle>등록 기기 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {SelectedItemId.user}의 {SelectedItemId.id}등록을 삭제하시겠습니까?
          </DialogContentText>
          
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRemoveDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">삭제하기</Button>
        </DialogActions>
      </Dialog>


    </Box>
  );
};

=======
import React from 'react'
import { Box , useTheme } from "@mui/material";
import { DataGrid,GridToolbarColumnsButton,GridToolbarDensitySelector,GridToolbarExport, GridToolbarContainer } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useState } from 'react';
import {fetchPost} from '../communication/handlefetch'
import  Button  from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';


import CustomTableSearcher from "./CustomTableSearcher";

const DeviceUserList = ({ isDashboard = false , Data, setMounted , TablePaginationFunc ,SearchHandle,IsSearch = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [RemoveDialog,setRemoveDialog] = useState(false);

  const [SelectedItemId,setSelectedItemId] = useState({id:"",user:"",r_time:""});

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  function openRemoveDialog(){
    setRemoveDialog(true)
  }

  function closeRemoveDialog(){
    setRemoveDialog(false)
    // setSelectedItemId(null)
  }

  const openPositionMenu = (event,id) => {
    setSelectedItemId(id);
    setAnchorEl(event.currentTarget);
  };
  const closePositionMenu = () => {
    setAnchorEl(null);
  };

  const columns = [
    { 
      field: "user", 
      headerName: "유저",
      headerAlign: "center",
      align: "center",
      flex: 1, 
    },
    { 
      field: "id",
      headerName: "ID", 
      headerAlign: "center",
      align: "center",
      flex: 1 ,
    },
    {
      field: "r_time",
      headerName: "등록시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field:"rowmenu",
      headerName:"",
      headerAlign: "center",
      align: "center",
      sortable:false,             // 컬럼 정렬
      disableColumnMenu:true,     // 컬럼 메뉴
      flex: 0.5,
      toolbar:false,
      renderCell:(params) =>{
        return(
          <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={(event)=> openPositionMenu(event,params.row)}
        >
          <MoreVertIcon />
        </IconButton>
        )
        
      }
    }
  ];

  function CustomToolBar (){
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Box sx={{ flexGrow: 1 }} />
        <CustomTableSearcher
          MenuList={columns.filter((item) => (item.field !== "rowmenu"))}
          SearchHandle={SearchHandle}
        />
        
      </GridToolbarContainer>
    )
    
  }


  const removeProps = {
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const deviceid = {
        id:SelectedItemId.id,
        user:SelectedItemId.user,
        
      }

      fetchPost("/deviceuser/remove",deviceid)
      .then((json) => {           
        if(json?.isRemoved===true){
          
          closeRemoveDialog();

          setMounted()
        }
        else {
          alert(json?.errorMessage)
        }
      }).catch((err)=>{});


    },
  }

  return (

    
    <Box m={isDashboard ? "20px" : "0px"}>

      <Box
        m={isDashboard ? "20px 0 0 0": "40px 0 0 0"}
        height={isDashboard ? "17vh": "75vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
      <DataGrid

          rows = {Data&&Data.length? Data:[]}
          columns={isDashboard? columns.slice(0,-1):columns}
          hideFooter={isDashboard}
          getRowId={(row)=> row.r_time}
          components={IsSearch?{Toolbar: CustomToolBar}:{ Toolbar: isDashboard? null:CustomToolBar , Pagination : isDashboard? null:TablePaginationFunc}} 
          disableColumnMenu
          disableColumnFilter
        />
      </Box>

    
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={closePositionMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={()=>{closePositionMenu(); openRemoveDialog()}}>삭제</MenuItem>
      </Menu>


      <Dialog
        open={RemoveDialog}
        onClose={closeRemoveDialog}
        PaperProps={removeProps}
      >
        <DialogTitle>등록 기기 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {SelectedItemId.user}의 {SelectedItemId.id}등록을 삭제하시겠습니까?
          </DialogContentText>
          
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRemoveDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">삭제하기</Button>
        </DialogActions>
      </Dialog>


    </Box>
  );
};

>>>>>>> d9c85bf62bb727feba0d3c463ce39bcb2f3ca3c9
export default React.memo(DeviceUserList);