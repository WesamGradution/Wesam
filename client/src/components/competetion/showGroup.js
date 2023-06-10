import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../reduxToolKit/userSlice";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import WebFont from "webfontloader";
import { useNavigate } from "react-router-dom";
const ShowGroup = () => {


    // uplpload font
    WebFont.load({
        google: {
          families: ["Kanit"]
        }
      });

  const { groups } = useSelector(selectUser);
  console.log("🚀 ~ file: showGroup.js:8 ~ ShowGroup ~ user:", groups);

  const navigate = useNavigate()

  const handleTransaction = (g) => {
    navigate(`${g._id}`)
  };

  return (
    <Box>

    <Typography variant="h1" display="flex" justifyContent="center" mt="30px" sx={{fontFamily:"Kanit"}}> Chosse the group</Typography>
   
    <Box display="flex" justifyContent="center" sx={{height:"40vh", margin: 30, width: "79%"}} alignItems="center" >

      
      <List sx={{
        border: "1px solid gray",
        backgroundColor: "#83c5be",
        padding: 2,
        boxShadow: 2,
        height:"600px",
        width:"400px",
        borderRadius:"15px"
      }}>
        {groups.map((group) => (
          // add some custom styles to the ListItem component
          <ListItem key={group.id} sx={{ "&:hover": { backgroundColor: "#2a9d8f" } }}>
          <ListItemIcon>
            <GroupIcon/>
          </ListItemIcon>
            <ListItemText primary={group.title} onClick={()=> handleTransaction(group)} />
            {/* add any icons, avatars, or secondary actions here */}
          </ListItem>
        ))}
      </List>
    </Box>
    </Box>
  );
};

export default ShowGroup;
