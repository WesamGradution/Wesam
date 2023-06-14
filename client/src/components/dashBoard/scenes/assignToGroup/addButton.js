import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
} from "@mui/material";
import { usePostAddUserToGroupUsingNumberMutation } from "../../../../reduxToolKit/api";

// Define a custom component for rendering the button and dialog
function AddUserButton(props) {
  // Get the group id and title from the props
  const { groupId, groupTitle } = props;

  // using the hook

  const [addUserToGroup, { result, status, error }] =
    usePostAddUserToGroupUsingNumberMutation();

  // Use a state variable to control the dialog open/close
  const [open, setOpen] = useState(false);

  // Use a state variable to control the snackbar open/close
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Use a state variable to store the phone number input
  const [phoneNumber, setPhoneNumber] = useState("");

  // Define a handler function for opening the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Define a handler function for closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Define a handler function for submitting the phone number
  const handleSubmit = async () => {
    // Do something with the phone number and group id here
    await addUserToGroup({ phoneNumber, groupId });
    console.log(
      `Adding user with phone number ${phoneNumber} to group ${groupId}`
    );
    // Close the dialog
    handleClose();
    // Open the snackbar
    setSnackbarOpen(true);
  };

  // Define a handler function for updating the phone number input
  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSnackbarClose = () => {
    console.log("bye");
    // Close the snackbar
    setSnackbarOpen(false);
    
    
  };

  return (
    <>
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Add User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User to Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the phone number of the user you want to add to group{" "}
            {groupTitle}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="phone-number"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="standard"
            value={phoneNumber}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
      {status === "fulfilled" && (
        <Snackbar
          // Use the snackbarOpen state variable instead of true
          open={snackbarOpen}
          message={`Added user with phone number ${result.data.phoneNumber} to group ${result.data.groupId}`}
          // Set the autoHideDuration prop to 5000
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
        />
      )}
      
      {status === "rejected" && (
        <Snackbar
          // Use the snackbarOpen state variable instead of true
          open={snackbarOpen}
          message={`Failed to add user: ${error.data.message}`}
          // Set the autoHideDuration prop to 5000
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
        />
      )}
    </>
  );
}

export default AddUserButton;
