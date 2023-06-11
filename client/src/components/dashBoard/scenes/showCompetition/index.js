import React, { useState } from "react";
import { useGetCompetitionForAdminQuery } from "../../../../reduxToolKit/api";
import {
  Box,
  Button,
  CssBaseline,
  Drawer,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Select
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../reduxToolKit/userSlice";
import { Menu as MenuIcon } from "@mui/icons-material";
const ShowCompetition = () => {
  const user = useSelector(selectUser);

  const theme = useTheme();
  const { data, isLoading, isError } = useGetCompetitionForAdminQuery(user._id);

  if (isLoading) return <div>loading...</div>;
  else if (isError) return <div>error...</div>;

  console.log("🚀 ~ file: index.js:9 ~ ShowCompetition ~ data:", data);

  // a custom component for rendering the array of ObjectIds
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
          Group ID
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
              {option}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  const handleQuiz = () =>{
    console.log("hello")
  }

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
      field: "attempts:",
      headerName: "User attemps",
      flex: 0.5,
    },
    {
      field: "group_id",
      headerName: "Group ID",
      flex: 0.5,
      renderCell: (params) => {
        // get the options from the params.value, which is an array of ObjectIds
        const options = params.value;
        // return the custom component with the options
        return <GroupButton options={options} />;
      },

    },

    {
      field: "quizData",
      headerName: "Quiz Data",
      flex: 0.5,
      // Use renderCell to customize the cell rendering
      renderCell: (params) => {
        // Define the handler function for clicking the button

        // Return a button that redirects to a page with the quiz question
        return (
          <Button onClick={handleQuiz} color="primary" variant="contained">
            View Quiz Question
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <CssBaseline />

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
          //onCellClick={handleCellClick}
          columns={columns}
          checkboxSelection
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
            //onClick={handleSubmit}
            //disabled={!isValid}
          >
            Delete Opportunity/s
          </Button>
        </Box>
        <Box display="flex" justifyContent="end">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            //onClick={handleAddOpportunities}
          >
            Add Opportunity
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ShowCompetition;
