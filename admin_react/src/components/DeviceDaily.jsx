import React from 'react'
import { Box , useTheme} from "@mui/material";
import { DataGrid,GridToolbarColumnsButton,GridToolbarDensitySelector,GridToolbarExport, GridToolbarContainer } from "@mui/x-data-grid";
import { tokens } from "../theme";
import CustomTableSearcher from "./CustomTableSearcher";

const DeviceDaily = ({ isDashboard = false, Data ,TablePaginationFunc,SearchHandle,IsSearch = false}) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 

  const columns = [
    { 
      field: "time",
      headerName: "일시", 
      headerAlign: "center",
      align: "center",
      flex: 1 
    },
    { 
      field: "id",
      headerName: "기기명", 
      headerAlign: "center",
      align: "center",
      flex: 1 
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
      headerName: "ph-ec센서",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
  ];

  function CustomToolBar (){
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Box sx={{ flexGrow: 1 }} />
        <CustomTableSearcher
          MenuList={columns}
          SearchHandle={SearchHandle}
        />
        
      </GridToolbarContainer>
    )
    
  }


  return (

    
    <Box m={isDashboard ? "20px" : "0px"}>

      <Box
        m={isDashboard ? "20px 0 0 0": "40px 0 0 0"}
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

          rows = {Data&&Data.length? Data:[]}
          columns={columns}
          hideFooter={isDashboard}
          // initialState={{
          //   sorting: {
          //     sortModel: [{ field: 'id', sort: 'desc' }],
          //   },
          // }}
          getRowId={(row)=> row.time}
          components={IsSearch?{Toolbar: CustomToolBar}:{ Toolbar: isDashboard? null:CustomToolBar , Pagination : isDashboard? null:TablePaginationFunc}} 
          disableColumnMenu
          disableColumnFilter
        />
      </Box>
    </Box>
  );




};

export default React.memo(DeviceDaily);
