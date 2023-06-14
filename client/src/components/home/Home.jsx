import React, { useEffect } from "react";
import { Box, Grid, Typography, Card } from "@mui/material";
import { motion } from "framer-motion";
import "@fontsource/raleway/300.css";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/700.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetFormInfoQuery } from '../../reduxToolKit/api';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUser } from '../../reduxToolKit/userSlice';
const HomePage = () => {
  const navigate = useNavigate();

  
  // Define some animation variants for the name and cards
  const nameVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const palmTreeVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.2, rotate: 10 },
    tap: { scale: 0.8, rotate: -10, filter: "brightness(50%)" },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.1 },
  };

  // Define some dummy data for the cards
  const cards = [
    {
      title: "Notification",
      description: "You can view all the notification from the admin here",
    },
    {
      title: "Competetion",
      description: "You can engane with the competetion and gain points",
    },
    {
      title: "Opportunities",
      description: "You can participate in opprotinity here",
    },
    {
      title: "Store",
      description: "You can use you point and buy items from here",
    },
  ];

  const handleTransaction = (card) => {
    switch (card.title) {
      case "Notification":
        navigate("/Notification");
        break;
      case "Competetion":
        navigate("/Competetion");
        break;
      case "Opportunities":
        navigate("/Opportunuties");
        break;
      case "Store":
        navigate("/Store");
        break;

      default:
        break;
    }
  };

  return (
    <Box>
      {/* The first section for the name and animation */}
      <Box
        sx={{
          height: "50vh", // Half of the viewport height
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#3f8180",
        }}
      >
        {/* Use motion component to animate the name */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={nameVariants}
          transition={{ duration: 2 }}
        >
          <Typography variant="h1" sx={{ fontFamily: "Ralway" }}>
            WESAM
          </Typography>
        </motion.div>
        {/* Add your animation here */}
        
      </Box>

      {/* The second section for the cards */}
      <Box
        sx={{
          height: "50vh", // Half of the viewport height
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Use Grid component to create a grid of cards */}
        <Grid container spacing={2}>
          {cards.map((card) => (
            <Grid item xs={6} sm={3} key={card.title}>
              {/* Use motion component to animate the cards */}
              <motion.div
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={cardVariants}
                transition={{ type: "spring", stiffness: 20 }}
              >
                <Card
                  sx={{
                    height: 200,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#3f8189",
                  }}
                  onClick={() => handleTransaction(card)}
                >
                  <Typography variant="h5" sx={{ color: "#fff" }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    {card.description}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
