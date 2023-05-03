import React, { useMemo } from 'react'
import {CssBaseline,ThemeProvider} from "@mui/material"
import {createTheme} from "@mui/material/styles"
import {themeSettings} from "./theme"
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Dashboard from "./scenes/dashboard"
import Layout from './scenes/layoutt'
import { Customers } from './scenes/customers'
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
              <Route path='show customer' element={<Customers/>}></Route>
              </Route>
            </Routes>
        </ThemeProvider>
    </div>
  )
}

export default AppDashboard;