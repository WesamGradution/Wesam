import React, { useState } from 'react'
import { Box,Button,MenuItem,Select,useTheme,InputLabel } from '@mui/material'
import { useGetFormInfoQuery, useGetGroupInfoQuery, usePostAssignGroupMutation } from '../../../../reduxToolKit/api'
import {DataGrid} from "@mui/x-data-grid"
import Header from "../../../Header"

export const AddToGroup = () => {
  const theme = useTheme()
  const {data:data_form,isLoading:isLoading_form} = useGetFormInfoQuery()
  const {data:data_group,isLoading:isLoading_group,isError:isError_group} = useGetGroupInfoQuery()

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [groupId,setGroupId] = useState('')
  const [selectedUser,setSelectedUser] = useState([])
  const [postAssignGroup] = usePostAssignGroupMutation()
 

    const handleSubmit = async () => {
      // get the selected rows from the data array
      const selectedRows = data_form.filter((row) => rowSelectionModel.includes(row._id));
      
      // get the ids from the selected rows
      const selected = selectedRows.map((row) => row._id);
      
      setSelectedUser(selected)

      try {
        const response = await postAssignGroup(assignUser);
        
      } catch (error) {
        
      }
      
    };

    const handleChange = (e) =>{
        setGroupId(e.target.value)
    }

   

   const assignUser = {
    selected_users:selectedUser,
    group:groupId
  }
   console.log("🚀 ~ file: index.js:38 ~ AddToGroup ~ assignUser:", assignUser)

  
    
  
   
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
      field:"admin",
      headerName:"Admin",
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
          loading={isLoading_form || !data_form}
          getRowId={(row) => row._id}
          rows={data_form || []}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        />
      </Box>

      <Box display="flex" justifyContent="start" m="10px">
        <InputLabel id="demo-simple-select-label" sx={{ marginRight: 1 }}>Group Number :</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={groupId}
          label="Age"
          onChange={handleChange}
          variant="standard"
          >
        { data_group && data_group.map((data)=>{
            return <MenuItem value={data._id}>{data.title}</MenuItem>;
            })}

        </Select>
      </Box>
      <Box display="flex" justifyContent="end" m="10px">
        <Button type='submit' color='secondary' variant='contained' onClick={handleSubmit}>
          add users to the group
        </Button>
      </Box>
    </Box>
  );
};

export default AddToGroup;
