import React from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import WebFont from "webfontloader";
const Dashboard = () => {

  WebFont.load({
    google: {
      families: ["Bodoni XT"]
    }
  });
  // define some animation variants for the text
  const textVariants = {
    hidden: {
      opacity: 0,
      y: -100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  // define some animation variants for the logo
  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "50vh" }}
    >
      {/* use motion.div to animate the text */}
      <motion.div
        
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <Typography mb="100px" sx={{ fontSize: "5rem" ,fontFamily:"Bodoni XT"}} variant="h1" color="secondary">
          WELCOME TO WESAN DASHBOARD 
        </Typography>
        <Box display="flex" mt="50px" justifyContent="center" alignItems="center">
          <Typography variant="h5">
            Here you can manage your groups, opportunities, and competition and more ...
          </Typography>
        </Box>
      </motion.div>
      {/* use motion.img to animate the logo */}
    </Box>
  );
};

export default Dashboard;
