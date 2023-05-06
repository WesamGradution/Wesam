import React from 'react'
import { Box,useTheme } from '@mui/material'
import { useGetFormInfoQuery } from '../../../../reduxToolKit/api'
import {DataGrid} from "@mui/x-data-grid"
import Header from "../../../Header"

export const Users = () => {
  const theme = useTheme()
  const {data,isLoading} = useGetFormInfoQuery()
  console.log("🚀 ~ file: index.jsx:8 ~ Users ~ data:", data)
  
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 0.5,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "email",
      flex: 1,
    },{
      field:"phoneNumber",
      headerName:"Phone Number",
      flex:0.5,
    },
    {
      field:"groupNumber",
      headerName:"Group Number",
      flex:0.5,
    },
    
    
  ];

  return (
    <Box m="1.5rem 2.5rem">
    <Header title="Users" subtitle="List of Users" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Users;
