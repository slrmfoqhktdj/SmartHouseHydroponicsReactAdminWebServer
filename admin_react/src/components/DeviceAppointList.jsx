import React from 'react'
import { Box,Typography, useTheme } from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import { tokens } from "../theme";


import { useState } from 'react';

import {fetchPost} from '../communication/handlefetch'


import  Button  from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { ko } from "date-fns/locale";   
import CalendarContainer from "../components/CalenderContainer";
import DatePicker from 'react-datepicker';
import moment from 'moment'

const DeviceAppointList = ({ isDashboard = false , Data = null}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [ShowSettingsDialog,setShowSettingsDialog] = useState(false);
 

  const [SelectedItemId,setSelectedItemId] = useState({name:"",startt:"",stopt:"",onoff:false});

  const [StartDate, setStartDate] = useState();
  const [EndDate, setEndDate] = useState();

  const [anchorEl, setAnchorEl] = useState(null);


  const open = Boolean(anchorEl);

  

  const openPositionMenu = (event,id) => {
    setSelectedItemId(id);
    setStartDate(moment(id.startt, 'HH:mm').toDate())
    setEndDate(moment(id.stopt, 'HH:mm').toDate())
    setAnchorEl(event.currentTarget);
  };
  const closePositionMenu = () => {
    setAnchorEl(null);
  };

  function openShowSettingsDialog(){
    setShowSettingsDialog(true)
  }

  function closeShowSettingsDialog(){
    setShowSettingsDialog(false)
  }

  const handleStartDatePicker= (date) => {
    setStartDate(date)
  }

  const handleEndDatePicker= (date) => {
    setEndDate(date)
  }


  const columns = [
    { 
      field: "name", 
      headerName: "예약명" ,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { name } }) => {
        return (
          <Box
            // width="60%"
            m="0 auto"
            // p="5px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
          >
            <Typography color={colors.greenAccent[500]} sx={{ ml: "5px" , fontSize:"12px"}}>{name?name === "compump"? "컴프펌프" : name === "ffan"? "유동팬": name === "efan"?"배기팬":name === "aircon"?"냉난방기":name === "co2creator"?"co2발생기":name === "led"?"LED":name:null}</Typography>
          </Box>
        );
      },
    },
    {
      field: "startt",
      headerName: "시작시간",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { startt } }) => {
        return (
          <Box
            // width="60%"
            m="0 auto"
            // p="5px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" , fontSize:"12px"}}>{startt? startt.split(":")[0] + "시" + startt.split(":")[1] + "분" : null }</Typography>
          </Box>
        );
      },
    },
    {
      field: "stopt",
      headerName: "종료시간",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { stopt } }) => {
        return (
          <Box
            // width="60%"
            m="0 auto"
            // p="5px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" , fontSize:"12px"}}>{stopt? stopt.split(":")[0] + "시" + stopt.split(":")[1] + "분" : null }</Typography>
          </Box>
        );
      },
    },
    {
      field: "onoff",
      headerName: "예약여부",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { onoff } }) => {
        return (
          <Box
            // width="60%"
            m="0 auto"
            // p="5px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" , fontSize:"12px"}}>{onoff != null? onoff === false ? "Off":"On" : null}</Typography>
          </Box>
        );
      },
    },
    
    // {
    //   field: "u_time",
    //   headerName: "상태갱신시간",
    //   headerAlign: "center",
    //   align: "center",
    //   flex: 1,
    //   renderCell: ({ row: { u_time } }) => {
    //     return (
    //       <Box
    //         // width="60%"
    //         m="0 auto"
    //         // p="5px"
    //         display="flex"
    //         alignItems="center"
    //         justifyContent="center"
    //         width="100%"
    //         height="100%"
    //       >
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" , fontSize:"12px"}}>{u_time?  new Date(u_time).toLocaleString(): null}</Typography>
    //       </Box>
    //     );
    //   },
    // },
    
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
  


  
  const updateProps = {
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      formData.append('id',Data.id)
      formData.append('name',SelectedItemId.name)
      const formJson = Object.fromEntries(formData.entries());

      
      fetchPost("/cmd/ap",formJson)
      .then((json) => {           
        if(json?.isUpdated===true){
          
          // const updatedDatalist = Data.items.map((item)=>{
          //   if(item.name === SelectedItemId.name){

          //     const updatedItem = {
          //       ...item,
          //       startt : StartDate,
          //       stopt : EndDate,
          //       onoff : formData.onoff
          //     }

          //     return updatedItem
          //   }
          //   return item
          // })

          closeShowSettingsDialog();

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
        m={isDashboard ?"20px 0 0 0":"40px 0 0 0"}
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
 

        <MenuItem onClick={()=>{ closePositionMenu(); openShowSettingsDialog();}}>설정수정</MenuItem>
      </Menu>


      <Dialog
        open={ShowSettingsDialog}
        onClose={closeShowSettingsDialog}
        PaperProps={updateProps}
      >
        <DialogTitle>예약 정보 수정</DialogTitle>
        <DialogContent>
          <DialogContentText>
            해당 동작의 예약 설정을 수정합니다. 
          </DialogContentText>
          

          <p></p>
          <p></p>
          
          <FormLabel id="demo-controlled-radio-buttons-group" m="20px">시작 시간 &nbsp;&nbsp;&nbsp;   </FormLabel>
          <p></p>
          <DatePicker
            label="HH:mm"
            name="startt"
            showTimeSelect
            showTimeSelectOnly
            locale={ko} 
            selected={StartDate}
            onChange={handleStartDatePicker}
            dateFormat= "HH:mm"
            popperContainer={CalendarContainer}
            required
          />
         

          <p></p>
          <p></p>
          <FormLabel id="demo-controlled-radio-buttons-group" m="20px">종료 시간 &nbsp;&nbsp;&nbsp;   </FormLabel>
          <p></p>
          <DatePicker
            label="HH:mm"
            name="stopt"
            showTimeSelect
            showTimeSelectOnly
            locale={ko} 
            selected={EndDate}
            onChange={handleEndDatePicker}
            dateFormat= "HH:mm"
            popperContainer={CalendarContainer}
            required
          />
          <p></p>
            <FormLabel id="demo-controlled-radio-buttons-group">예약여부</FormLabel>
            <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="onoff" defaultValue={SelectedItemId.onoff} required>
              <FormControlLabel value= "true" control={<Radio />} label="On" />
              <FormControlLabel value= "false" control={<Radio />} label="Off" />
            </RadioGroup>
          <p></p>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeShowSettingsDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">요청하기</Button>
        </DialogActions>
      </Dialog>




  


      

      

        {/* <DataGrid checkboxSelection rows={Data} columns={columns} components={{ Toolbar: GridToolbar }} /> */}
        <DataGrid  
          rows={Data?.items&&Data?.items.length? Data.items:[]}
          getRowId={(row)=>row.name}
          columns={isDashboard? columns.slice(0,-1):columns} 
          hideFooter={isDashboard} 
          components={{Pagination : null}} 
          disableColumnMenu
          disableColumnFilter
          />
      </Box>
    </Box>
  );
};



export default React.memo(DeviceAppointList);

