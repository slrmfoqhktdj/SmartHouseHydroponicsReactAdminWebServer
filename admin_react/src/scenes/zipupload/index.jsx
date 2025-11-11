import { Box, useTheme } from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import { tokens } from "../../theme";


import Header from "../../components/Header";
import { useEffect } from 'react';
import { useState } from 'react';

import {fetchFile, fetchGet, fetchPost} from "../../communication/handlefetch"

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


const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [SelectedItemId,setSelectedItemId] = useState({id:"",u_time:""});


  const [PoleDialog,setPoleDialog] = useState(false);
  const [DeleteDialog,setDeleteDialog] = useState(false);

  const [Data, setData] = useState([]);

  const [files, setFiles] = useState();


  const [Mounted,setMounted] = useState(1);

  const openPositionMenu = (event,id) => {
    setSelectedItemId(id);
    setAnchorEl(event.currentTarget);
    // setRetrieveDate(new Date().setHours(new Date().getHours()+1))
  };
  const closePositionMenu = () => {
    setAnchorEl(null);
  };

  function openPoleDialog(){
    setPoleDialog(true)
  }

  function closePoleDialog(){
    setFiles(undefined)
    setPoleDialog(false)
  }

  function openFileDeleteDialog(){
    setDeleteDialog(true)
  }

  function closeFileDeleteDialog(){
    setDeleteDialog(false)
  }


  const handleFilesChange = (e) => {
      setFiles(e.target.files[0]);
  }




  const columns = [
    { 
      field: "id", 
      headerName: "파일명" ,
      headerAlign: "center",
      flex: 1,
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "u_time",
      headerName: "업로드날짜",
      flex: 1,
      headerAlign: "center",
      align: "center",
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


  useEffect(() => {
    
    fetchGet("/zipfilelist")
      .then((data) => {    

        setData(data?.data)

        // console.log(data?.data)

      }).catch((err)=>{});
  }, [Mounted]);

  const poleProps = {
    component: 'form',
    onSubmit: (e) => {

      e.preventDefault();
      const formData = new FormData(e.currentTarget);


      if(files === undefined){
        return alert("파일을 선택해주세요");
      }

      formData.append("zipfile",files)
      // formData.append("model",SelectModel)
      

      fetchFile('/upload/zipfile', formData)
      .then((data) =>{

        
        if(data?.isUploaded===true){
          
          closePoleDialog();

          setMounted(Mounted+1)
        }
        else {
          alert(data?.errorMessage)
        }
      }).catch((err) => {});


    },
  }


  const DeleteProps = {
    component: 'form',
    onSubmit: (e) => {

      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      formData.append("modelitem",SelectedItemId.id)
      const formJson = Object.fromEntries(formData.entries());
      
      fetchPost('/upload/filedelete', formJson)
      .then((data) =>{

        
        if(data?.isDeleted===true){
          
          closeFileDeleteDialog();

          setMounted(Mounted+1)
        }
        else {
          alert(data?.errorMessage)
        }
      }).catch((err) => {});


    },
  }





  return (
    <Box m="20px">
      <Header title="프로그램 업로드" subtitle="장치의 업데이트 할 프로그램을 업로드 할 수 있습니다" />
      <Box
        m="20px 0 0 0"
        height="75vh"
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
        }}
      >
        <DataGrid rows={Data&&Data.length? Data:[]} columns={columns}           
        initialState={{
          sorting: {
            sortModel: [{ field: 'u_time', sort: 'desc' }],
          },
        }}/>
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
        <MenuItem onClick={()=>{closePositionMenu(); openFileDeleteDialog()}}>파일 삭제</MenuItem>
      </Menu>

      <Box display="flex" flexDirection="vertical" alignItems="center" gap="1vw" justifyContent="flex-end">

      <Box
      m="20px 20px 0 0"
      display="flex"
      justifyContent="flex-end"
      >
        <Button variant="outlined" color="secondary" onClick={openPoleDialog}
        sx={
          {
            width:"5vw",
            height:"3vh"
          }
        }
        >파일 추가</Button>

      </Box>
      </Box>
      


      <Dialog
        open={PoleDialog}
        onClose={closePoleDialog}
        PaperProps={poleProps}
      >
        <DialogTitle>프로그램 업로드</DialogTitle>
        <DialogContent>
          <DialogContentText>
            기기가 업데이트할 프로그램을 업로드합니다.
          </DialogContentText>

          <Box
          m="20px 20px 0 0"
          display="flex"
          justifyContent="center"
          >
          {/* <form encType="multipart/form-data"> */}
            <input 
              // name="file"
              className='file-input'
              type="file"
              onChange={handleFilesChange}
              // accept=".apk"
              accept=".zip"
              required
            />
          {/* </form> */}
          </Box>
          

          
        </DialogContent>
        <DialogActions>
          <Button onClick={closePoleDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">업로드</Button>
        </DialogActions>
      </Dialog>



      <Dialog
        open={DeleteDialog}
        onClose={closeFileDeleteDialog}
        PaperProps={DeleteProps}
      >
        <DialogTitle>프로그램 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            해당 프로그램을 삭제 하시겠습니까?
          </DialogContentText>          

        </DialogContent>
        <DialogActions>
          <Button onClick={closeFileDeleteDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">삭제</Button>
        </DialogActions>
      </Dialog>


    
    </Box>





  );
};

export default Team;
