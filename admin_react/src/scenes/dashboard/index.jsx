import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
// import DeviceMap from "../../components/DeviceMap";

import { useEffect , useState } from 'react';

import DeviceBarChart from "../../components/DeviceBarChart";
import DeviceList from "../../components/DeviceList";
import DeviceAppointList from "../../components/DeviceAppointList";
import DeviceDaily from "../../components/DeviceDaily";
import DeviceUserList from "../../components/DeviceUserList";

import {useNavigate} from 'react-router-dom'
import {fetchMainGet} from '../../communication/handlefetch'

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [Data, setData] = useState([]);

  const navigate = useNavigate()

  useEffect(() => { 
    fetchMainGet("/dashboarddata")
    .then((data) => {        
      setData(data)
    }).catch((err)=>{});
  }, []);


  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="대쉬보드" subtitle="정보들을 간랸히 보여줍니다." />

      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={{ cursor: 'pointer' , display: 'flex' , flexDirection: 'row' , alignItems: 'center', justifyContent: 'center'}} onClick={()=>{navigate('/devicelist')}}>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
                m={"0 0 20px 0 "}
                
              >
                공장 기본 정보
              </Typography>
              <p style={{margin:"0 0 15px 0" , color:colors.greenAccent[300]}}> &nbsp;&nbsp;-&nbsp;&nbsp; 바로가기</p>
            </div>
           
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <DeviceList isDashboard={true} Data={Data?.list}/>
          </Box>
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          // padding="30px"
        >
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <div style={{ cursor: 'pointer' , display: 'flex' , flexDirection: 'row' , alignItems: 'center', justifyContent: 'center'}} onClick={()=>{navigate('/deviceappointlist')}}>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                  m={"0 0 20px 0 "}
                >
                  공장 예약 정보
                </Typography>
                <p style={{margin:"0 0 15px 0" , color:colors.greenAccent[300]}}> &nbsp;&nbsp;-&nbsp;&nbsp; 바로가기</p>
              </div>
            
            </Box>
            <Box height="200px" m="-20px 0 0 0">
              <DeviceAppointList isDashboard={true} Data={Data?.appoint}/>
            </Box>
          </Box>
        
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          // padding="30px"
        >
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <div style={{ cursor: 'pointer' , display: 'flex' , flexDirection: 'row' , alignItems: 'center', justifyContent: 'center'}} onClick={()=>{navigate('/deviceuserlist')}}>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                  m={"0 0 20px 0 "}
                >
                  공장 사용자 등록 관리
                </Typography>
                <p style={{margin:"0 0 15px 0" , color:colors.greenAccent[300]}}> &nbsp;&nbsp;-&nbsp;&nbsp; 바로가기</p>
              </div>
            
            </Box>
            <Box height="200px" m="-20px 0 0 0">
              <DeviceUserList isDashboard={true} Data={Data?.deviceuser}/>
            </Box>
          </Box>
        
        </Box>
       


        
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={{ cursor: 'pointer' , display: 'flex' , flexDirection: 'row' , alignItems: 'center', justifyContent: 'center'}} onClick={()=>{navigate('/devicedaily')}} >
              <Typography
                variant="h5"
                fontWeight="600"
                // sx={{ padding: "30px 30px 0 30px" }}
                color={colors.grey[100]}
                m={"0 0 20px 0"}
              >
                일자별 센서값
              </Typography>
              <p style={{margin:"0 0 15px 0" , color:colors.greenAccent[300]}}> &nbsp;&nbsp;-&nbsp;&nbsp; 바로가기</p>
              <p></p>
            </div>

          </Box>
          <Box height="250px" mt="-20px">
            <DeviceDaily isDashboard={true} Data={Data?.daily}/>
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={{ cursor: 'pointer' , display: 'flex' , flexDirection: 'row' , alignItems: 'center', justifyContent: 'center'}} onClick={()=>{navigate('/devicebargraph')}}>
              <Typography
                variant="h5"
                fontWeight="600"
                // sx={{ padding: "30px 30px 0 30px" }}
                color={colors.grey[100]}
                m={"0 0 20px 0"}
              >
                최근 3일 전체 센서값 그래프
              </Typography>
              <p style={{margin:"0 0 15px 0" , color:colors.greenAccent[300]}}> &nbsp;&nbsp;-&nbsp;&nbsp; 바로가기</p>
            </div>
          </Box>
          <Box height="250px" mt="-40px">
            <DeviceBarChart isDashboard={true} Data = {Data?.graph}/>
          </Box>
        </Box>
       
      </Box>
    </Box>
  );
};

export default Dashboard;
