import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  useTheme,
  InputLabel,
  Typography,
} from "@mui/material";
import {
  useDeleteGroupMutation,
  useGetAdminGroupQuery,
  useGetAllGroupInfoQuery,
  useGetFormInfoQuery,
  useGetGroupInfoQuery,
  usePostAssignGroupMutation,
} from "../../../../reduxToolKit/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../Header";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../reduxToolKit/userSlice";
import AddUserButton from "./addButton";

export const AddToGroup = () => {
  const theme = useTheme();

  

  const { _id } = useSelector(selectUser);
  console.log("🚀 ~ file: index.js:30 ~ AddToGroup ~ _id:", _id);

  const {
    data: data_group,
    isLoading: isLoading_group,
    isError: isError_group,
  } = useGetAdminGroupQuery(_id);
    

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [postAssignGroup] = usePostAssignGroupMutation();
  const navigate = useNavigate();

  // declare a state variable for assignUser and initialize it with empty arrays
  const [assignUser, setAssignUser] = useState({
    selected_users: [],
    group: "",
  });

  // get the delet mutation
  const [deleteGroup] = useDeleteGroupMutation();

  if (isLoading_group) {
    return <div>loading...</div>;
  } else if (isError_group) {
    return (
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        height="80vh"
      >
        <Typography variant="h1">YOU HAVE NOT CREATE GROUP YET</Typography>
      </Box>
    );
  }
  console.log("🚀 ~ file: index.js:38 ~ AddToGroup ~ data:", data_group)

  const allMembers = data_group.flatMap((group) => group.members);

  

  {
    /* 
    const handleSubmit = async () => {
    // get the selected rows from the data array
    const selectedRows = data_form.filter((row) => rowSelectionModel.includes(row._id));
    
    // get the ids from the selected rows
    const selected = selectedRows.map((row) => row._id);
    
    

    setAssignUser(async prev => {
    const newState = {...prev, selected_users: selected, group: groupId};
    console.log("new state:", newState);
    await postAssignGroup(newState)
    return newState;
  });

    setRowSelectionModel([])

    
    
    }; */
  }

  const handleSubmit = async () => {
    // get the selected rows from the data array
    const selectedRows = data_group.filter((row) =>
      rowSelectionModel.includes(row._id)
    );

    // get the ids from the selected rows
    const selected = selectedRows.map((row) => row._id);
    deleteGroup(selected);
    console.log(selected);

    setRowSelectionModel([]);
  };

  const handleChange = (e) => {
    setGroupId(e.target.value);
  };

  {
    /*const isValid = rowSelectionModel.length > 0 && groupId !== '' ;*/
  }
  const isValid = rowSelectionModel.length > 0;

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
      flex: 0.5,
    },
    {
      field: "url",
      headerName: "Url",
      flex: 1,
    },
    {
      field: "addUser",
      headerName: "Add User",
      flex: 0.5,
      // Use renderCell to customize the cell rendering
      renderCell: (params) => {
        // Get the group id and title from the params.value object
        const groupId = params.row._id;
        const groupTitle = params.row.title;
        // Return the custom component with the group id and title as props
        return <AddUserButton groupId={groupId} groupTitle={groupTitle} />;
      },
    },

  ];

  const handleCellClick = (params) => {
    if (params.field === "_id") {
      const groupId = params.value;
      console.log(groupId);

      navigate(`/groups/information/${groupId}`);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Group" subtitle="Group information" />
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
          loading={isLoading_group || !data_group}
          getRowId={(row) => row._id}
          rows={data_group || []}
          columns={columns}
          onCellClick={handleCellClick}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
        />
      </Box>

      {/* 

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
    */}
      <Box display="flex" justifyContent="start" m="10px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Delete group/s
        </Button>
      </Box>
    </Box>
  );
};

export default AddToGroup;
