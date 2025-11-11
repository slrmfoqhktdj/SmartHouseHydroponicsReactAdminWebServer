import React from 'react'
import { Box,  Typography, useTheme } from "@mui/material";
import { DataGrid,GridToolbarColumnsButton,GridToolbarDensitySelector,GridToolbarExport, GridToolbarContainer } from "@mui/x-data-grid";
import { tokens } from "../theme";

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BlockIcon from '@mui/icons-material/Block';


import CustomTableSearcher from "../components/CustomTableSearcher";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
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

function DeviceList({ isDashboard = false , Data, setMounted ,TablePaginationFunc ,SearchHandle,IsSearch = false}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [SelectedItemId,setSelectedItemId] = useState({id:"",comp:"",pump:"",f_fan:"",e_fan:"",aircon:"",co2_creator:"",led:"",temp:"",humi:"",co2_sensor:"",ph_ec_sensor:"",cctv:"",auto:"",b_time:""});
  const [RemoteDialog,setRemoteDialog] = useState(false);
  const [RebootSoftwareDialog,setRebootSoftwareDialog] = useState(false);
  const [RebootHardwareDialog,setRebootHardwareDialog] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openPositionMenu = (event,id) => {
    setSelectedItemId(id);
    setAnchorEl(event.currentTarget);
  };
  const closePositionMenu = () => {
    setAnchorEl(null);
  };

  function openRemoteDialog(){
    setRemoteDialog(true)
  }

  function closeRemoteDialog(){
    setRemoteDialog(false)
  }

  function openRebootSoftwareDialog(){
    setRebootSoftwareDialog(true)
  }

  function closeRebootSoftwareDialog(){
    setRebootSoftwareDialog(false)
  }

  function openRebootHardwareDialog(){
    setRebootHardwareDialog(true)
  }

  function closeRebootHardwareDialog(){
    setRebootHardwareDialog(false)
  }


  const columns = [
    { 
      field: "id", 
      headerName: "기기명" ,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
      
    },
    {
      field: "comp",
      headerName: "컴프",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { comp } }) => {
        return (
          <Box
            width="60%"
            m="0"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>{comp === true ? "On":"Off" }</Typography>
          </Box>
        );
      },
    },
    {
      field: "pump",
      headerName: "펌프",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { pump } }) => {
        return (
          <Box
            width="60%"
            m="0"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>{pump === true ? "On":"Off" }</Typography>
          </Box>
        );
      },
    },
    {
      field: "f_fan",
      headerName: "유동팬",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { f_fan } }) => {
        return (
          <Box
            width="60%"
            m="0"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>{f_fan === true ? "On":"Off" }</Typography>
          </Box>
        );
      },
    },
    {
      field: "e_fan",
      headerName: "배기팬",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { e_fan } }) => {
        return (
          <Box
            width="60%"
            m="0"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>{e_fan === true ? "On":"Off" }</Typography>
          </Box>
        );
      },
    },
    {
      field: "aircon",
      headerName: "냉난방기",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { aircon } }) => {
        return (
          <Box
            width="60%"
            m="0"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>{aircon === true ? "On":"Off" }</Typography>
          </Box>
        );
      },
    },
    {
      field: "co2_creator",
      headerName: "co2생성기",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { co2_creator } }) => {
        return (
          <Box
            width="60%"
            m="0"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>{co2_creator === true ? "On":"Off" }</Typography>
          </Box>
        );
      },
    },
    {
      field: "led",
      headerName: "LED",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { led } }) => {
        return (
          <Box
            width="60%"
            m="0"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>{led === true ? "On":"Off" }</Typography>
          </Box>
        );
      },
    },
    {
      field: "temp",
      headerName: "온도",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "humi",
      headerName: "습도",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "co2_sensor",
      headerName: "co2센서",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "ph_ec_sensor",
      headerName: "phec센서",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "b_time",
      headerName: "최근시작시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "auto",
      headerName: "상태",
      headerAlign: "center",
      align: "center",
      sortable:false,
      flex: 1,
      renderCell: ({ row: { auto } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              auto === 0
                ? colors.grey[600]
                : auto === 1
                ? colors.greenAccent[600]
                : colors.redAccent[700]
            }
            borderRadius="4px"
          >
            {auto === 0 && <HourglassEmptyIcon />}
            {auto === 1 && <DoneOutlineIcon />}
            {auto === 2 && <BlockIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>{auto === 0 ? "수동":auto === 1? "자동": "연결끊김" }</Typography>
          </Box>
        );
      },
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


  const RemoteProps = {
    
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const arr = []
      const arr_val = []
      for (const key of formData.keys()) {
        arr.push(key)
      }

      for (const val of formData.values()) {
        arr_val.push(val)
      }
     
      const sendformData = new FormData()
      sendformData.append("id",SelectedItemId.id)
      sendformData.append("key",arr)
      sendformData.append("value",arr_val)
      const formJson = Object.fromEntries(sendformData.entries());


      fetchPost("/cmd/nf",formJson)
      .then((data) =>{
        if(data?.isOnoffed===true){
          
          closeRemoteDialog();

          setMounted()
        }
        else {
          alert(data?.errorMessage)
        }
      }).catch((err)=>{});


    },
  
  }

  const RebootSoftwareProps = {
    
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
     
      const sendformData = new FormData()
      sendformData.append("id",SelectedItemId.id)
      const formJson = Object.fromEntries(sendformData.entries());


      fetchPost("/cmd/rbsw",formJson)
      .then((data) =>{
        if(data?.isRebooted===true){
          closeRebootSoftwareDialog();
          setMounted()
        }
        else {
          alert(data?.errorMessage)
        }
      }).catch((err)=>{});
    },
  
  }

  const RebootHardwareProps = {
    
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
     
      const sendformData = new FormData()
      sendformData.append("id",SelectedItemId.id)
      const formJson = Object.fromEntries(sendformData.entries());


      fetchPost("/cmd/rbhw",formJson)
      .then((data) =>{
        if(data?.isRebooted===true){
          closeRebootHardwareDialog();
          setMounted()
        }
        else {
          alert(data?.errorMessage)
        }
      }).catch((err)=>{});
    },
  
  }

  function CustomToolBar (){
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Box sx={{ flexGrow: 1 }} />
        <CustomTableSearcher
          MenuList={columns.filter((item) => (item.field !== "auto" && item.field !== "rowmenu"))}
          SearchHandle={SearchHandle}
        />
        
      </GridToolbarContainer>
    )
    
  }

  

  return (
    <Box m={isDashboard ? "20px" : "0px"}>

      
      <Box
        m="20px 0 0 0"
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
          rows={Data&&Data.length? Data:[]} 
          columns={isDashboard? columns.slice(0,-1):columns}  
          hideFooter={isDashboard}
          components={IsSearch?{Toolbar: CustomToolBar}:{ Toolbar: isDashboard? null:CustomToolBar , Pagination : isDashboard? null:TablePaginationFunc}} 
          // componentsProps={{
          //   panel: {
          //     sx: {
          //       '& .MuiDataGrid-columnsPanelRow:last-child': {
          //         display: 'none', 
          //       },
          //     },
          //   },
          // }}  // 마지막 컬럼 안보이게 하기 (rowmenu)
          disableColumnMenu
          disableColumnFilter
          // initialState={{
          //   sorting: {
          //     sortModel: [{ field: 'i_time', sort: 'desc' }],
          //   },
          // }}

        />



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
          <MenuItem onClick={()=>{ 
            closePositionMenu(); 
            if(SelectedItemId.auto === 2){
              alert("기기가 서버와 연결되어 있지않아 명령을 보낼수 없습니다.")
            }else{
              openRebootSoftwareDialog(); 
            }
            }}>소프트웨어 재부팅
          </MenuItem>
          <MenuItem onClick={()=>{ 
            closePositionMenu(); 
            if(SelectedItemId.auto === 2){
              alert("기기가 서버와 연결되어 있지않아 명령을 보낼수 없습니다.")
            }else{
              openRebootHardwareDialog(); 
            }
            }}>하드웨어 재부팅
          </MenuItem>
          <MenuItem onClick={()=>{ 
            closePositionMenu(); 
            if(SelectedItemId.auto === 2){
              alert("기기가 서버와 연결되어 있지않아 명령을 보낼수 없습니다.")
            }else{
              openRemoteDialog(); 
            }
            }}>OnOff 조작하기
          </MenuItem>
          <MenuItem onClick={()=>{ 
            closePositionMenu(); 
            window.open(SelectedItemId.cctv)
            }}>cctv보기
          </MenuItem>
        </Menu>

        <Dialog
          open={RemoteDialog}
          onClose={closeRemoteDialog}
          PaperProps={
            RemoteProps
          }
        >
          
          <DialogTitle>OnOff 조작</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {SelectedItemId.id}의 OnOff 를 원격조작합니다.
            </DialogContentText>
            
            <p></p>
            <FormLabel id="demo-controlled-radio-buttons-group">컴프</FormLabel>
            <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="comp_val" defaultValue={SelectedItemId.comp} required>
              <FormControlLabel value= "true" control={<Radio />} label="On" />
              <FormControlLabel value= "false" control={<Radio />} label="Off" />
            </RadioGroup>
            <FormLabel id="demo-controlled-radio-buttons-group">컴프펌프</FormLabel>
            <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="pump_val" defaultValue={SelectedItemId.pump} required>
              <FormControlLabel value= "true" control={<Radio />} label="On" />
              <FormControlLabel value= "false" control={<Radio />} label="Off" />
            </RadioGroup>
            <p></p>
            <p></p>
            <FormLabel id="demo-controlled-radio-buttons-group">유동팬</FormLabel>
            <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="f_fan_val" defaultValue={SelectedItemId.f_fan} required>
              <FormControlLabel value= "true" control={<Radio />} label="On" />
              <FormControlLabel value= "false" control={<Radio />} label="Off" />
            </RadioGroup>
            <p></p>
            <p></p>
            <FormLabel id="demo-controlled-radio-buttons-group">배기팬</FormLabel>
            <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="e_fan_val" defaultValue={SelectedItemId.e_fan} required>
              <FormControlLabel value= "true" control={<Radio />} label="On" />
              <FormControlLabel value= "false" control={<Radio />} label="Off" />
            </RadioGroup>
            <p></p>
            <p></p>
            <FormLabel id="demo-controlled-radio-buttons-group">냉난방기</FormLabel>
            <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="aircon_val" defaultValue={SelectedItemId.aircon} required>
              <FormControlLabel value= "true" control={<Radio />} label="On" />
              <FormControlLabel value= "false" control={<Radio />} label="Off" />
            </RadioGroup>
            <p></p>
            <p></p>
            <FormLabel id="demo-controlled-radio-buttons-group">co2생성기</FormLabel>
            <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="co2_creator_val" defaultValue={SelectedItemId.co2_creator} required>
              <FormControlLabel value= "true" control={<Radio />} label="On" />
              <FormControlLabel value= "false" control={<Radio />} label="Off" />
            </RadioGroup>
            <p></p>
            <p></p>
            <FormLabel id="demo-controlled-radio-buttons-group">LED</FormLabel>
            <RadioGroup row aaria-labelledby="demo-row-radio-buttons-group-label"  name="led_val" defaultValue={SelectedItemId.led} required>
              <FormControlLabel value= "true" control={<Radio />} label="On" />
              <FormControlLabel value= "false" control={<Radio />} label="Off" />
            </RadioGroup>
            <p></p>

                        
          </DialogContent>
          <DialogActions>
            <Button onClick={closeRemoteDialog} color="secondary">취소</Button>
            <Button type="submit" color="secondary">학인</Button>
          </DialogActions>

          
        </Dialog>


        <Dialog
          open={RebootSoftwareDialog}
          onClose={closeRebootSoftwareDialog}
          PaperProps={
            RebootSoftwareProps
          }
        >
          <DialogTitle>소프트웨어 재부팅</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {SelectedItemId.id}의 소프트웨어를 재부팅합니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeRebootSoftwareDialog} color="secondary">취소</Button>
            <Button type="submit" color="secondary">학인</Button>
          </DialogActions>
          
        </Dialog>

        <Dialog
          open={RebootHardwareDialog}
          onClose={closeRebootHardwareDialog}
          PaperProps={
            RebootHardwareProps
          }
        >
          <DialogTitle>하드웨어 재부팅</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {SelectedItemId.id}의 하드웨어를 재부팅합니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeRebootHardwareDialog} color="secondary">취소</Button>
            <Button type="submit" color="secondary">학인</Button>
          </DialogActions>
          
        </Dialog>
       
      </Box>    
    
    </Box>

    
  );
}


export default React.memo(DeviceList);