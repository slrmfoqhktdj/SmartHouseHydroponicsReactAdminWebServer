import { Box, Typography,  useTheme } from "@mui/material";
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

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

import TablePagination from "@mui/material/TablePagination";

import CustomTableSearcher from "../../components/CustomTableSearcher";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BlockIcon from '@mui/icons-material/Block';

// import { height } from "@mui/system";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [UpdateDialog,setUpdateDialog] = useState(false);

  const [Data, setData] = useState([]);

  const [Mounted,setMounted] = useState(1);

  const [SelectedItemId,setSelectedItemId] = useState({id:"",auto:"",b_time:""});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [ModelanchorEl, setModelAnchorEl] = useState(null);
  const Modelopen = Boolean(ModelanchorEl);
  const [ModelList, setModelList] = useState([])
  const [SelectModel, setSelectModel] = useState("");



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
      field: "b_time", 
      headerName: "최근시작시간" ,
      headerAlign: "center",
      align: "center",
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
    fetchGet(`/deviceswlist/${(page*rowsPerPage)}/${((page*rowsPerPage)+rowsPerPage)}`)
    .then((data) => {        
      setData(data?.item)
      setDataCount(data?.count)
    }).catch((err)=>{});
  },[page,rowsPerPage])

  useEffect(() => {
    getPageData();
  }, [Mounted,getPageData]);

  const SearchHandle = (column ,data) => {

    if(!data||data===""){
      setIsSearch(false)
      setPage(0)
      getPageData()
    }else{
      setIsSearch(true)

      fetchGet(`/deviceswlist/search/${column}/${data}`)
      .then((data) => {        
          setData(data?.item)
          setDataCount(data?.item?.length)
      }).catch((err)=>{});
    }
    
  }

  const openPositionMenu = (event,id) => {
    setSelectedItemId(id);
    setAnchorEl(event.currentTarget);
    // setRetrieveDate(new Date().setHours(new Date().getHours()+1))
  };
  const closePositionMenu = () => {
    setAnchorEl(null);
  };

  const getModelfileList = () =>{
    fetchGet(`/zipfilelist`)
    .then((data) => {      
      setModelList(data?.data)
    }).catch((err)=>{console.log(err)});
  }

  const openModelPositionMenu = (event) => {
    setModelAnchorEl(event.currentTarget);
  };
  const closeModelPositionMenu = () => {
    setModelAnchorEl(null);
  }


  function openUpdateDialog(){
    setUpdateDialog(true)
  }

  function closeUpdateDialog(){
    setUpdateDialog(false)
    // setSelectedItemId(null)
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


      if(SelectModel===undefined||SelectModel===""||SelectModel===null){
        return alert("파일을 선택해주세요");
      }

      formData.append("id",SelectedItemId.id)
      const formJson = Object.fromEntries(formData.entries());
      
      fetchPost("/command/upd",formJson)
      
      .then((json) => {  
        
        if(json?.isUpdated){
          
          closeUpdateDialog();
          setMounted(Mounted+1)
        }
        else {
          alert(json?.errorMessage)
        }
      }).catch((err) => {});

    },
  }

  return (
    <Box m="20px">
      <Header title="업데이트 실행" subtitle="장치의 소프트웨어 업데이트를 원격진행합니다. 결과 반영은 일정 시간이 소요됩니다." />
      
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
          // initialState={{
          //   sorting: {
          //     sortModel: [{ field: 'u_time', sort: 'desc' }],
          //   },
          // }}
          components={IsSearch?{ Toolbar: CustomToolBar }:{ Toolbar: CustomToolBar ,Pagination : TablePaginationFunc}}
          disableColumnMenu
          disableColumnFilter
        // onRowClick={(rows) => {
        //   console.log(rows);
        // }}
        
        // onRowSelectionModelChange={
        //   (ids)=>{
        //     const selectedIDs = new Array(ids);
        //     // const selectedRowData = Data.filter((row)=> selectedIDs.has(row.id.toString()))
        //     // console.log(selectedRowData)
        //     setCheckedItem(selectedIDs)
        //     // console.log(selectedIDs)
        //   }
        // }
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
            openUpdateDialog()
          }
          
          }}>업데이트</MenuItem>
      </Menu>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={ModelanchorEl}
        open={Modelopen}
        onClose={closeModelPositionMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {
          ModelList.map((item) =>{
            return <MenuItem key={item.id} selected={item.id === SelectModel} onClick={()=>{closeModelPositionMenu(); setSelectModel(item.id)}}>{item.id}</MenuItem>
          })
        }
      </Menu>


      <Dialog
        maxWidth={"sm"}
        fullWidth={true}
        open={UpdateDialog}
        onClose={closeUpdateDialog}
        PaperProps={updateProps}
      >
        <DialogTitle>업데이트</DialogTitle>
        <DialogContent>
          <DialogContentText>
            해당 장치의 소프트웨어 업데이트를 진행합니다.
          </DialogContentText>
          <p></p>
          <FormLabel id="demo-controlled-radio-buttons-group" m="20px">파일선택* &nbsp;&nbsp;&nbsp;   </FormLabel>
          <Button
              id="demo-customized-button"
              aria-controls={Modelopen ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={Modelopen ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={(event)=>{getModelfileList();openModelPositionMenu(event)} }
              endIcon={<KeyboardArrowDownIcon />}
          >
              {SelectModel?SelectModel:"파일선택"}
          </Button>

          <input 
              // name="hidden"
              type="hidden"
              value={SelectModel}
              name="modelfile"
              required
          />
          
          
          
          <p></p>

          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">업데이트하기</Button>
        </DialogActions>
      </Dialog>



      
      
      
    </Box>

    
  );
};

export default Team;
