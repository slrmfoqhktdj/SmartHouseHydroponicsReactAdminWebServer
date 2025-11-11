import { Box} from "@mui/material";


import Header from "../../components/Header";
import { useState , useCallback , useEffect } from 'react';

import {fetchGet} from '../../communication/handlefetch'


import TablePagination from "@mui/material/TablePagination";
import DeviceListComponent from "../../components/DeviceList";

// import { height } from "@mui/system";

const DeviceList = () => {


  const [Data, setData] = useState([]);
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

      fetchGet(`/devicelist/search/${column}/${data}`)
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


  const getPageData = useCallback(async () => {
    fetchGet(`/devicelist/${(page*rowsPerPage)}/${((page*rowsPerPage)+rowsPerPage)}`)
    .then((data) => {        
      setData(data?.item)
      setDataCount(data?.count)
    }).catch((err)=>{});
  },[page,rowsPerPage])

  useEffect(() => {
    getPageData()
  }, [Mounted,getPageData]);

  const changeMounted = () => setMounted(Mounted+1);


 
  

  return (
    <Box m="20px">
      
      <Box>
        <Header title="기본 정보" subtitle="각 상태정보 및 센서값을 확인할 수 있습니다" />
      </Box>  

      <DeviceListComponent Data={Data} setMounted = {changeMounted} TablePaginationFunc={TablePaginationFunc}  SearchHandle={SearchHandle} IsSearch={IsSearch}/>
      
    </Box>
  );
};

export default DeviceList;
