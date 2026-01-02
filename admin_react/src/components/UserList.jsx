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
import  TextField  from '@mui/material/TextField'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';


import CustomTableSearcher from "./CustomTableSearcher";

const UserList = ({ isDashboard = false , Data, setMounted , TablePaginationFunc ,SearchHandle,IsSearch = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [UpdateDialog,setUpdateDialog] = useState(false);
  const [RemoveDialog,setRemoveDialog] = useState(false);
  const [AlertDialog,setAlertDialog] = useState(false);

  const [SelectedItemId,setSelectedItemId] = useState({email:"",name:""});

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function openUpdateDialog(){
    setUpdateDialog(true)
  }

  function closeUpdateDialog(){
    setUpdateDialog(false)
    // setSelectedItemId(null)
  }

  function openRemoveDialog(){
    setRemoveDialog(true)
  }

  function closeRemoveDialog(){
    setRemoveDialog(false)
    // setSelectedItemId(null)
  }

  function openAlertDialog(){
    setAlertDialog(true)
  }

  function closeAlertDialog(){
    setAlertDialog(false)
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
      field: "email", 
      headerName: "이메일",
      headerAlign: "center",
      align: "center",
      flex: 1, 
    },
    { 
      field: "name",
      headerName: "닉네임", 
      headerAlign: "center",
      align: "center",
      flex: 1 ,
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

  const updateProps = {
    component: 'form',
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formJson = Object.fromEntries(formData.entries());

      fetchPost("/user/update",formJson)
      .then((json) => {           
        if(json?.isUpdated===true){
          
          closeUpdateDialog();

          setMounted()
        }
        else {
          alert(json?.errorMessage)
        }
      }).catch((err)=>{});


    },
  }


  const removeProps = {
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const user = {
        email:SelectedItemId.email,
        name:SelectedItemId.name,
      }

      fetchPost("/user/remove",user)
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

  const alertProps = {
    component: 'form',
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      formData.append('user',SelectedItemId.email)
      const formJson = Object.fromEntries(formData.entries());

      fetchPost("/user/alert",formJson)
      .then((json) => {           
        if(json?.isResulted===true){
          
          closeAlertDialog();

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
          getRowId={(row)=> row.email}
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
        <MenuItem onClick={()=>{closePositionMenu(); openUpdateDialog()}}>수정</MenuItem>
        <MenuItem onClick={()=>{closePositionMenu(); openRemoveDialog()}}>삭제</MenuItem>
        <MenuItem onClick={()=>{closePositionMenu(); openAlertDialog()}}>알림</MenuItem>
      </Menu>


      <Dialog
        open={RemoveDialog}
        onClose={closeRemoveDialog}
        PaperProps={removeProps}
      >
        <DialogTitle>사용자 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            사용자 {SelectedItemId.email}을 삭제하시겠습니까?
          </DialogContentText>
          
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRemoveDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">삭제하기</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={UpdateDialog}
        onClose={closeUpdateDialog}
        PaperProps={updateProps}
      >
        <DialogTitle>수정</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {SelectedItemId.email}의 정보를 수정합니다
          </DialogContentText>

          <TextField
            // autoFocus
            required
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            disabled={true}
            defaultValue={SelectedItemId.email}
            color="success"
            variant="standard"
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="닉네임"
            name="name"
            fullWidth
            defaultValue={SelectedItemId.name}
            color="success"
            variant="standard"
          />
           
          <TextField
            // autoFocus
            required
            margin="dense"
            label="Password"
            name="password"
            fullWidth
            color="success"
            variant="standard"
          />
          

          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">수정하기</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={AlertDialog}
        onClose={closeAlertDialog}
        PaperProps={alertProps}
      >
        <DialogTitle>알림</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {SelectedItemId.email}에 알림을 전송합니다
          </DialogContentText>

          <TextField
            // autoFocus
            required
            margin="dense"
            label="제목"
            name="title"
            fullWidth
            defaultValue={"알림"}
            color="success"
            variant="standard"
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="내용"
            name="content"
            fullWidth
            color="success"
            variant="standard"
          />          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAlertDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">전송하기</Button>
        </DialogActions>
      </Dialog>


    </Box>
  );
};

export default React.memo(UserList);