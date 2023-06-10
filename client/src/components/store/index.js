import React, { useState, useEffect } from "react";
import {
    useGetItemInfoQuery,
  useGetStoreInfoQuery,
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
} from "@mui/material";

import { useSelector } from "react-redux";
import { selectUser, updateUser } from "../../reduxToolKit/userSlice";
import { useDispatch } from "react-redux";
import Header from "../Header";


const Store = () => {
  const { data: storeData, isLoading, error } = useGetStoreInfoQuery();
  const user = useSelector(selectUser);
  const [orderMessage, setOrderMessage] = useState();
  const [postTransaction] = usePostTransactionMutation()
  

  const dispatch = useDispatch()

  
  


  const buyItem = async (item) => {
    // check if the user can afford the item
    const canBuy = user.points > item.pricePoint;
    if (canBuy) {
      
      let updatedUser_dataBase = {
        receive_member_id:user._id,
        pointAmount: -item.pricePoint,
      }
      // dispatch the action with the new user object
      
      postTransaction(updatedUser_dataBase).unwrap()
                .then((result) => {
                    // if successful, show a success message
                    dispatch(updateUser(result))
                    console.log("Points discounted successfully")
                })
                .catch((error) => {
                    // if failed, handle the error
                    console.error(error)
                })
      // show a success message
      setOrderMessage(`You bought ${item.name} for ${item.pricePoint} points!`);
    } else {
      // show an error message
      setOrderMessage(`You don't have enough points to buy ${item.name}.`);
    }
  };


 

   if (isLoading){
        return <div>loading </div>
   }
   if (error){
        return <div>error </div>
   }



  return (
    <Box m="20px">
    <Header subtitle={orderMessage}></Header>
      <Box
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        m="20px"
      >
        {/* Map over the card data and render each card */}
        {storeData.map((card) => (
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
            <CardContent>
              <Typography sx={{ fontSize: 14 }}>{card.name}</Typography>
              <Typography variant="h5">
                {"Description: " + card.description}
              </Typography>
              <Typography variant="body2" component="div">
                {"quantity: " + card.quantity}
              </Typography>
              <Typography sx={{ mb: "1.5rem" }}>
                ${"Price Point: " + Number(card.pricePoint).toFixed(2)}
              </Typography>
              <CardActions>
                <Button onClick={() => buyItem(card)}>buy</Button>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Store;
