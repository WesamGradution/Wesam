import React from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { setMode } from "../reduxToolKit/changeTheme";
import LogoutIcon from "@mui/icons-material/Logout";
import { logOutUser, selectUser } from "../reduxToolKit/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const user  = useSelector(selectUser)


const userName = user.firstName +"  "+user.lastName

  const handleLogOut = () => {
    dispatch(logOutUser());
    navigate("/");
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxshadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{ width: 48, height: 48 }}
          >
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton
            onClick={() => dispatch(setMode())}
            sx={{ width: 48, height: 48 }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton onClick={handleLogOut}>
            <LogoutIcon />
          </IconButton>
          <Typography>
            {userName} 
          </Typography>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
