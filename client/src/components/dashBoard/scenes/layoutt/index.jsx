import { Box, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../../Navbar'
import Sidebar from '../../../Sidebar'
const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");// return bolean value to check if it's a desktop or mobile
  const [isSidebarOpen,setIsSidebarOpen] = useState(true) 
  return (
    <Box display={isNonMobile ? "flex": "block"} width="100%" height="100%">
      <Sidebar
        isNonMobile= {isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Outlet/>
    </Box>
  )
}

export default Layout