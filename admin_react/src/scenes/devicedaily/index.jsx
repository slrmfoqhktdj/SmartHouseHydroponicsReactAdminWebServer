import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useState , useCallback , useEffect } from 'react';
import {fetchGet} from "../../communication/handlefetch"
import TablePagination from "@mui/material/TablePagination";
import ChargeDailyComponent from "../../components/DeviceDaily";

const ChargeDaily = () => {

  const [Data, setData] = useState([]);

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

      fetchGet(`/device_daily_list/search/${column}/${data}`)
      .then((data) => {        
          setData(data?.items)
          setDataCount(data?.items?.length)
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
    fetchGet(`/device_daily_list/${(page*rowsPerPage)}/${((page*rowsPerPage)+rowsPerPage)}`)
    .then((data) => {        
      setData(data?.items)
      setDataCount(data?.count)
    }).catch((err)=>{});
  },[page,rowsPerPage])

  useEffect(() => {
    getPageData()
  }, [getPageData]);


  return (

    
    <Box m="20px">
      
      <Header title="일자별 센서값 조회" subtitle="일자별 각 센서값을 조회합니다" />
      
      <ChargeDailyComponent Data={Data} TablePaginationFunc={TablePaginationFunc}  SearchHandle={SearchHandle} IsSearch={IsSearch}/>
    </Box>
  );





};

export default ChargeDaily;
