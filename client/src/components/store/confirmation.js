import React from 'react'
import { CardActionArea, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,Button } from "@mui/material";

// Define a custom component for rendering the confirmation dialog
function ConfirmDialog(props) {
  // Get the item and the open state from the props
  const { item, open } = props;
  // Get the buyItem function from the props
  const { buyItem } = props;
  // Get the handleClose function from the props
  const { handleClose } = props;

  // Return the Dialog component with the item details and actions
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm purchase</DialogTitle>
      <DialogContent>
        <DialogContentText>
        {item && `Are you sure you want to buy ${item.name} for ${item.pricePoint} points?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => buyItem(item)}>Buy</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;