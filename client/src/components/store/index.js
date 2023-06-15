import React, { useState, useEffect } from "react";
import {
  useGetItemInfoQuery,
  useGetStoreInfoQuery,
  useGetUserProductQuery,
  usePostTransactionMutation,
} from "../../reduxToolKit/api";
import {
  Box,
  Typography,
  CardContent,
  Card,
  CardActions,
  Link,
  Button,
  CardActionArea,
} from "@mui/material";

import { useSelector } from "react-redux";
import { selectUser, updateUser } from "../../reduxToolKit/userSlice";
import { useDispatch } from "react-redux";
import Header from "../Header";
import ConfirmDialog from "./confirmation";

const Store = () => {
  const { _id } = useSelector(selectUser);
  const { data: storeData, isLoading, error,refetch  } = useGetUserProductQuery(_id);
  console.log("🚀 ~ file: index.js:27 ~ Store ~ storeData:", storeData);

  const user = useSelector(selectUser);
  const [orderMessage, setOrderMessage] = useState();
  const [postTransaction] = usePostTransactionMutation();

  // Use a state variable to control the dialog open/close
  const [dialogOpen, setDialogOpen] = useState(false);

  // Use a state variable to store the selected item
  const [selectedItem, setSelectedItem] = useState(null);

  // Define a handler function for opening the dialog with an item
  const handleOpen = (item) => {
    // Set the selected item
    setSelectedItem(item);
    // Open the dialog
    setDialogOpen(true);
  };

  // Define a handler function for closing the dialog
  const handleClose = () => {
    // Close the dialog
    setDialogOpen(false);
  };

  const dispatch = useDispatch();

  const buyItem = async (item) => {
    // check if the user can afford the item
    const canBuy = user.points > item.pricePoint && item.quantity > 0;
    if (canBuy) {
      let updatedUser_dataBase = {
        receive_member_id: user._id,
        pointAmount: -item.pricePoint,
        itemId: item._id
      };
      // dispatch the action with the new user object

      postTransaction(updatedUser_dataBase)
        .unwrap()
        .then((result) => {
          // if successful, show a success message
          dispatch(updateUser(result));
          console.log("Points discounted successfully");
        })
        .catch((error) => {
          // if failed, handle the error
          console.error(error);
        });
      // show a success message
      setOrderMessage(`You bought ${item.name} for ${item.pricePoint} points!`);
      handleClose();

      // Refetch the data from the server and update storeData array
      refetch();
    } else {
      // show an error message
      setOrderMessage(`You don't have enough points to buy ${item.name}.`);
      handleClose();
    }
  };

  if (isLoading) {
    return <div>loading </div>;
  }
  if (error) {
    return <div>error </div>;
  }

  console.log("🚀 ~ file: index.js:25 ~ Store ~ storeData:", storeData);

  return (
    <Box m="20px">
      <Header subtitle={orderMessage}></Header>
      {/* Add the ConfirmDialog component and pass the props */}
      <ConfirmDialog
        item={selectedItem}
        open={dialogOpen}
        buyItem={buyItem}
        handleClose={handleClose}
      />
      <Box
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        m="20px"
      >
        {/* Map over the card data and render each card */}
        {storeData.filter((item) => item.quantity > 0).map((card) => (
          <Card
            sx={{
              backgroundImage: "none",
              borderRadius: "0.55rem",
              width: "350px",
              height: "250px",
              margin: "10px",
              boxShadow: "0px 50px 8px 0 rgba(0,0,0,0.2)",
              transition: "transform 0.5s",
              "&:hover": { transform: "scale(1.1)" },
            }}
          >
            {/* Use CardActionArea to wrap the whole card content and call handleOpen on click */}
            <CardActionArea onClick={() => handleOpen(card)}  >
              <CardContent >
                <Typography sx={{ fontSize: 14 }}>{card.name}</Typography>
                <Typography variant="h5" mt="25px"  sx={{ wordBreak: "break-all" }}>
                  {"Description: " + card.description}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} mt="100px" >
                  {"Price Point: " + Number(card.pricePoint).toFixed(2)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Store;
