import React, { useState } from 'react'
import { useDeleteOpportunitiesMutation, useGetOpportunityInfoQuery } from '../../../../reduxToolKit/api'
import {
    Box,
    Button,
    CssBaseline,
    Drawer,
    Menu,
    MenuItem,
    Typography,
    useTheme,
  } from "@mui/material";
  import {
    useDeleteFormMutation,
    useDeleteMembersMutation,
    useGetAdminGroupQuery,
    useGetFormInfoQuery,
  } from "../../../../reduxToolKit/api";
  import { DataGrid } from "@mui/x-data-grid";
  import Header from "../../../Header";
  import { useNavigate } from "react-router-dom";
  import { useSelector } from "react-redux";
  import { selectUser } from "../../../../reduxToolKit/userSlice";
import OpportunuteMembers from '../opportunutesMembers';
import { Menu as MenuIcon } from "@mui/icons-material";
const ShowOpprtunities = () => {

    // get id of the admin

    const {_id} = useSelector(selectUser)

    // hooks
    const {data,isLoading,isError} = useGetOpportunityInfoQuery(_id)
    
    const [deleteOpportunities] = useDeleteOpportunitiesMutation()

    function GroupButton(props) {
      const [anchorEl, setAnchorEl] = useState(null);
      const open = Boolean(anchorEl);
  
      
  
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
  
      const handleClose = () => {
        setAnchorEl(null);
      };
  
      const handleChange = (event) => {
        // send to server logic
        handleClose();
      };
  
      
  
      return (
        <>
          <Button
            id="group-button"
            variant="contained"
            color="primary"
            onClick={handleClick}
            startIcon={<MenuIcon />}
          >
            Groups
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "group-button",
            }}
          >
            {props.options.map((option) => (
              <MenuItem key={option} value={option} onClick={handleChange}>
                {option.title}
              </MenuItem>
            ))}
          </Menu>
        </>
      );
    }
    

    const navigate = useNavigate()
    const theme = useTheme();
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    if (isLoading){
        return <div>loading...</div>
    }else if (isError){
      return <Box alignItems="center" display="flex" justifyContent="center" height="80vh">
      <Typography variant="h1">Opps There is Some Error. Maybe You have don't have a group yet </Typography>
    </Box>;
    }

    console.log("🚀 ~ file: index.js:34 ~ ShowOpprtunities ~ data:", data)



    const columns = [
        {
          field: "_id",
          headerName: "ID",
          flex: 1,
        },
        {
          field: "title",
          headerName: "Title",
          flex: 0.5,
        },
        {
          field: "description",
          headerName: "Description",
          flex: 1,
        },
        {
          field: "pointAmount",
          headerName: "Point Amount",
          flex: .5,
        },
        {
          field: "userLimit",
          headerName: "User Limit",
          flex: 0.5,
        },
        {
          field: "group_id",
          headerName: "Groups ",
          flex: 0.5,
          renderCell: (params) => {
            // get the options from the params.value, which is an array of ObjectIds
            const options = params.value;
            // return the custom component with the options
            return <GroupButton options={options} />;
          },
          disableClickEventBubbling: true,
        },
        {
          field: "delete",
          headerName: "Delete",
          flex: 0.5,
          // Use renderCell to customize the cell rendering
          renderCell: (params) => {
            // Define the handler function for clicking the button
            const handleDelete = async () => {
              // Get the row id from the params
              const id = params.id;
              const ids = []
              ids.push(id)
              console.log("🚀 ~ file: index.js:136 ~ handleDelete ~ id:", id)
              // Call the deleteQuiz mutation with the id
              await deleteOpportunities(ids);
              console.log(`Deleted quiz with id ${id}`);
            };
            // Return a button that calls the handleDelete function
            return (
              <Button onClick={handleDelete} color="primary" variant="contained">
                Delete
              </Button>
            );
          }
        },
        
        
         
      
      
      ];

      // navigate to where user can add opprtunites
      const handleAddOpportunities = () =>{
        
            navigate("/add Opportunity");
          
      }


      // get the selected rows from the data array
      const handleSubmit = async () => {
        
        const selectedRows = data.filter((row) =>
          rowSelectionModel.includes(row._id)
        );
    
        // get the ids from the selected rows
        const selected = selectedRows.map((row) => row._id);
        
        deleteOpportunities(selected)
        console.log(selected);
    
        setRowSelectionModel([]);
      };

       // enable the button only if the user selecte
        const isValid = rowSelectionModel.length > 0;

        // show members of the opportunites
        const handleCellClick = (params) => {
            if (params.field === "_id") {
              const oppId = params.value;
              console.log(oppId);
        
              navigate(`/opprtunities/information/${oppId}`);
            }
          };

          
    return (
        <Box m="1.5rem 2.5rem">
          <CssBaseline />
    
          <Header title="Oppotunites" subtitle="List of All opportunity you made ** note: click on the id will show the user participate in the opportunity   " />
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
              onCellClick={handleCellClick}
              columns={columns}
              //checkboxSelection
              //onRowSelectionModelChange={(newRowSelectionModel) => {
                //setRowSelectionModel(newRowSelectionModel);
              //}}
              //rowSelectionModel={rowSelectionModel}
              error={isError ? "No opportunity found" : null}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" m="10px">
            <Box display="flex" justifyContent="start">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={handleSubmit}
                disabled={!isValid}
              >
                Delete Opportunity/s
              </Button>
            </Box>
            <Box display="flex" justifyContent="end">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={handleAddOpportunities}
              >
                Add Opportunity
              </Button>
            </Box>
          </Box>
        </Box>
      );
}

export default ShowOpprtunities