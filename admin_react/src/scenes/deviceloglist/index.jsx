import { Box,  useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import { useEffect } from 'react';
import { useState } from 'react';
// import { useRef } from 'react';

import {fetchPost,fetchGet, fetchDownFile} from '../../communication/handlefetch'

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




// import { height } from "@mui/system";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [downDialog,setdownDialog] = useState(false);
  const [RemoveDialog,setRemoveDialog] = useState(false);

  const [Data, setData] = useState([]);

  const [Mounted,setMounted] = useState(1);

  const [SelectedItemId,setSelectedItemId] = useState({id:"",s_time:"",e_time:"",c_time:""});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const columns = [
    { 
      field: "id", 
      headerName: "파일명" ,
      headerAlign: "center",
      align: "center",
      // cellClassName: "name-column--cell",
      flex: 1,
      
    },
    {
      field: "s_time",
      headerName: "진단기록 시작시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "e_time",
      headerName: "진단기록 끝시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "c_time",
      headerName: "파일생성시간",
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
      filterable:false,           // 필터 메뉴 포함 거절
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
    
    fetchGet("/loglistpage",{credentials: 'include'})
    .then((data) => {       
      setData(data)
    }).catch((err)=>{});
    
    
  }, [Mounted]);

  const openPositionMenu = (event,id) => {
    setSelectedItemId(id);
    setAnchorEl(event.currentTarget);
  };
  const closePositionMenu = () => {
    setAnchorEl(null);
  };



  function opendownDialog(){
    setdownDialog(true)
  }

  function closedownDialog(){
    setdownDialog(false)
    // setSelectedItemId(null)
  }

  function openRemoveDialog(){
    setRemoveDialog(true)
  }

  function closeRemoveDialog(){
    setRemoveDialog(false)
    // setSelectedItemId(null)
  }


  const downloadFile = async ()=>{

    const responseData = await fetchDownFile(`/downloadlog/${SelectedItemId.id}`)


    const blobData = await responseData.blob();
    const url = window.URL.createObjectURL(new Blob([blobData]));

    const link = document.createElement('a');

    link.href = url;
    link.setAttribute("download",SelectedItemId.id)

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);

    closeRemoveDialog();
    setMounted(Mounted+1)

  }

  const downProps = {
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      downloadFile();
    },
  }

  const removeProps = {
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const filename = {
        filename:SelectedItemId.id,
      }

      fetchPost("/log/remove",filename)
      .then((json) => {     
        
        closeRemoveDialog();

        setMounted(Mounted+1)

        if(!json?.isRemoved&&json?.errorMessage){
          alert(json?.errorMessage)
        }
      }).catch((err)=>{});


    },
  }

  return (
    <Box m="20px">
      <Header title="진단파일 관리" subtitle="요청된 모든 진단파일을 볼 수 있습니다." />
      
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
            // color: colors.greenAccent[300],
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
        <DataGrid  rows={Data&&Data?.length? Data:[]} columns={columns}  components={{ Toolbar: GridToolbar }} initialState={{
          sorting: {
            sortModel: [{ field: 'c_time', sort: 'desc' }],
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
        <MenuItem onClick={()=>{closePositionMenu(); opendownDialog()}}>진단파일받기</MenuItem>
        <MenuItem onClick={()=>{closePositionMenu(); openRemoveDialog()}}>진단파일삭제</MenuItem>
      </Menu>



     



      <Dialog
        open={downDialog}
        onClose={closedownDialog}
        PaperProps={downProps}
      >
        <DialogTitle>진단파일 다운로드</DialogTitle>
        <DialogContent>
          <DialogContentText>
            해당 진단파일을 다운로드 합니다.
          </DialogContentText>
        
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closedownDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">다운로드</Button>
        </DialogActions>
      </Dialog>



      <Dialog
        open={RemoveDialog}
        onClose={closeRemoveDialog}
        PaperProps={removeProps}
      >
        <DialogTitle>진단파일 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            해당 진단파일을 삭제하시겠습니까?
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

export default Team;
