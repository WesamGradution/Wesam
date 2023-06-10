import React, { useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  Drawer,
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

export const Users = ({ data: membersData }) => {

  const { _id } = useSelector(selectUser);

  const [deleteMembers] = useDeleteMembersMutation();

  const navigate = useNavigate();

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const theme = useTheme();

  

  const { data: data_group, isLoading, isError } = useGetAdminGroupQuery(_id);

  if (isLoading) {
   return <div>Loading...</div>
  }

  const handleSubmit = async () => {
    // get the selected rows from the data array
    const selectedRows = data.filter((row) =>
      rowSelectionModel.includes(row._id)
    );

    // get the ids from the selected rows
    const selected = selectedRows.map((row) => row._id);
    
    deleteMembers({ usersId: selected, adminId: _id });
    console.log(selected);

    setRowSelectionModel([]);
  };

  // enable the button only if the user selecte
  const isValid = rowSelectionModel.length > 0;

  const handleAddUser = () => {
    navigate("/add user");
  };

  const handleUpdate = () => {
    navigate("/update user");
  };

  if (isLoading) {
    return <div>loading...</div>;
  } else if (isError) {
    return <Box alignItems="center" display="flex" justifyContent="center" height="80vh">
    <Typography variant="h1">YOU HAVE TO CREATE GROUP FIRST</Typography>
  </Box>;
    
  }
  
  const allMembers = data_group.flatMap((group) => group.members);

  const data = membersData || allMembers 
  
  

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
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
    },
    {
      field: "groups",
      headerName: "Group Number",
      flex: 0.5,
    },
    {
      field: "points",
      headerName: "Points",
      flex: 0.5,
    },
  ];

  {
    /* 
  const handleCellClick = (params) =>{

    if (params.field === "groups"){
      
      const groupId = params.value;
      
      navigate(`/groups/information/${groupId}`)
    }
  }
*/
  }

  return (
    <Box m="1.5rem 2.5rem">
      <CssBaseline />

      <Header title="Users" subtitle="List of Users" />
      <Box display="flex" justifyContent="end" m="10px">
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleUpdate}
        >
          Update User
        </Button>
      </Box>
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
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          error={isError ? "No groups found" : null}
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
            Delete User/s
          </Button>
        </Box>
        <Box display="flex" justifyContent="end">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Users;
