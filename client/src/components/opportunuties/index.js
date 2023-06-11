import React, { useState } from "react";
import { useGetOpportunityUsersQuery, usePostUserJoinOpportunityMutation } from "../../reduxToolKit/api";
import { useSelector } from "react-redux";
import { selectUser } from "../../reduxToolKit/userSlice";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Pagination,
  PaginationItem,
  Typography,
  Button,
  Alert,
  Stack
} from "@mui/material"; // Import the pagination components
import { motion } from "framer-motion";


const Opportunuties = () => {
  const { _id } = useSelector(selectUser);

  const { data, isLoading, isError } = useGetOpportunityUsersQuery(_id);
 
  
  const[joinOpp,{isSuccess,error}] = usePostUserJoinOpportunityMutation()
  const [alert, setAlert] = useState(null);

  const user = useSelector(selectUser)
  const userId = user._id
  const [page, setPage] = useState(1);
  if (isLoading) return <div>loading ...</div>;
  else if (isError) return <div>error...</div>;

  console.log("🚀 ~ file: index.js:24 ~ Opportunuties ~ data:", data.group_id)

  // Define how many items you want to show per page
  const itemsPerPage = 3;

  // Define the current page number

  // Handle the page change event
  const handleChange = (event, value) => {
    setPage(value);
  };
  

  const handleJoin = async (opp) =>{
    const {_id} = opp
    await joinOpp({_id,userId})
    
    if (isSuccess){
       setAlert({ message: "You have joined the opportunity! GOOD LUCK !!", type: "success" });
    }else if (error){
      setAlert({ message: "Something went wrong ", type: "error" });
    }
  }

  // Get the current items based on the current page and items per page
  const currentItems = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1 },
  };

  const cardTransition = {
    type: "spring",
    stiffness: 40,
  };

  return (
    <Box>
        <div>
    {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
  </div>
      <Box className="data-container">
        {currentItems.map((opportunity,index) => (
          <Box
            display="grid"
            alignItems="center"
            justifyContent="center"
            m="100px"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
              transition={cardTransition}
            >
              <Card
                sx={{
                  minHeight: 250, // Minimum height
                  maxHeight: 500, // Maximum height
                  width: 600,
                  boxShadow: "0px 30px 8px 0 rgba(0,0,0,0.2)",
                  margin: "20px",
                  transition: "transform 0.5s",
                  "&:hover": { transform: "scale(1.1)" },
                  borderRadius: ".9rem",
                  backgroundColor: "#bee9e8",
                 
                }}
                onClick={()=>handleJoin(opportunity)}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography
                      variant="h4"
                      textAlign="center"
                      m="-10px 0 30px 0"
                      sx={{ wordBreak: "break-all" }}
                    >
                      {opportunity.title}
                    </Typography>
                    <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
                      {opportunity.description}
                    </Typography>
                    <Box mt="80px" display="grid" justifyContent="start">
                    {opportunity.group_id.map(g => (
                      <Typography mb="20px">
                       Group: {g.title}
                      </Typography>
                      ))}
                      <Typography mb="20px">
                        User Limit: {opportunity.userLimit}
                      </Typography>

                     
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </motion.div>
          </Box>
        ))}
      </Box>

      <Box
        display="grid"
        justifyItems="center"
        justifyContent="center"
        m="50px"
      >
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)} // The total number of pages
          page={page} // The current page
          onChange={handleChange} // The page change handler
          color="primary" // The color of the component
          renderItem={(item) => <PaginationItem {...item} />}
        />
      </Box>
    
    </Box>
  );
};

export default Opportunuties;
