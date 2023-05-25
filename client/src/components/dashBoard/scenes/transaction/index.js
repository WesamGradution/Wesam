import React, { useState } from 'react'
import { useGetFormInfoQuery, usePostTransactionMutation } from '../../../../reduxToolKit/api';

import { Box,Button,MenuItem,Select,useTheme,InputLabel } from '@mui/material'
import {DataGrid} from "@mui/x-data-grid"
import Header from '../../../Header';
const Transaction = () => {

    const theme = useTheme()
    const [assignUser, setAssignUser] = useState({receive_member_id: "", pointAmount: ""});
    const [points,setPoint] = useState("")
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const {data:data_form,isLoading:isLoading_form} = useGetFormInfoQuery()

    const [postTransaction] = usePostTransactionMutation()
    
    const handleSubmit = async () => {
        // get the selected rows from the data array
        const selectedRows = data_form.filter((row) => rowSelectionModel.includes(row._id));
        
        // get the ids from the selected rows
        const selected = selectedRows.map((row) => row._id);
        
        /*setAssignUser( prev => {
            const newState = {...prev, group: groupId};
            console.log("new state group:", newState);
            
            return newState;
            });*/
    
        setAssignUser(async prev => {
        const newState = {...prev, receive_member_id: selected, pointAmount: points};
        console.log("new state:", newState);
        await postTransaction(newState)
        return newState;
      });
    
        setRowSelectionModel([])
    
        
        
        };
        const handleChange = (e) =>{
            setPoint(e.target.value)
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
        {
        field:"admin",
        headerName:"Admin",
        flex:0.5,
        },
        
        
        ];
        const isValid = rowSelectionModel.length > 0 && points !== '' ;

        let numbers = []

      for ( let i = 0; i <= 50; i++){
        numbers.push(i)
      }
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
    add point/s to user
    </Button>
    </Box>
    </Box>
  )
}

export default Transaction