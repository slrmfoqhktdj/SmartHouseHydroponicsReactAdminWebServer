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

import UserListComponent from "../../components/UserList";

const UserList = () => {

  const [Data, setData] = useState([]);
  const [sDialog,setDialog] = useState(false);
  const [AlertDialog,setAlertDialog] = useState(false);
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

      fetchGet(`/userlist/search/${column}/${data}`)
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

  function openAlertDialog(){
    setAlertDialog(true)
  }

  function closeAlertDialog(){
    setAlertDialog(false)
  }

  const getPageData = useCallback(async () => {
    fetchGet(`/userlist/${(page*rowsPerPage)}/${((page*rowsPerPage)+rowsPerPage)}`)
      .then((data) => {        
        setData(data?.item)
        setDataCount(data?.count)
      }).catch((err)=>{});
  },[page,rowsPerPage])

  useEffect(() => {
    getPageData()
  }, [Mounted,getPageData]);

  const alertProps = {
    component: 'form',
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formJson = Object.fromEntries(formData.entries());

      fetchPost("/user/whole/alert",formJson)
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

  const insertProps = {
    component: 'form',
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      
      fetchPost("/user/register",formJson)
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
      title="사용자 관리"
      subtitle="사용자 정보를 관리합니다. 각 사용자들은 어플과 사용자 페이지를 통해 서비스를 사용할 수 있습니다."
      />

      <UserListComponent  Data={Data} setMounted = {changeMounted} TablePaginationFunc ={TablePaginationFunc} SearchHandle={SearchHandle} IsSearch={IsSearch}/>

      <Box
        m="20px 0 0 0"
        display="flex" 
        flexDirection={'row'}
        justifyContent="flex-end"
        >

        <Box
        m="0px 20px 0 0"
        display="flex"
        justifyContent="flex-end"
        >
          <Button variant="outlined" color="secondary" onClick={openAlertDialog}
          sx={
            {
              width:"5vw",
              height:"3vh"
            }
          }
          >사용자 추가</Button>

        </Box>
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="flex-end"
          >
            <Button variant="outlined" color="secondary" onClick={openinsertDialog}
            sx={
              {
                width:"5vw",
                height:"3vh"
              }
            }
            >전체 알림</Button>

        </Box>

      </Box>
      

      <Dialog
        open={AlertDialog}
        onClose={closeAlertDialog}
        PaperProps={alertProps}
      >
        <DialogTitle>알림</DialogTitle>
        <DialogContent>
          <DialogContentText>
            전체 사용자에게 알림을 전송합니다
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

      <Dialog
        open={sDialog}
        onClose={closeinsertDialog}
        PaperProps={insertProps}
      >
        <DialogTitle>추가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            사용자를 추가합니다
          </DialogContentText>

           <TextField
            // autoFocus
            required
            margin="dense"
            label="Email"
            name="email"
            fullWidth
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
          <Button onClick={closeinsertDialog} color="secondary">취소</Button>
          <Button type="submit" color="secondary">추가하기</Button>
        </DialogActions>
      </Dialog>


      

    </Box>
  );
};

export default UserList;
