import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link , useLocation} from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import TvIcon from '@mui/icons-material/Tv';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FileUploadIcon from '@mui/icons-material/FileUploadOutlined';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGoOutlined';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
// import RoomIcon from '@mui/icons-material/Room';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


const Item = ({ title, to, icon, selected}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === to}
      style={{
        color: colors.grey[100],
      }}
      // onClick={() => {
      //   setSelected(title)
      //   // window.sessionStorage.setItem("title",title);
      // }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const location = useLocation()


  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              {/* <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  // style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box> */}
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  IF
                </Typography>
                {/* <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography> */}
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              모니터링
            </Typography>

            <Item
              title="대시보드"
              to="/"
              icon={<DashboardIcon/>}
              selected={location.pathname}
              // setSelected={setSelected}
            />


            
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              공장관리
            </Typography>
            <Item
              title="공장 기본 정보"
              to="/devicelist"
              icon={<TvIcon />}
              selected={location.pathname}
              // setSelected={setSelected}
            />
            <Item
              title="공장 예약 정보"
              to="/deviceappointlist"
              icon={<TimerOutlinedIcon/>}
              selected={location.pathname}
              // setSelected={setSelected}
            />
            <Item
              title="공장 사용자 등록 관리"
              to="/deviceuserlist"
              icon={<FolderSharedOutlinedIcon/>}
              selected={location.pathname}
              // setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              사용자관리
            </Typography>
            <Item
              title="사용자 관리"
              to="/userlist"
              icon={<PersonOutlineOutlinedIcon/>}
              selected={location.pathname}
              // setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              업데이트관리
            </Typography>

            <Item
              title="프로그램 업로드"
              to="/zipup"
              icon={<FileUploadIcon />}
              selected={location.pathname}
              // setSelected={setSelected}
            />

            <Item
              title="프로그램 업데이트"
              to="/deviceupdate"
              icon={<SystemUpdateAltIcon/>}
              selected={location.pathname}
              // setSelected={setSelected}
            />
            
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              진단관리
            </Typography>
            <Item
              title="진단파일 요청"
              to="/logcmd"
              icon={<ContentPasteGoIcon/>}
              selected={location.pathname}
              // setSelected={setSelected}
            />

            <Item
              title="진단파일 관리"
              to="/loglist"
              icon={<ContentPasteSearchIcon/>}
              selected={location.pathname}
              // setSelected={setSelected}
            />
            
          

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              정산/지표분석
            </Typography>

            <Item
              title="일자별 센서값 조회"
              to="/devicedaily"
              icon={<CalendarTodayOutlinedIcon />}
              selected={location.pathname}
              // setSelected={setSelected}
            />

            <Item
              title="센서값 그래프 조회"
              to="/devicebargraph"
              icon={<BarChartOutlinedIcon />}
              selected={location.pathname}
              // setSelected={setSelected}
            />

            

            {/* <Item
              title="매출실적 및 정산 조회"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            

            
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
