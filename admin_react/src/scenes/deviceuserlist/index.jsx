import { Box } from "@mui/material";

// import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";

import { useState , useCallback , useEffect } from 'react';
import {fetchGet, fetchPost} from "../../communication/handlefetch"
import  Button  from '@mui/material/Button'
import  TextField  from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TablePagination from "@mui/material/TablePagination";

import DeviceUserListComponent from "../../components/DeviceUserList";

const DeviceUserList = () => {

  const [Data, setData] = useState([]);
  const [sDialog,setDialog] = useState(false);
  const [Mounted,setMounted] = useState(1);


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

  const SearchHandle = (column ,data) => {
    console.log(data)

    if(!data||data===""){
      setIsSearch(false)
      setPage(0)
      getPageData()
    }else{
      setIsSearch(true)

      fetchGet(`/deviceuserlist/search/${column}/${data}`)
      .then((data) => {        
          setData(data?.item)
          setDataCount(data?.item?.length)
      }).catch((err)=>{});
    }
    
  }

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

  function openinsertDialog(){
    setDialog(true)
  }

  function closeinsertDialog(){
    setDialog(false)
  }

  const getPageData = useCallback(async () => {
    fetchGet(`/deviceuserlist/${(page*rowsPerPage)}/${((page*rowsPerPage)+rowsPerPage)}`)
      .then((data) => {        
        setData(data?.item)
        setDataCount(data?.count)
      }).catch((err)=>{});
  },[page,rowsPerPage])

  useEffect(() => {
    getPageData()
  }, [Mounted,getPageData]);

  const insertProps = {
    component: 'form',
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      
      fetchPost("/deviceuser/register",formJson)
      .then((data) =>{
        if(data?.isInserted===true){
          
          closeinsertDialog();

          setMounted()
        }
        else {
          alert(data?.errorMessage)
        }
      }).catch((err)=>{});


    },
  }

  const changeMounted = () => setMounted(Mounted+1);

  return (

    
    <Box m="20px">
 
      <Header
      title="유저 등록 기기관리"
      subtitle="유저마다 지정된 기기를 관리합니다. 각 유저는 지정된 기기만을 제어할 수 있습니다."
      />

      <DeviceUserListComponent  Data={Data} setMounted = {changeMounted} TablePaginationFunc ={TablePaginationFunc} SearchHandle={SearchHandle} IsSearch={IsSearch}/>

      <Box
        m="20px 20px 0 0"
        display="flex"
        justifyContent="flex-end"
        >
          <Button variant="outlined" color="secondary" onClick={openinsertDialog}
          sx={
            {
              width:"5vw",
              height:"3vh"
            }
          }
          >등록</Button>

        </Box>
      



      <Dialog
        open={sDialog}
        onClose={closeinsertDialog}
        PaperProps={insertProps}
      >
        <DialogTitle>추가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            유저와 등록기기를 추가합니다
          </DialogContentText>

           <TextField
            // autoFocus
            required
            margin="dense"
            label="유저"
            name="user"
            fullWidth
            color="success"
            variant="standard"
          />
          <TextField
            // autoFocus
            required
            margin="dense"
            label="기기"
            name="id"
            fullWidth
            color="success"
            variant="standard"
          />
          

          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeinsertDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">추가하기</Button>
        </DialogActions>
      </Dialog>


      

    </Box>
  );
};

export default DeviceUserList;
