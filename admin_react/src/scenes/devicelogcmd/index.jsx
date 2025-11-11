import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid,GridToolbarColumnsButton,GridToolbarDensitySelector,GridToolbarExport, GridToolbarContainer } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import { useCallback, useEffect,useState } from 'react';
// import { useRef } from 'react';

import {fetchPost,fetchGet} from '../../communication/handlefetch'

import  Button  from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormLabel from '@mui/material/FormLabel';


import DatePicker from 'react-datepicker';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

import { ko } from "date-fns/locale";   

import CalendarContainer from "../../components/CalenderContainer";
import TablePagination from "@mui/material/TablePagination";

import CustomTableSearcher from "../../components/CustomTableSearcher";

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BlockIcon from '@mui/icons-material/Block';

// import { height } from "@mui/system";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [UpdateDialog,setUpdateDialog] = useState(false);
  const [RemoveDialog,setRemoveDialog] = useState(false);

  const [Data, setData] = useState([]);

  const [Mounted,setMounted] = useState(1);

  const [SelectedItemId,setSelectedItemId] = useState({id:"",auto:""});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [StartDate, setStartDate] = useState();
  const [EndDate, setEndDate] = useState();

  const [DataCount, setDataCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [IsSearch, setIsSearch] = useState(false);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function TablePaginationFunc () {

    return (
      <TablePagination
        component="div"
        count={DataCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        
      />
    );
  }

  const columns = [
    { 
      field: "id", 
      headerName: "기기명" ,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
      flex: 1,
      
    },
    {
      field: "auto",
      headerName: "상태",
      headerAlign: "center",
      align: "center",
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

  const getPageData = useCallback(async () => {
    fetchGet(`/logcmdpage/${(page*rowsPerPage)}/${((page*rowsPerPage)+rowsPerPage)}`)
    .then((data) => {        
      setData(data?.item)
      setDataCount(data?.count)
    }).catch((err)=>{});
  },[page,rowsPerPage])

  useEffect(() => {
    getPageData()
  }, [Mounted,getPageData]);

  const SearchHandle = (column ,data) => {
    console.log(data)

    if(!data||data===""){
      setIsSearch(false)
      setPage(0)
      getPageData()
    }else{
      setIsSearch(true)

      fetchGet(`/logcmdpage/search/${column}/${data}`)
      .then((data) => {        
          setData(data?.item)
          setDataCount(data?.item?.length)
      }).catch((err)=>{});
    }
    
  }

  const openPositionMenu = (event,id) => {
    setSelectedItemId(id);
    setAnchorEl(event.currentTarget);
  };
  const closePositionMenu = () => {
    setAnchorEl(null);
  };



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

  const handleStartDatePicker= (date) => {
    setStartDate(date)
  }

  const handleEndDatePicker= (date) => {
    setEndDate(date)
  }

  function CustomToolBar (){
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Box sx={{ flexGrow: 1 }} />
        <CustomTableSearcher
          MenuList={columns.filter((item) => ( item.field !== "rowmenu" && item.field !== "auto"))}
          SearchHandle={SearchHandle}
        />
        
      </GridToolbarContainer>
    )
    
  }

  const updateProps = {
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      formData.append('id',SelectedItemId.id)
      const formJson = Object.fromEntries(formData.entries());

      
      fetchPost("/command/upl",formJson)
      .then((json) => {           
        if(json?.isUploaded===true){
          
          closeUpdateDialog();

          setMounted(Mounted+1)
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
      const formData = new FormData(event.currentTarget);
      formData.append('id',SelectedItemId.id)
      const formJson = Object.fromEntries(formData.entries());

      
      fetchPost("/log/allremove",formJson)
      .then((json) => {           
        if(json?.isRemove===true){
          
          closeUpdateDialog();

          setMounted(Mounted+1)
        }
        else {
          alert(json?.errorMessage)
        }
      }).catch((err)=>{});

    },
  }

  return (
    <Box m="20px">
      <Header title="진단파일 요청" subtitle="해당 하우스의 진단파일을 요청 및 삭제 할 수 있습니다." />
      
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid  
          rows={Data&&Data.length? Data:[]} 
          columns={columns}  
          components={IsSearch?{ Toolbar: CustomToolBar }:{ Toolbar: CustomToolBar ,Pagination : TablePaginationFunc}}
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
        <MenuItem onClick={()=>{
              closePositionMenu(); 
              if(SelectedItemId.auto === 2){
                alert("기기가 서버와 연결되어 있지않아 명령을 보낼수 없습니다.")
              }else{
                openUpdateDialog(); 
              }
            }
          }>진단파일요청</MenuItem>
        <MenuItem onClick={()=>{closePositionMenu(); openRemoveDialog()}}>진단파일전체삭제</MenuItem>
      </Menu>



     



      <Dialog
        open={UpdateDialog}
        onClose={closeUpdateDialog}
        PaperProps={updateProps}
      >
        <DialogTitle>진단파일 요청</DialogTitle>
        <DialogContent>
          <DialogContentText>
            해당 기간의 진단파일을 요청합니다. (기록 시간 미정시 최근~3일의 진단파일이 반환됩니다.)
          </DialogContentText>

          <p></p>
          <p></p>
          
          <FormLabel id="demo-controlled-radio-buttons-group" m="20px">진단 기록 시작 날짜 &nbsp;&nbsp;&nbsp;   </FormLabel>
          <p></p>
          <DatePicker
            label="yyyy-MM-dd"
            name="startdatetime"
            locale={ko} 
            maxDate={EndDate == null? new Date(): EndDate}
            selected={StartDate}
            onChange={handleStartDatePicker}
            dateFormat= "yyyy-MM-dd"
            popperContainer={CalendarContainer}
          />
         

          <p></p>
          <p></p>
          <FormLabel id="demo-controlled-radio-buttons-group" m="20px">진단 기록 끝 날짜 &nbsp;&nbsp;&nbsp;   </FormLabel>
          <p></p>
          <DatePicker
            label="yyyy-MM-dd"
            name="stopdatetime"
            locale={ko}
            maxDate={new Date()}
            selected={EndDate}
            onChange={handleEndDatePicker}
            dateFormat= "yyyy-MM-dd"
            popperContainer={CalendarContainer}
          />
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">요청하기</Button>
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
            {SelectedItemId.id}의 모든 진단파일을 삭제하시겠습니까?
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
