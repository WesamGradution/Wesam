import React, { useState } from "react";
import {
  useDeleteQuizMutation,
  useGetCompetitionForAdminQuery,
} from "../../../../reduxToolKit/api";
import {
  Box,
  Button,
  CssBaseline,
  Drawer,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Select,
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../reduxToolKit/userSlice";
import { Menu as MenuIcon } from "@mui/icons-material";
import ShowQuizData from "./showQuizDarta";
const ShowCompetition = () => {
  const user = useSelector(selectUser);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const [deleteQuiz] = useDeleteQuizMutation();

  const theme = useTheme();
  const { data, isLoading, isError } = useGetCompetitionForAdminQuery(user._id);

  const navigate = useNavigate();
  if (isLoading) return <div>loading...</div>;
  else if (isError) return <div>error...</div>;

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
  const AttemptsButton = ({ attempts }) => {
    // Use a state variable to control the dialog open/close
    const [open, setOpen] = useState(false);

    // Define a handler function for opening the dialog
    const handleOpen = () => {
      // Set open to true
      setOpen(true);
    };

    // Define a handler function for closing the dialog
    const handleClose = () => {
      // Set open to false
      setOpen(false);
    };

    // Return a button that opens the dialog and a dialog that shows the information
    return (
      <div>
        {/* Render a button that calls handleOpen on click */}
        <Button onClick={handleOpen} color="primary" variant="contained">
          View Attempts
        </Button>
        {/* Render a dialog that shows the information of the attempts array and member_id */}
        <Dialog open={open} onClose={handleClose}>
          {/* You can customize the dialog content as you wish */}
          {attempts.length === 0 &&  <DialogTitle>No user Attempts</DialogTitle> }
         
          <DialogContent>
            {/* Map over the attempts array and show each attempt */}
            {attempts.map((attempt) => (
              <Box key={attempt._id}>
                {/* Show the member_id of each attempt */}

                <DialogContentText color="green">
                  {attempt.member_id.firstName}

                </DialogContentText>
               
                {/* Show any other information of each attempt, such as score, finishDate, etc. */}
                <p>Score: {attempt.score}</p>
                <p>Finish Date: {attempt.finishDate}</p>
              </Box>
            ))}
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const handleQuiz = (quiz) => {
    navigate("/Show quiz data", { state: { quizData: quiz } });
  };

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
          const ids = [];
          ids.push(id);
          console.log("🚀 ~ file: index.js:136 ~ handleDelete ~ id:", id);
          // Call the deleteQuiz mutation with the id
          await deleteQuiz(ids);
          console.log(`Deleted quiz with id ${id}`);
        };
        // Return a button that calls the handleDelete function
        return (
          <Button onClick={handleDelete} color="primary" variant="contained">
            Delete
          </Button>
        );
      },
    },
    {
      field: "attempts",
      headerName: "User Attempts",
      flex: 0.5,
      // Use renderCell to customize the cell rendering
      renderCell: (params) => {
        // Get the attempts array from the params.value, which is an array of subdocuments
        const attempts = params.value;
        // Return the custom component with the attempts array as a prop
        return <AttemptsButton attempts={attempts} />;
      },
      disableClickEventBubbling: true,
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
          <Button
            onClick={() => handleQuiz(params.value)}
            color="primary"
            variant="contained"
          >
            View Quiz Question
          </Button>
        );
      },
    },
  ];

  const isValid = rowSelectionModel.length > 0;

  const handleSubmit = async () => {
    // get the selected rows from the data array
    const selectedRows = data.filter((row) =>
      rowSelectionModel.includes(row._id)
    );

    // get the ids from the selected rows
    const selected = selectedRows.map((row) => row._id);
    deleteQuiz(selected);
    console.log(selected);

    setRowSelectionModel([]);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <CssBaseline />

      <Header title="Competetion" subtitle="List of All competetion you made" />
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
          error={isError ? "No Competiton found" : null}
        />
      </Box>
    </Box>
  );
};

export default ShowCompetition;
