import { Box, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../../../Navbar'
import Sidebar from '../../../Sidebar'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../reduxToolKit/userSlice'
const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");// return bolean value to check if it's a desktop or mobile
  const [isSidebarOpen,setIsSidebarOpen] = useState(true) 
  const user = useSelector(selectUser)
  
  if (!user){
    return <Navigate to="/"/>
  }

  return (
    <Box display={isNonMobile ? "flex": "block"} width="100%" height="100%">
      <Sidebar
        isNonMobile= {isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
      <Navbar  
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        />
      <Outlet/>
      </Box>
    </Box>
  )
}

export default Layout