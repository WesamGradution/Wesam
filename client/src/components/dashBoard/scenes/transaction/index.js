import React, { useState } from 'react'
import { useGetAdminGroupQuery, useGetFormInfoQuery, usePostTransactionMutation } from '../../../../reduxToolKit/api';

import { Box,Button,MenuItem,Select,useTheme,InputLabel, Typography } from '@mui/material'
import {DataGrid} from "@mui/x-data-grid"
import Header from '../../../Header';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUser } from '../../../../reduxToolKit/userSlice';
const Transaction = () => {

    const theme = useTheme()
    const user = useSelector(selectUser)
    const [assignUser, setAssignUser] = useState({receive_member_id: "", pointAmount: "",admin:""});
    const [points,setPoint] = useState("")
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    const { _id } = useSelector(selectUser);
    const {data:data_form,isLoading:isLoading_form,isError} = useGetAdminGroupQuery(_id)


    

    const [postTransaction] = usePostTransactionMutation()

    
    
    const dispatch = useDispatch()
    
    const handleSubmit = async () => {
      const selectedRows = data_form.filter((row) => rowSelectionModel.includes(row._id));
      console.log("🚀 ~ file: index.js:33 ~ handleSubmit ~ rowSelectionModel:", rowSelectionModel)
    
      
 
      // get the ids from the selected rows
      const selected = selectedRows.map((row) => row._id);
      
     
      // create a new object with the selected ids and points
      
      const newState = {receive_member_id: rowSelectionModel, pointAmount: points,admin:user._id};
       
      
      
      // call the postTransaction mutation with the new state
      await postTransaction(newState)
    
        setRowSelectionModel([])
    
        
        
        };
        const handleChange = (e) =>{
            setPoint(e.target.value)
        }

        if (isError) {
          return <Box alignItems="center" display="flex" justifyContent="center" height="80vh">
          <Typography variant="h1">NO USERS</Typography>
        </Box>;
          
        }

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
        
        
        
        ];
        const isValid = rowSelectionModel.length > 0 && points !== '' ;

        if (isLoading_form){
          return <div>loading..</div>
        }
        const allMembers = data_form.flatMap((group) => group.members);

        let numbers = []

      for ( let i = -50; i <= 50; i++){
        numbers.push(i)
      }
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="Transaction" subtitle="Here you can all members from your groups and can send them points" />
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
    loading={isLoading_form || !allMembers}
    getRowId={(row) => row._id}
    rows={allMembers || []}
    columns={columns}
    checkboxSelection
    onRowSelectionModelChange={(newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
    }}
    rowSelectionModel={rowSelectionModel}
    
    />
    </Box>

    <Box display="flex" justifyContent="start" m="10px">
    <InputLabel id="demo-simple-select-label" sx={{ marginRight: 1 }}>Points :</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={points}
    label="Age"
    onChange={handleChange}
    variant="standard"
    >
    {numbers.map((number) =>{
                    return <MenuItem value={number}> {number}</MenuItem>
                })}

    </Select>
    </Box>
    <Box display="flex" justifyContent="end" m="10px">
    <Button type='submit' color='secondary' variant='contained' onClick={handleSubmit} disabled={!isValid}>
    add point/s to the user
    </Button>
    </Box>
    </Box>
  )
}

export default Transaction