import { Box} from "@mui/material";
import Header from "../../components/Header";
import { useCallback, useState ,useEffect } from 'react';
import {fetchGet} from "../../communication/handlefetch"
import DeviceAppointListComponent from "../../components/DeviceAppointList";
import CustomTableSearcherAppoint from "../../components/CustomTableSearcherAppoint";

const DeviceAppointList = () => {

  const [Data, setData] = useState([]);
  
  const [MenuList, setMenuList] = useState([{id:null}]);


  const SearchHandle = (data) => {

    if(!data||data===""){
  
      getPageData()
    }else{
     

      fetchGet(`/deviceappointlist/search/${data}`)
      .then((data) => {    
          setData(data)
      }).catch((err)=>{});
    }
    
  }





  const getPageData = useCallback(async () => {
    fetchGet(`/deviceappointlist`)
      .then((data) => {        
        setMenuList(data?.items.devices)
        setData(data?.items)
    
      }).catch((err)=>{});
  },[])

  useEffect(() => {
    
    getPageData();
    
  }, [getPageData]);

  

  

  return (
    <Box m="20px">
      <Header title="공장 예약 정보" subtitle="예약 상태를 볼 수 있습니다" />
      <CustomTableSearcherAppoint
          // MenuList={columns.filter((item) => (item.field !== "conn" && item.field !== "rowmenu"))}
          MenuList={MenuList}
          SearchHandle={SearchHandle}
        />
      <DeviceAppointListComponent Data={Data}   isDashboard={false}/>
    </Box>
  );
};

export default DeviceAppointList;



