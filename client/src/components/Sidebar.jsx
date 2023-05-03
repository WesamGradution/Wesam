import React, { useEffect, useState } from 'react'
import {Box,
    Divider,
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
import { ChevronLeft,SettingsOutlined, ChevronRightOutlined, Group, Groups2Outlined, HomeOutlined, Receipt, ReceiptLongOutlined,ShoppingCartOutlined } from '@mui/icons-material';

import GroupAddIcon from '@mui/icons-material/GroupAdd';

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
            text:"Customers",
            icon:null
        },
        {
            text:"Show Customer",
            icon:<Groups2Outlined/>
        },
        {
            text:"add Customer",
            icon:<GroupAddIcon/>
        },
        {
            text:"Transactions",
            icon:<ReceiptLongOutlined/>
        },
        {
            text:"Product",
            icon:<ShoppingCartOutlined/>
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