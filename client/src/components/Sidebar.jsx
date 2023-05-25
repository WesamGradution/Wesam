import React, { useEffect, useState } from 'react'
import {Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material"
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween';
import { ChevronLeft, ChevronRightOutlined,  Groups2Outlined, HomeOutlined, ReceiptLongOutlined,ShoppingCartOutlined,Quiz } from '@mui/icons-material';

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import AddIcon from '@mui/icons-material/Add';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import UpdateIcon from '@mui/icons-material/Update';
const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile
}) => {
    const {pathname} = useLocation();
    const [active,setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    const navItems = [
        {
            text:"Dashboared",
            icon:<HomeOutlined/>
        },
        {
            text:"Users",
            icon:null
        },
        {
            text:"Show Users",
            icon:<Groups2Outlined/>
        },
        {
            text:"Add User",
            icon:<GroupAddIcon/>
        },
        ,
        {
            text:"Update User",
            icon:<UpdateIcon/>
        },
        ,
        {
            text:"Delete User",
            icon:<GroupRemoveIcon/>
        },
        {
          text:"Group",
          icon:null
        },
        {
          text:"Create Group",
          icon:<GroupIcon/>
        },
        {
          text:"Assign Users",
          icon:<GroupAddIcon/>
        },
        {
          text:"Quiz",
          icon:null
        },
        
        {
          text:"Add Quiz",
          icon:<Quiz/>
        },
        {
          text:"Opportunity",
          icon:null
        },
        {
          
          text:"Add Opportunity",
          icon:<MessageIcon/>
        },
        {
          text:"Transactions",
          icon:null
        },

        {
            text:"Manage Transactions",
            icon:<ReceiptLongOutlined/>
        },
        {
          text:"Store",
          icon:null
        },
        {
            text:"Show Product",
            icon:<ShoppingCartOutlined/>
        },
        {
          text:"Add Product",
          icon:<AddIcon/>
      },
      
        
        
    ]

    useEffect(() =>{
        setActive(pathname.substring(1));
    },[pathname])

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen} // if true the component is shown
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    WESAM
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

         
        </Drawer>
      )}
    </Box>
  );
}

export default Sidebar;