import React from 'react'
import {LightModeOutlined,DarkModeOutlined,Menu as MenuIcon,Search,SettingsOutlined } from "@mui/icons-material"
import FlexBetween from './FlexBetween'
import { useDispatch } from 'react-redux'
import { AppBar, IconButton, InputBase, Toolbar, useTheme } from '@mui/material'
import { setMode } from '../reduxToolKit/changeTheme'
const Navbar = ({
    isSidebarOpen,
    setIsSidebarOpen
}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    
  return (
    <AppBar sx={{
        position:"static",
        background:"none",
        boxshadow:"none"
    }}>
        <Toolbar sx={{justifyContent:"space-between"}}>
        {/* LEFT SIDE */}
            <FlexBetween>
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} sx={{width:48 , height:48}} >
                    <MenuIcon />
                </IconButton>
                <FlexBetween 
                backgroundColor={theme.palette.background.alt}
                borderRadius="9px"
                gap="3rem"
                p="0.1rem 1.5rem"
                >
                <InputBase placeholder="Search..."/>
                <IconButton sx={{width:48 }}>
                    <Search/>
                </IconButton>
                </FlexBetween>
            </FlexBetween>

            {/* RIGHT SIDE */}
            <FlexBetween gap="1.5rem">
            <IconButton onClick={()=> dispatch(setMode())} sx={{width:48 , height:48}}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlined sx={{fontSize:"25px"}} />
                ):(
                    <LightModeOutlined sx={{fontSize:"25px"}} />
                )}
            </IconButton>
            <IconButton sx={{width:48 , height:48}}>
                <SettingsOutlined sx={{fontSize:"25px"}}/>
            </IconButton>
            </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar;