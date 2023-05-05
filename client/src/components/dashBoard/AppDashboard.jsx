import React, { useMemo } from 'react'
import {CssBaseline,ThemeProvider} from "@mui/material"
import {createTheme} from "@mui/material/styles"
import {themeSettings} from "./theme"
import { useSelector } from 'react-redux'
import {  Route, Routes } from 'react-router-dom'

import Dashboard from "./scenes/dashboard"
import Layout from './scenes/layoutt'
import { Users } from './scenes/users'
import { AddUser } from './scenes/addUser'
const AppDashboard = () => {
    const mode = useSelector((state) => state.global.mode)
    const theme = useMemo(() => createTheme(themeSettings(mode)),[mode])
  return (

    <div>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
              <Route element = {<Layout/>}>
              <Route path="/dashboard" element={<Dashboard/>}></Route>
              <Route path='show users' element={<Users/>}></Route>
              <Route path="add user" element={<AddUser/>}></Route>
              </Route>
            </Routes>
        </ThemeProvider>
    </div>
  )
}

export default AppDashboard;